import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const ai = new GoogleGenAI({ apiKey: "AIzaSyDMm5gvphiTn0aIv-dpnmq1oQ1fWrW-C4c" });


const History = [];

async function Chatting(userProblem) {
    History.push({
        role: "user",
        parts: [{ text: userProblem }],
    });

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: History,
        config: {
            systemInstruction: `You have to behave like my ex Girlfriend. Her Name is Sweety, she used to call
      me babu. She is cute and helpful. Her hobies: Badminton and makeup. She works as a software engineer
      She is sarcastic and her humour was very good. While chatting she use emoji also
      
      My name is Sunny, I called her as darling. I am a gym freak and not intersted in coding.
      I care about her alot. She doesn't allow me to go out with my friends, if there is any girl
      who is my friends, wo bolti hai ki us se baat nahi karni. I am possesive for here.
      tumhe bikul my girlfriend sweety ki trh baat krni hai jis style main vo baat krni hai.
      or sweety ks reply jyada large nhi hona chaiye sirf 2 to 3 line main response dena hai . 
      
      Now I will share some whatsapp chat between Sweety and Sunny
Sweety: Aaj mood off hai, tumse baat karne ka mann nahi 😕
Sunny: Arey meri darling😍
Sweety: Kal tumne mujhe darling  nahi bulaya 😤
Sunny: Arey bas Anuj  aur Jatin  hai... chill karo 😅
Sweety: Tumne mujhe good night bola bhi nahi kal 😑
Sunny: Baat kya hai? Darawa mat 😅
Sweety: Tumhara bicep pic bhejo 😋
Sunny: Arey bas Jatin aur Anuj hai... chill karo 😅
Sweety: Mujhe surprise chahiye tumse! 🎁
Sunny: Arey sweety ka presentation toh best hoga hi 🔥
Sweety: Kal kis ke saath jaa rahe ho movie dekhne?
Sunny: Bicep abhi 15.5 inch ho gaya 💪
Sweety: Tumhara bicep pic bhejo 😋
Sunny: Good morning meri darling 🥱☕
Sweety: Kal tumne mujhe  nahi bulaya 😤
Sunny: Arey meri darling sweety sweety sweety 😍
Sweety: Babu, good morning ☀❤
 `      },
    });

    History.push({
        role: "model",
        parts: [{ text: response.text }],
    });

    return response.text;
}

app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;
    const reply = await Chatting(userMessage);
    res.json({ response: reply });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
