const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

// ====== KONFIGURASI ======
const TELEGRAM_TOKEN = "8356954875:AAHqBbIiUU2rCotbggJXeDJ2WelXgSHAfpk";
const API_KEY = "0e672de84222f05f908830b5c34e3a4d4ec65ba5fc4c7e9ebf212173090fc37c";
const API_URL = "https://foreign-marna-sithaunarathnapromax-9a005c2e.koyeb.app/api/endpoint?apiKey=0e672de84222f05f908830b5c34e3a4d4ec65ba5fc4c7e9ebf212173090fc37c"; // GANTI ENDPOINT ASLI

// ========================
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

// Simpan state user
const userState = {};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  userState[chatId] = {
    step: "emoji"
  };

  bot.sendMessage(
    chatId,
`🔥risshyt react botjir🔥
Masukkan Emoji (gunakan koma jika emoji >1) :`
  );
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!userState[chatId]) return;
  if (text.startsWith("/")) return;

  const state = userState[chatId];

  // STEP 1: EMOJI
  if (state.step === "emoji") {
    state.emoji = text;
    state.step = "link";

    bot.sendMessage(chatId, "Masukkan link tautan :");
    return;
  }

  // STEP 2: LINK
  if (state.step === "link") {
    state.link = text;

    console.log("===== REQUEST DATA =====");
    console.log("Emoji:", state.emoji);
    console.log("Link :", state.link);
    console.log("========================");

    try {
      const res = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },
        params: {
          emoji: state.emoji,
          link: state.link
        },
        timeout: 10000
      });

      console.log("===== API SUCCESS =====");
      console.log("STATUS:", res.status);
      console.log("DATA  :", res.data);
      console.log("=======================");
    } catch (err) {
      console.log("===== API ERROR =====");
      console.log("MESSAGE:", err.message);
      console.log("STATUS :", err.response?.status);
      console.log("DATA   :", err.response?.data);
      console.log("HEADERS:", err.response?.headers);
      console.log("=====================");
    }

    bot.sendMessage(chatId, "Proses kayaknya, coba cek😹");
    delete userState[chatId];
  }
});

console.log("🤖 Telebot running");
