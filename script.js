document.getElementById('messageForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the form from submitting the default way

    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    // Prepare the data to send
    const chatId = 'YOUR CHAT ID'; // Your chat ID
    const botToken = 'YOUR TOKEN'; // Your bot token
    const text = `Name: ${name}\nMessage: ${message}`;

    // Send message to Telegram Bot API
    try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: text,
            }),
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            document.getElementById('response').innerText = 'Message sent successfully!';
            console.log('Response from Telegram:', jsonResponse);
        } else {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        document.getElementById('response').innerText = `Error sending message: ${error.message}`;
        console.error('Error sending message:', error);
    }
});
