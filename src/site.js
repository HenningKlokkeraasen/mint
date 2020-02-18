window.addEventListener('DOMContentLoaded', (event) => {
    (async () => { buildSite();})();
});

async function buildSite() {
    let index = await loadData('data/index.json');
    buildIndex(index);

    let films = await loadData('data/films.json');
    let directors = await loadData('data/directors.json');

    buildFilms(films, index, directors);
    buildDirectors(directors, index);
}

async function loadData(filename) {
    let response = await fetch(filename, {});
    let json = await response.json();
    return json;
}

function buildIndex(json) {
    let container = document.getElementById('main-nav-container');
    json.data.forEach(element => {
        createAndAppend('li', element.title, element.classNames, container);
    });
}

function buildBlock(data, indexData) {
    let entryInIndex = indexData.data.find(e => e.id == data.id);
    let container = document.getElementById('main-content-container');
    let div = createAndAppend('div', '', '', container);
    createAndAppend('p', entryInIndex.title, '', div);
    return { 'entryInIndex': entryInIndex, 'div': div };
}

function buildDirectors(data, indexData) {
    let common = buildBlock(data, indexData);
    let entryInIndex = common.entryInIndex;
    let div = common.div;
    let ul = createAndAppend('ul', '', '', div);
    buildList(data, entryInIndex.classNames, ul);
}

function buildFilms(data, indexData, directorsData) {
    let common = buildBlock(data, indexData);
    let entryInIndex = common.entryInIndex;
    let div = common.div;
    let table = createAndAppend('table', '', '', div);
    let tr = createAndAppend('tr', '', '', table);
    createAndAppend('th', 'Title', '', tr);
    createAndAppend('th', 'Director(s)', '', tr);
    buildTable(data, entryInIndex.classNames, table, indexData, directorsData);
}

function buildList(json, classNames, container) {
    json.data.forEach(element => {
        createAndAppend('li', element.title, classNames, container);
    });
}

function buildTable(json, classNames, container, indexData, directorsData) {
    json.data.forEach(element => {
        let tr = createAndAppend('tr', '', '', container);
        createAndAppend('td', element.title, classNames, tr);
        let directors = element.directors;
        if (directors != undefined) {
            let directorsEntryInIndex = indexData.data.find(e => e.id == directorsData.id);
            let directorNames = directors
                .map(d => directorsData.data.find(e => e.id == d))
                .filter(director => director != undefined)
                .reduce((acc, directorName, currentIndex) => acc + directorName.title + (currentIndex < directors.length-1 ? ', ' : ''), '');
            createAndAppend('td', directorNames, directorsEntryInIndex.classNames, tr);
        }
        else
            createAndAppend('td', '', '', tr);
    });
}

function createAndAppend(elementName, text, classNames, container) {
    let el = document.createElement(elementName);
    el.innerText = text;
    el.className = classNames;
    container.appendChild(el);
    return el;
}
