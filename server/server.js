// server.js (ES module version)
/**
 * Backend server for Career ROI Calculator
 * - Exposes API endpoints for skill gap and learning path analysis
 * - Integrates with OpenAI GPT-3.5 for dynamic suggestions
 * - Uses Express.js and CORS
 */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

// CORS (Cross-Origin Resource Sharing) is a security feature enforced by browsers that controls how resources (like APIs) can be requested from a different origin (domain/protocol/port) than the one the web page is served from.

dotenv.config();

const app = express();
app.use(cors());         // Enable CORS (so frontend can call this backend)
app.use(express.json());      // Parse incoming JSON requests

// Initialize OpenAI client with API key from environment
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * POST /api/skillgap
 * Request body: { currentRole: string, targetRole: string, knownSkills: string[] }
 * Response: { result: string }
 * Returns skill gap analysis and learning path using OpenAI GPT-3.5
 */

// API: Skill Gap Analysis
app.post("/api/skillgap", async (req, res) => {
  const { currentRole, targetRole, knownSkills } = req.body;

  // Structured, concise prompt - tells GPT to return only the missing skills.
  const prompt = `List only the skills a ${currentRole}${knownSkills && knownSkills.length > 0 ? ` (who knows: ${knownSkills.join(", ")})` : ""} needs to learn to become a ${targetRole}. Respond in the format: Skills to learn: skill1, skill2, skill3...`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ result: completion.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
});

/**
 * POST /api/learningpath
 * Request body: { currentRole: string, targetRole: string, knownSkills: string[] }
 * Response: { path: Array<{ week: number, skill: string, description: string, resource: string, link: string }> }
 * Returns a week-by-week learning path using OpenAI GPT-3.5
 */

// API: Learning Path Generator
app.post("/api/learningpath", async (req, res) => {
  const { currentRole, targetRole, knownSkills } = req.body;

  // op's a learning path broken down week by week
  const prompt = `You are a career coach. A user wants to move from ${currentRole} to ${targetRole}. They already know: ${knownSkills && knownSkills.length > 0 ? knownSkills.join(", ") : "none"}.
Generate a week-by-week upskilling roadmap (max 8 weeks). For each week, provide:
- Week number
- Skill or Topic
- Description (1-2 lines)
- Recommended Resource (with link)
Format your response as a JSON array, one object per week, like this:
[
  { "week": 1, "skill": "Skill Name", "description": "Short description.", "resource": "Resource Name", "link": "https://..." },
  ...
]
Do not include cost or time estimates. Only include the fields above. Do not add any commentary or explanation before or after the JSON.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 900       // Limit the response length    // Prevents overly long outputs
    });
    // Try to parse the JSON from the response
    const match = completion.choices[0].message.content.match(/\[([\s\S]*)\]/);
    let path = [];
    if (match) {
      try {
        path = JSON.parse("[" + match[1] + "]");      // if match succeds
      } catch (e) {
        // fallback: try to parse the whole content
        try {
          path = JSON.parse(completion.choices[0].message.content);
        } catch (e2) {
          return res.status(500).json({ error: "AI response could not be parsed as JSON." });
        }
      }
      return res.json({ path });
    } else {
      // fallback: try to parse the whole content
      try {
        path = JSON.parse(completion.choices[0].message.content);
        return res.json({ path });
      } catch (e) {
        return res.status(500).json({ error: "AI response could not be parsed as JSON." });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
});

app.get("/", (req, res) => {
  res.send("👋 Career ROI API is up and running!");
});

// Start the backend server
app.listen(5000, () => console.log("✅ Backend running on http://localhost:5000"));
