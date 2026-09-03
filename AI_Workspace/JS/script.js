
const menuLinks = document.querySelectorAll('.menu-link');
const content = document.querySelector('.content');

menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

  
        menuLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        const page = link.dataset.page; 
        showPage(page);
    });
});

function showPage(page) {
    
    document.querySelectorAll('.page').forEach(section => {
        section.classList.remove('active');
    });

    
    let section = document.getElementById(page);

    if (!section) {
        
        section = createPage(page);
        content.appendChild(section);
    }

    section.classList.add('active');
}

function createPage(page) {
    const section = document.createElement('section');
    section.id = page;
    section.classList.add('page');

    if (page === 'resume') {
        buildResumePage(section);
    }else if(page==='traduction'){
        buildTraductionPage(section);
    }else if (page==='chat'){
        buildChatAIPage(section);
    }
    

    return section;
}


function buildResumePage(section) {
    const title = document.createElement('h1');
    title.textContent = 'Résumé de texte';

    const textarea = document.createElement('textarea');
    textarea.id = 'resume-input';
    textarea.placeholder = 'Collez ou saisissez le texte à résumer...';
    textarea.rows = 8;

    const button = document.createElement('button');
    button.textContent = 'Résumer';
    button.id = 'resume-btn';

    const output = document.createElement('div');
    output.id = 'resume-output';
    output.classList.add('output-box');

    button.addEventListener('click', () => {
        const text = textarea.value.trim();

        if (text === '') {
            output.textContent = 'Veuillez saisir un texte avant de résumer.';
            return;
        }

        output.textContent = simulateResume(text);
    });

    section.appendChild(title);
    section.appendChild(textarea);
    section.appendChild(button);
    section.appendChild(output);
}

function simulateResume(text) {
    
    const words = text.split(/\s+/);
    const short = words.slice(0, 20).join(' ');
    return short + (words.length > 20 ? '...' : '');
}

function buildTraductionPage(section) {
    const title = document.createElement('h1');
    title.textContent = 'Traduction';

    const textarea = document.createElement('textarea');
    textarea.id = 'traduction-input';
    textarea.placeholder = 'Saisissez le texte à traduire...';
    textarea.rows = 8;

    const select = document.createElement('select');
    select.id = 'traduction-langue';

    const langues = ['Anglais', 'Espagnol', 'Allemand', 'Italien', 'Arabe'];
    langues.forEach(langue => {
        const option = document.createElement('option');
        option.value = langue;
        option.textContent = langue;
        select.appendChild(option);
    });

    const button = document.createElement('button');
    button.textContent = 'Traduire';
    button.id = 'traduction-btn';

    const output = document.createElement('div');
    output.id = 'traduction-output';
    output.classList.add('output-box');

    button.addEventListener('click', () => {
        const text = textarea.value.trim();
        const langue = select.value;

        if (text === '') {
            output.textContent = 'Veuillez saisir un texte avant de traduire.';
            return;
        }

        output.textContent = simulateTraduction(text, langue);
    });

    section.appendChild(title);
    section.appendChild(textarea);
    section.appendChild(select);
    section.appendChild(button);
    section.appendChild(output);
}

function simulateTraduction(text, langue) {
    return `[Traduction simulée en ${langue}] : ${text}`;
}

function buildChatAIPage(section) {
    const title = document.createElement('h1');
    title.textContent = 'Chat IA';

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'chat-input';
    input.placeholder = 'Écrivez votre message...';

    const button = document.createElement('button');
    button.textContent = 'Envoyer';
    button.id = 'chat-btn';

    const output = document.createElement('div');
    output.id = 'chat-output';
    output.classList.add('output-box');

    button.addEventListener('click', () => {
        const text = input.value.trim();

        if (text === '') {
            return; 
        }

        
        const userMsg = document.createElement('p');
        userMsg.classList.add('chat-user');
        userMsg.textContent = 'Vous : ' + text;
        output.appendChild(userMsg);

      
        const aiMsg = document.createElement('p');
        aiMsg.classList.add('chat-ai');
        aiMsg.textContent = 'IA : ' + simulateChatResponse(text);
        output.appendChild(aiMsg);

        
        input.value = '';
    });

    section.appendChild(title);
    section.appendChild(input);
    section.appendChild(button);
    section.appendChild(output);
}

function simulateChatResponse(text) {
    return "Voici une réponse  à votre message : \"" + text + "\"";
}