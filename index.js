const { token } = require('./constants');
const { start } = require('./text');
const { turtleWithHeart } = require('./stickers');
const { husbandMenu } = require('./keyboard');
const TelegramApi = require('node-telegram-bot-api');
var serviceAccount = require('./key.json');
var admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://telegramfamilybot-569a3-default-rtdb.firebaseio.com/',
});
const db = admin.database();

const ref = db.ref('fds');
ref.on('value', (snapshot) => {
    console.log(snapshot.val());
  }, (errorObject) => {
    console.log('The read failed: ' + errorObject.name);
  }); 

const bot = new TelegramApi(token, {
    polling: true,
});

bot.setMyCommands([
    { command: '/start', description: 'Приветствие' },
    { command: '/husband', description: 'Меню' },
]);

const startHusband = async (chat_id) => {
    await bot.sendMessage(
        chat_id,
        `09.09.2017 и 30.07.2021 даты близкие моему сердцу! А еще Дни Рождения каждого члена моей большой большой семьй!`,
    );
    await bot.sendMessage(chat_id, 'Выбирай', husbandMenu);
};

bot.on('message', async (msg) => {
    const text = msg.text;
    const chat_id = msg.chat.id;
    try {
        if (text === '/start') {
            await bot.sendSticker(chat_id, turtleWithHeart);
            return bot.sendMessage(chat_id, start, { parse_mode: 'Markdown' });
        }

        if (text === '/husband') {
            return startHusband(chat_id);
        }

        if (text === 'Я очень люблю своего мужа') {
            return startHusband(chat_id);
        }
        return bot.sendMessage(chat_id, 'Зай ну не понимаю я тебя!)');
    } catch (e) {
        return bot.sendMessage(chat_id, 'Произошла какая то ошибочка!)');
    }
});
