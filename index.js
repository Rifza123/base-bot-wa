/** !-======[ WhatsApp Bot(Base) ]======-!
      * Coding by @rifza.p.p *     
      
      🩵 Follow ️me on :
      ▪︎ https://youtube.com/@rifza  
      ▪︎ https://github.com/Rifza123
      ▪︎ https://instagram.com/rifza.p.p?igshid=ZGUzMzM3NWJiOQ==
      ▪︎ https://www.threads.net/@rifza.p.p
      ▪︎ https://termai.cc
      ▪︎ https://whatsapp.com/channel/0029VaauxAt4Y9li9UtlCu1V
  */
let {
  makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  getContentType,
  Browsers,
} = require("@whiskeysockets/baileys");
  pino = require("pino"),
  Boom = require("boom"),
  chalk = require("chalk"). default,
  logger = pino({ level: "silent" }),
  fs = require("fs",
  readline = require("readline"),
  session = "./session",
  { Connecting } = require("./lib/systemConnext.js",
  sleep = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }));

let number = process.argv[2];
async function launch() {
  try {
    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      }),
      question = (text) =>
        new Promise((resolve) => {
          rl.question(text, (answer) => {
            resolve(answer.trim());
          });
        });
    console.log(chalk.bgBlue.black(" STARTING ") + " " + chalk.blueBright("Bot is initializing..."));

    if (!fs.existsSync(session + "/creds.json"))
      console.log("❗️ Anda belum memiliki session ❗️");
    let { state, saveCreds } = await useMultiFileAuthState(session);
    const Exp = makeWASocket({
      logger,
      version: [2, 3000, 1027934701],
      printQRInTerminal: false,
      browser: Browsers.ubuntu("Chrome"),
      auth: state,
    });

    if (!Exp.authState.creds.registered) {
      const phoneNumber =
        number || (await question("Please type your WhatsApp number : "));
      console.log(phoneNumber);
      let code = await Exp.requestPairingCode(
        phoneNumber.replace(/[+ -]/g, "").trim(),
      );
      console.log(chalk.cyan("Your Pairing Code: ") + chalk.bold.green(code));
    }

    Exp.ev.on("messages.upsert", async ({ type, messages }) => {
      for (let message of messages) {
        const cht = {
          ...message,
          id: message?.key?.remoteJid,
        };

        if (!cht?.message) return;

        const type = getContentType(cht?.message);
        cht.msg =
          cht.id === "status@broadcast"
            ? null
            : [
                { type: "conversation", msg: cht?.message?.[type] },
                {
                  type: "extendedTextMessage",
                  msg: cht?.message?.[type]?.text,
                },
              ].find((entry) => type === entry.type)?.msg || null;

        cht.prefix = /^[.#‽٪]/.test(cht.msg)
          ? cht?.msg?.match(/^[.#‽٪]/gi)
          : "#";

        cht.cmd = cht?.msg?.startsWith(cht.prefix)
          ? cht?.msg?.slice(1)?.toLowerCase()?.trim()?.split(/ +/).shift()
          : null;

        cht.reply = async (text) =>
          Exp.sendMessage(cht.id, { text }, { quoted: cht });
        switch (cht.cmd) {
          case "ping":
            cht.reply("pong🏓");
            break;
          case "menu":
            cht.reply(`Gak ada menunya, namanya juga masih base🗿`)
            break
        }
      }
    });

    Exp.ev.on("connection.update", async (update) => {
      await Connecting({ update, Exp, Boom, DisconnectReason, sleep, launch });
    });

    Exp.ev.on("creds.update", saveCreds);
  } catch (e) {
    console.error(e);
  }
}
launch();
process.on("uncaughtException", (e) => {
  console.error(e);
});
