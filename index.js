const { token, MY_ID } = require('./constants');
const { start } = require('./text');
const { turtleWithHeart } = require('./stickers');
const { husbandMenu, hideMenu } = require('./keyboard');
const TelegramApi = require('node-telegram-bot-api');
const { addCompliment, getCompliment } = require('./service/compliments');
const bot = new TelegramApi(token, {
    polling: true,
});


bot.setMyCommands([
    { command: '/start', description: 'Приветствие' },
    { command: '/husband', description: 'Меню' },
    // { command: '/husband', description: 'Меню' },
]);

const startHusband = async (chat_id) => {
    await bot.sendMessage(
        chat_id,
        `09.09.2017 и 30.07.2021 даты близкие моему сердцу! А еще Дни Рождения каждого члена моей большой большой семьй!`,
    );
    await bot.sendMessage(chat_id, 'Выбирай', husbandMenu);
};

// const startHideMenu = async (chat_id) => {
//     await bot.sendMessage(chat_id, 'Выбирай', hideMenu);
// };

bot.on('callback_query', async (query) => {
    const chat_id = query.message.chat.id;
    try {
        if (query.data === 'compliment') {
            const compliment = await getCompliment();
            return bot.sendMessage(chat_id, compliment);
        }

        if (query.data === 'addCompliment') {
            return bot.sendMessage(chat_id, 'Введите ваш комплимент');
        }
    } catch (e) {
        return bot.sendMessage(chat_id, 'Произошла какая то ошибочка!)');
    }
});

bot.on('message', async (msg) => {
    const text = msg.text;
    const chat_id = msg.chat.id;
    try {
        if (text === '/husband') {
            return startHusband(chat_id);
        }

        if (msg.from.id === MY_ID) {
            await addCompliment(msg.text);
            return bot.sendMessage(chat_id, 'Добавлено');
        }
        if (text === '/start') {
            await bot.sendSticker(chat_id, turtleWithHeart);
            return bot.sendMessage(chat_id, start, { parse_mode: 'Markdown' });
        }

        // if (text === 'скрытые возможности') {
        //     return startHideMenu(chat_id);
        // }

        if (text === 'Я очень люблю своего мужа') {
            return startHusband(chat_id);
        }
        return bot.sendMessage(chat_id, 'Зай ну не понимаю я тебя!)');
    } catch (e) {
        return bot.sendMessage(chat_id, 'Произошла какая то ошибочка!)');
    }
});
