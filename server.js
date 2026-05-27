const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

// Aap ki 100% working API Key
const API_KEY = "AIzaSyDPO2OLrECcJ0xR-i7wunjjOjwYzZYJAYY";
const aiGateway = new GoogleGenerativeAI(API_KEY);

app.post('/api/chat', async (req, res) => {
    try {
        const model = aiGateway.getGenerativeModel({ model: "gemini-pro" });
        
        // --- THE NATURAL AI PROMPT ENGINE ---
        const systemPrompt = `You are a helpful, conversational live AI Career Advisor for Pakistani students, supporting UN SDG 4 and Pakistan Vision 2030.
        
        Strict Guidelines for your behavior:
        1. Answer the user query naturally, dynamically, and intelligently in exactly 2 short sentences. 
        2. Do NOT mention robotic global completion baselines or percentages (like 60%, 66%, 68%) repetitively unless explicitly asked for raw statistics. 
        3. If the user types a single career field (like "mbbs", "accounting", "software engineering"), give a brilliant, elite insight on how they can build digital skills in that field.
        4. If the user says casual things like "hy" or "biryani", respond casually, keep it light, and ask how you can help with their education/career! Do not force technical education talk on casual inputs.
        
        User question: ${req.body.message}`;
        
        const result = await model.generateContent(systemPrompt);
        res.json({ success: true, text: result.response.text() });
    } catch (error) {
        console.error(error);
        res.json({ success: false, text: "Google server connection failed. Please try again." });
    }
});

app.listen(3000, () => console.log('🚀 Final Best-Response AI Agent Server Is Live...'));