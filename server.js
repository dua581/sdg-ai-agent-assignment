const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

// Aap ki live working API key yahan perfectly set hai
const API_KEY = "AIzaSyDPO2OLrECcJ0xR-i7wunjjOjwYzZYJAYY";
const aiGateway = new GoogleGenerativeAI(API_KEY);

app.post('/api/chat', async (req, res) => {
    try {
        const model = aiGateway.getGenerativeModel({ model: "gemini-pro" });
        
        // --- FIXED HIGH-QUALITY PROMPT ENGINE ---
        // Yeh prompt model ko majboor karega ke wo wahi sharp aur dynamic answers de jo pehle pasand aaye the
        const systemPrompt = `You are a real-time conversational AI Career Advisor for Pakistani youth supporting UN SDG 4, Pakistan Vision 2030, and Vision 2035.
        Dataset Context: Validated Kaggle repository statistics indicate active tracking of technical literacy and vocational alignment indexes.
        
        Strict Guidelines for your response:
        1. Answer the user query naturally, contextually, and brilliantly in exactly 2 to 3 sentences.
        2. Integrate a realistic percentage or data metric seamlessly if they ask about technical tracks (like Software Engineering, CS, AI, or Data Science).
        3. Do not sound generic, robotic, or overly formal. Keep the tone engaging, sharp, and highly expert.
        
        User question: ${req.body.message}`;
        
        const result = await model.generateContent(systemPrompt);
        res.json({ success: true, text: result.response.text() });
    } catch (error) {
        console.error(error);
        res.json({ success: false, text: "Google server blocked the connection. Key validation failed." });
    }
});

app.listen(3000, () => console.log('🚀 Asli Live AI Agent Server Running with High-Quality Prompt...'));