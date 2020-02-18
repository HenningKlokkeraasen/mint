window.addEventListener('DOMContentLoaded', (event) => {
    (async () => { buildSite(); })();
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
        create('li', element.title, element.classNames) |> container.appendChild;
    });
}

function buildBlock(data, indexData) {
    let entryInIndex = indexData.data.find(e => e.id == data.id);
    let container = document.getElementById('main-content-container');
    let div = create('div', '', '') |> container.appendChild;
    create('p', entryInIndex.title, '') |> div.appendChild;
    return { 'entryInIndex': entryInIndex, 'div': div };
}

function buildDirectors(data, indexData) {
    let common = buildBlock(data, indexData);
    let entryInIndex = common.entryInIndex;
    let div = common.div;
    let ul = create('ul', '', '') |> div.appendChild;
    buildList(data, entryInIndex.classNames, ul);
}

function buildFilms(data, indexData, directorsData) {
    let common = buildBlock(data, indexData);
    let entryInIndex = common.entryInIndex;
    let div = common.div;
    let table = create('table', '', '') |> div.appendChild;
    let tr = create('tr', '', '') |> table.appendChild;
    create('th', 'Title', '') |> tr.appendChild;
    create('th', 'Director(s)', '') |> tr.appendChild;
    buildTable(data, entryInIndex.classNames, table, indexData, directorsData);
}

function buildList(json, classNames, container) {
    json.data.forEach(element => {
        create('li', element.title, classNames) |> container.appendChild;
    });
}

function buildTable(json, classNames, container, indexData, directorsData) {
    json.data.forEach(element => {
        let tr = create('tr', '', '') |> container.appendChild;
        create('td', element.title, classNames) |> tr.appendChild;
        let directors = element.directors;
        if (directors != undefined) {
            let directorsEntryInIndex = indexData.data.find(e => e.id == directorsData.id);
            let directorNames = directors
                .map(d => directorsData.data.find(e => e.id == d))
                .filter(director => director != undefined)
                .reduce((acc, directorName, currentIndex) => acc + directorName.title + (currentIndex < directors.length - 1 ? ', ' : ''), '');
            create('td', directorNames, directorsEntryInIndex.classNames) |> tr.appendChild;
        }
        else
            create('td', '', '') |> tr.appendChild;
    });
}

function create(elementName, text, classNames) {
    let el = document.createElement(elementName);
    el.innerText = text;
    el.className = classNames;
    return el;
}
