import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies

app.post('/sendMessage', async (req, res) => {
    const { chatId, message } = req.body;
    const token = '8073846070:AAHGUGW1WgGqXzeeb8ulgjNhddO8s0_w0Fg'; // Replace with your bot token
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    try {
        // Log incoming request for debugging
        console.log('Incoming request:', req.body);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ chat_id: chatId, text: message }),
        });

        if (!response.ok) {
            const errorDetails = await response.text();
            console.error('Telegram API Error:', errorDetails);
            return res.status(response.status).json({ error: `Error from Telegram: ${response.statusText}` });
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error sending message:', error.message);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
