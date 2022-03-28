const { is } = require("express/lib/request");
const TelegramBot = require("node-telegram-bot-api");

// replace the value below with the Telegram token you receive from @BotFather
// const token = "5109605505:AAGygDPajztH1QGF0vAJMVcKMYCap2IkIUs";
const token ='5122663047:AAHwaxa7uKnoj148zzOG4bDm9y7JimWUCYY'



// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  console.log(msg);

  // send a message to the chat acknowledging receipt of their message
  // bot.sendMessage(chatId, 'Received your message');
});

// Chat Member left functions here !!!!!!!!!!!!!!!!!!!!!

// bot.on("left_chat_member", (msg) => {
//   const chatId = msg.chat.id;
//   const username = msg.from.username;

//   console.log(msg);
//   console.log(chatId);
//   console.log(username);

//   let reply = `@${username} bey bey `;
//   bot.sendMessage(chatId, reply);
// });

bot.on("new_chat_members", (msg) => {
  const chatId = msg.chat.id;
  const username = msg.new_chat_participant.username;
  const is_bot = msg.new_chat_participant.is_bot;
  const user_id = msg.new_chat_participant.id;

  console.log(msg);

  console.log(chatId);
  console.log(username);

  if (!is_bot) {
    let reply = `Welcome @${username} Nice Knowing you.`;
    bot.sendMessage(chatId, reply);
  } else {
    bot.sendMessage(chatId, `@${username} bots are not allowed.`);
    bot.kickChatMember(chatId, user_id);
  }
});

bot.on("message", (msg) => {
  if (msg.text == "/makemeadmin") {
    const chatId = msg.chat.id;
    const user_id = msg.from.id;
    bot.sendMessage(chatId, "Your wish");
    bot.kickChatMember(chatId, user_id);
  }
});

// Get ChatID either user or group

bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  if (msg.text === "/chatid") {
    let res = `ChatID : ${chatId}`;

    bot.sendMessage(chatId, res);
  }
});





// InterGroup Conversations




let MeowID = -1001705511781

let AISHAID = -1001453584974

bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  let NewChatID = AISHAID; // Aisha Logs ChatID

  // let NewChatID =-1001453584974

  console.log("Group Members  Messaging");


  if (msg.chat.id === MeowID) {
    bot.sendMessage(NewChatID, msg.text);
  }
});


bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  let NewChatID = MeowID ; // Sophia Admin Panel ChatID

  console.log("Sophia Messaging");

  if (msg.chat.id === AISHAID) {
    // const obj = {
    //   reply_to_message_id: msg.message_id,
    // };

    // console.log(msg.text);

    let res = `${msg.from.first_name} : ${msg.text}`

    bot.sendMessage(NewChatID, res);
  }
});













bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  const userid = msg.from.id;

  if (msg.text === "/mute") {
    const obj = {
      can_send_messages: false,
      can_send_media_messages: false,
    };

    bot.sendMessage(chatId, "You have been muted for a while ");
    bot.restrictChatMember(chatId, userid, obj);
  }

  if (msg.text === "/unmute") {
    const obj = {
      can_send_messages: true,
      can_send_media_messages: true,
    };

    bot.sendMessage(chatId, "You have been unmuted");
    bot.restrictChatMember(chatId, userid, obj);
  }
});
