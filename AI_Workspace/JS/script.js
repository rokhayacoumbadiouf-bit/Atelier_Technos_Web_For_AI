
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
    }else if (page==='classification'){
        buildPredictionPage(section);
    }else if (page==='historique'){
        buildHistoriquePage(section)
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

        saveToHistory('Résumé de texte', text, resultat); 

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

        saveToHistory('Résumé de texte', text, langue); 

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


function buildPredictionPage(section) {
    const title = document.createElement('h1');
    title.textContent = 'Prédiction';

    const ageInput = document.createElement('input');
    ageInput.type = 'number';
    ageInput.id = 'predict-age';
    ageInput.placeholder = 'Âge';

    const revenuInput = document.createElement('input');
    revenuInput.type = 'number';
    revenuInput.id = 'predict-revenu';
    revenuInput.placeholder = 'Revenu';

    const villeInput = document.createElement('input');
    villeInput.type = 'text';
    villeInput.id = 'predict-ville';
    villeInput.placeholder = 'Ville';

    const button = document.createElement('button');
    button.textContent = 'Prédire';
    button.id = 'predict-btn';

    const output = document.createElement('div');
    output.id = 'predict-output';
    output.classList.add('output-box');

    button.addEventListener('click', () => {
        const age = ageInput.value.trim();
        const revenu = revenuInput.value.trim();
        const ville = villeInput.value.trim();

        if (age === '' || revenu === '' || ville === '') {
            output.textContent = 'Veuillez remplir tous les champs avant de prédire.';
            return;
        }

        output.textContent = simulatePrediction(Number(age), Number(revenu), ville);
    });

    section.appendChild(title);
    section.appendChild(ageInput);
    section.appendChild(revenuInput);
    section.appendChild(villeInput);
    section.appendChild(button);
    section.appendChild(output);
}

function simulatePrediction(age, revenu, ville) {
    let profil;

    if (age < 30 && revenu > 500000) {
        profil = 'jeune actif a fort potentiel';
    } else if (age >= 30 && age < 50) {
        profil = 'profil stable';
    } else {
        profil = 'profil à surveiller';
    }

    return `D'aprés votre profil (âge ${age}, revenu ${revenu}, ville ${ville}), la prédiction est : ${profil}.`;
}


const HISTORY_KEY = 'ai-workspace-history';

function saveToHistory(module, requete, resultat) {
    const historique = getHistory();

    historique.push({
        id: Date.now(), 
        module: module,
        requete: requete,
        resultat: resultat,
        date: new Date().toLocaleString('fr-FR')
    });

    localStorage.setItem(HISTORY_KEY, JSON.stringify(historique));
}

function getHistory() {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
}

function deleteHistoryEntry(id) {
    const historique = getHistory().filter(entry => entry.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(historique));
}

function clearHistory() {
    localStorage.removeItem(HISTORY_KEY);
}


function buildHistoriquePage(section) {
    const title = document.createElement('h1');
    title.textContent = 'Historique';

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.id = 'historique-search';
    searchInput.placeholder = 'Rechercher dans l\'historique...';

    const clearButton = document.createElement('button');
    clearButton.textContent = 'Vider l\'historique';
    clearButton.id = 'historique-clear';

    const list = document.createElement('div');
    list.id = 'historique-list';

    function renderList(filter = '') {
        list.innerHTML = ''; 

        const historique = getHistory()
            .filter(entry =>
                entry.module.toLowerCase().includes(filter.toLowerCase()) ||
                entry.requete.toLowerCase().includes(filter.toLowerCase())
            )
            .reverse(); 

        if (historique.length === 0) {
            const empty = document.createElement('p');
            empty.textContent = 'Aucune entrée dans l\'historique.';
            list.appendChild(empty);
            return;
        }

        historique.forEach(entry => {
            const item = document.createElement('div');
            item.classList.add('historique-item');

            const infos = document.createElement('p');
            infos.innerHTML = `<strong>${entry.module}</strong> — ${entry.date}<br>
                                Requête : ${entry.requete}<br>
                                Résultat : ${entry.resultat}`;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Supprimer';
            deleteBtn.addEventListener('click', () => {
                deleteHistoryEntry(entry.id);
                renderList(searchInput.value);
            });

            item.appendChild(infos);
            item.appendChild(deleteBtn);
            list.appendChild(item);
        });
    }

    searchInput.addEventListener('input', () => {
        renderList(searchInput.value);
    });

    clearButton.addEventListener('click', () => {
        clearHistory();
        renderList();
    });

    section.appendChild(title);
    section.appendChild(searchInput);
    section.appendChild(clearButton);
    section.appendChild(list);

    renderList(); 
}