const axios = require('axios');

// Telegram Bot Token and Chat ID
const TELEGRAM_BOT_TOKEN = '6767569190:AAFiHRjZU2ACRXsb9sPfuI_DjlKtXVAEpN4';
const CHAT_ID = '-4239504531';

// Fetching a random Wikipedia article
async function fetchRandomWikipediaArticle() {
    try {
        const response = await axios.get('https://en.wikipedia.org/api/rest_v1/page/random/summary');
        return response.data;
    } catch (error) {
        console.error('Error fetching Wikipedia article:', error);
        throw error;
    }
}

// Sending a message to a Telegram group
async function sendToTelegram(message) {
    try {
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        const response = await axios.post(url, {
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'HTML'
        });
        if (!response.data.ok) {
            throw new Error(`Telegram API error: ${response.data.description}`);
        }
        console.log('Message sent successfully');
    } catch (error) {
        console.error('Error sending message to Telegram:', error);
        throw error;
    }
}

// Main function
async function main() {
    try {
        const article = await fetchRandomWikipediaArticle();
        const message = `
        <b>${article.title} 📚</b>\n\n
        ${article.extract} 📝\n\n
        Read more: <a href="${article.content_urls.desktop.page}">Click here 🔗</a>
        `;        
        // Console output of message to be sent
        console.log('Message to be sent to Telegram:');
        console.log(message);

        await sendToTelegram(message);
    } catch (error) {
        console.error('Error in main function:', error);
    }
}

main();