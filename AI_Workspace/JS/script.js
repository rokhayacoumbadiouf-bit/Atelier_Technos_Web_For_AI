
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