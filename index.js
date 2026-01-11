const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

const TELEGRAM_TOKEN = "8356954875:AAHqBbIiUU2rCotbggJXeDJ2WelXgSHAfpk";
const API_KEY = "0e672de84222f05f908830b5c34e3a4d4ec65ba5fc4c7e9ebf212173090fc37c"; // Bearer key

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

// Simpan state user
const userState = {};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  userState[chatId] = { step: "emoji" };

  bot.sendMessage(chatId,
`🔥risshyt react botjir🔥
Masukkan Emoji (gunakan koma jika emoji >1) :`);
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  if (!userState[chatId] || msg.text.startsWith("/")) return;

  const state = userState[chatId];

  if (state.step === "emoji") {
    state.emoji = msg.text;
    state.step = "link";

    bot.sendMessage(chatId, "Masukkan link tautan :");
  }

  else if (state.step === "link") {
    state.link = msg.text;

    // OPTIONAL: kirim ke API WhatsApp React
    try {
      await axios.post(
        "https://api.contoh.com/react",
        {
          emoji: state.emoji,
          link: state.link
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );
    } catch (err) {
      console.log("API error:", err.message);
    }

    bot.sendMessage(chatId, "Proses kayaknya, coba cek😹");

    delete userState[chatId]; // reset
  }
});
