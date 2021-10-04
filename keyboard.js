module.exports = {
    husbandMenu: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Получить авторский комплиент от мужа', callback_data: 'compliment'}],
                [{text: 'Записать желание о покупке чего-либо', callback_data: 'dream'}],
                [{text: 'Оставить записку мужу', callback_data: 'answer'}],
                [{text: 'Просмотреть записки мужу', callback_data: 'show_answers'}],
                [{text: 'Просмотреть заявки на покупку', callback_data: 'show_dreams'}],
            ]
        })
    },
    // hideMenu: {
    //     reply_markup: JSON.stringify({
    //         inline_keyboard: [
    //             [{text: 'Добавить комплимент', callback_data: 'addCompliment'}],
    //         ]
    //     })
    // }
}