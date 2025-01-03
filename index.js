const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: 'yourFolderName',
    }),
});

client.on('ready', () => {
    console.log('WhatsApp Conectado!');
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.initialize();

const delay = (ms) => new Promise((res) => setTimeout(res, ms)); // Criando o delay

const iPhoneLinksCapa = {
    '1':'https://produto.mercadolivre.com.br/MLB-5205225080-capa-capinha-case-aveludada-iphone-xr-_JM',
    '01':'https://produto.mercadolivre.com.br/MLB-5205225080-capa-capinha-case-aveludada-iphone-xr-_JM',
    '2': 'https://produto.mercadolivre.com.br/MLB-5207197000-capa-capinha-case-aveludada-iphone-11-_JM',
    '02': 'https://produto.mercadolivre.com.br/MLB-5207197000-capa-capinha-case-aveludada-iphone-11-_JM',
    '3': '',
    '03': '',
    '4':'',
    '04':'',
    '5':'https://produto.mercadolivre.com.br/MLB-3924980501-capa-capinha-case-aveludada-iphone-12-_JM?variation=186283407509#reco_item_pos=1&reco_backend=same-seller-odin&reco_backend_type=low_level&reco_client=vip-seller_items-above&reco_id=c61372e7-5c87-4d98-9b23-c479b81778c5&reco_model=machinalis-sellers-baseline',
    '05':'https://produto.mercadolivre.com.br/MLB-3924980501-capa-capinha-case-aveludada-iphone-12-_JM?variation=186283407509#reco_item_pos=1&reco_backend=same-seller-odin&reco_backend_type=low_level&reco_client=vip-seller_items-above&reco_id=c61372e7-5c87-4d98-9b23-c479b81778c5&reco_model=machinalis-sellers-baseline',
    '8':'https://produto.mercadolivre.com.br/MLB-3924988711-capa-capinha-case-aveludada-iphone-13-_JM',
    '08':'https://produto.mercadolivre.com.br/MLB-3924988711-capa-capinha-case-aveludada-iphone-13-_JM'

    // Adicione mais links para outras opções conforme necessário
};

const iPhoneLinksPelicula = {
    '1':'https://produto.mercadolivre.com.br/MLB-5205439100-pelicula-vidro-temperado-3d-iphone-xr-11-12-13-14-15-pro-max-_JM',
    '01':'https://produto.mercadolivre.com.br/MLB-5205439100-pelicula-vidro-temperado-3d-iphone-xr-11-12-13-14-15-pro-max-_JM',
    '2':'https://produto.mercadolivre.com.br/MLB-5219239596-pelicula-fosca-privacidade-iphone-xr-11-12-13-14-15-pro-max-_JM',
    '02':'https://produto.mercadolivre.com.br/MLB-5219239596-pelicula-fosca-privacidade-iphone-xr-11-12-13-14-15-pro-max-_JM'
};


let state = {}; // Objeto para gerenciar estados dos usuários

client.on('message_create', async (message) => {
    const user = message.from; // Identifica o usuário pelo número
    const chat = await message.getChat();

    // Saudações
    if (message.body==='00' || message.body.match(/(Ola|olá|oi|Oi|Bom dia|bom dia|Boa tarde|boa tarde|Boa noite|boa noite)/i) && message.from.endsWith('@c.us')) {
        await delay(2000);
        await chat.sendStateTyping(); // Simulando digitação
        await delay(2000);

        const contact = await message.getContact(); // Pegando o contato
        const name = contact.pushname; // Pegando o nome do Contato

        await client.sendMessage(
            message.from,
            'Bem vindo,' +
            name.split(' ')[0] +
            '! 👋' +
            '\nSou o assistente virtual da empreendimentocruz. Como posso te ajudar ?\n🌟*MENU*:\n\n1️⃣Capa iPhone\n2️⃣Película iPhone\n' +
            '\nPor favor, responda com número da opção desejada.'
        );
        state[user] = 'menu'; // Define o estado do usuário
        return;
    }

    // Opção de Capa iPhone
    if (message.body === '1' && state[user] === 'menu') {
        await delay(2000);
        await chat.sendStateTyping();
        await delay(2000);

        await client.sendMessage(
            message.from,
            '*CAPA IPHONE*📱\n📋*MENU MODELO IPHONE*:\n\n' +
            '0️⃣1️⃣iPhone XR\n0️⃣2️⃣iPhone 11\n0️⃣3️⃣iPhone 11 Pro\n' +
            '0️⃣4️⃣iPhone 11 Pro Max\n0️⃣5️⃣iPhone 12\n0️⃣6️⃣iPhone 12 Pro\n' +
            '0️⃣7️⃣iPhone 12 Pro Max\n0️⃣8️⃣iPhone 13\n0️⃣9️⃣iPhone 13 Pro\n' +
            '1️⃣0️⃣iPhone 13 Pro Max\n1️⃣1️⃣iPhone 14\n1️⃣2️⃣iPhone 14 Pro\n' +
            '1️⃣3️⃣iPhone 14 Pro Max\n1️⃣4️⃣iPhone 15\n1️⃣5️⃣iPhone 15 Pro\n' +
            '1️⃣6️⃣iphone 15 Pro Max\n'+
            '\n0️⃣0️⃣MENU\n'+
            '\nPor favor, responda com número da opção desejada.'
        );
        state[user] = 'modelosCapa'; // Atualiza o estado do usuário
        return;
    }
    // Link do modelo Capa selecionado
        if (state[user] === 'modelosCapa' && message.body in iPhoneLinksCapa) {
        const siteLink = iPhoneLinksCapa[message.body];

            await delay(2000);
            await chat.sendStateTyping();
            await delay(2000);

        await client.sendMessage(message.from, `Segue o link para o modelo escolhido: ${siteLink}`);
        state[user] = null; // Reseta o estado do usuário
        return;
        }

    // Opção de Pelicula iPhone
    else if (message.body === '2' && state[user] === 'menu') {
        await delay(2000);
        await chat.sendStateTyping();
        await delay(2000);

        await client.sendMessage(
            message.from,
            '*PELÍCULA IPHONE*📱\n📋*MENU MODELO IPHONE*:\n\n' +
            '0️⃣1️⃣Película Vidro Temperado 3D\n0️⃣2️⃣Película Fosca Privacidade\n' +
            '\n0️⃣0️⃣MENU\n'+
            '\nPor favor, responda com número da opção desejada.'
        );
        state[user] = 'modelosPelicula'; // Atualiza o estado do usuário
        return;
    }
        // Link do modelo Capa selecionado
        if (state[user] === 'modelosPelicula' && message.body in iPhoneLinksPelicula) {
            const siteLink = iPhoneLinksPelicula[message.body];

            await delay(2000);
            await chat.sendStateTyping();
            await delay(2000);

            await client.sendMessage(message.from, `${siteLink}`);
            await client.sendMessage(message.from, 'Para voltar ao menu, selecione\n' +
                '\n0️⃣0️⃣MENU\n');
            state[user] = null; // Reseta o estado do usuário
            return;
        }

        // Caso o usuário não escolha uma opção válida
        if (state[user] === 'modelosCapa' || state[user] === 'modelosPelicula') {
            await client.sendMessage(message.from, 'Opção inválida. Por favor, escolha uma opção válida.');
        }

});
