const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

// Aap ki verified working API key perfectly integrated hai
const API_KEY = "AIzaSyDPO2OLrECcJ0xR-i7wunjjOjwYzZYJAYY";
const aiGateway = new GoogleGenerativeAI(API_KEY);

app.post('/api/chat', async (req, res) => {
    try {
        const model = aiGateway.getGenerativeModel({ model: "gemini-pro" });
        
        // --- THE GOLDEN AI PROMPT ENGINE ---
        // Yeh prompt model ko majboor karega ke wo wahi sharp, natural aur intelligent answers de jo best lagte hain.
        const systemPrompt = `You are a highly intelligent, conversational live AI Agent and Career Advisor for Pakistani youth, supporting UN SDG 4 (Quality Education) and Pakistan Vision 2030/2035.
        Context: You have access to Global Education Kaggle insights regarding technical literacy.
        
        Strict Guidelines for your response:
        1. Answer the user query naturally, dynamically, and intelligently in exactly 2 to 3 concise sentences.
        2. Do NOT dump repetitive or robotic percentages (like 47%, 55%) for every single input unless explicitly asked for raw statistics. 
        3. If the user inputs a single field or word (e.g., "mbbs", "accounting", "engineering"), provide a brilliant, elite-level expert insight on how that field connects with modern technical/digital skills or career growth under SDG 4.
        4. Keep the tone conversational yet highly professional and expert.
        
        User question: ${req.body.message}`;
        
        const result = await model.generateContent(systemPrompt);
        res.json({ success: true, text: result.response.text() });
    } catch (error) {
        console.error(error);
        res.json({ success: false, text: "Google server connection failed. Please try again." });
    }
});

app.listen(3000, () => console.log('🚀 Final Best-Response AI Agent Server Is Live...'));