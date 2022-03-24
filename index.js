require("dotenv").config();
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
var elizabot = require("./elizabot.js");
elizabot.start();

const { TOKEN, SERVER_URL } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;
const URI = `/webhook/${TOKEN}`;
const WEBHOOK_URL = SERVER_URL + URI;

const app = express();
app.use(bodyParser.json());

const init = async () => {
  const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
  console.log(res.data);
};

app.post(URI, async (req, res) => {
  console.log(req.body);
  const chatId = req.body.message.chat.id;
  const text = req.body.message.text;

  


  question=null

  
  
//   let reply = elizabot.reply(text) // returns a eliza-like reply based on the message text passed into it
//   console.log(reply);
  

  
//   reply = elizabot.bye() // returns a farewell message
//   console.log(reply);
  


  if (chatId === 5265243832) {


  let reply = elizabot.reply(text) // returns a eliza-like reply based on the message text passed into it
  console.log(reply);
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text: reply,
   
    });
    return res.send();
  } else {
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text: "Mindoolla chokki",
    });
    return res.send();
  }

  // const text = [req.body.message.chat.first_name,req.body.message.text]
});

app.listen(process.env.PORT || 5000, async () => {
  console.log("🚀 app running on port", process.env.PORT || 5000);
  await init();
});
