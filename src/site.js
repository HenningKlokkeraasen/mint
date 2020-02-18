window.addEventListener('DOMContentLoaded', (event) => {
    (async () => { buildSite(); })();
});

async function buildSite() {
    let index = await loadData('../data/index.json');
    buildIndex(index);

    let films = await loadData('../data/films.json');
    let directors = await loadData('../data/directors.json');

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
        createElement('li', element.title, element.classNames) |> container.appendChild;
    });
}

function buildBlock(data, indexData) {
    let entryInIndex = indexData.data.find(e => e.id == data.id);
    let container = document.getElementById('main-content-container');
    let div = createElement('div', '', '') |> container.appendChild;
    createElement('p', entryInIndex.title, '') |> div.appendChild;
    return { 'entryInIndex': entryInIndex, 'div': div };
}

function buildDirectors(data, indexData) {
    let common = buildBlock(data, indexData);
    let entryInIndex = common.entryInIndex;
    let div = common.div;
    let ul = createElement('ul', '', '') |> div.appendChild;
    buildList(data, entryInIndex.classNames, ul);
}

function buildFilms(data, indexData, directorsData) {
    let common = buildBlock(data, indexData);
    let entryInIndex = common.entryInIndex;
    let div = common.div;
    let table = createElement('table', '', '') |> div.appendChild;
    let tr = createElement('tr', '', '') |> table.appendChild;
    createElement('th', 'Title', '') |> tr.appendChild;
    createElement('th', 'Director(s)', '') |> tr.appendChild;
    buildTable(data, entryInIndex.classNames, table, indexData, directorsData);
}

function buildList(json, classNames, container) {
    json.data.forEach(element => {
        createElement('li', element.title, classNames) |> container.appendChild;
    });
}

function buildTable(json, classNames, container, indexData, directorsData) {
    json.data.forEach(film => {
        let tr = createElement('tr', '', '') |> container.appendChild;
        createElement('td', film.title, classNames) |> tr.appendChild;
        let directorsOfFilm = film.directors;
        if (directorsOfFilm != undefined) {
            let directorsEntryInIndex = indexData.data.find(e => e.id == directorsData.id);
            let directorNames = formatDirectorsList(directorsOfFilm, directorsData);
            createElement('td', directorNames, directorsEntryInIndex.classNames) |> tr.appendChild;
        }
        else
            createElement('td', '', '') |> tr.appendChild;
    });
}

// directorsOfFilm contains IDs to objects in directorsData
function formatDirectorsList(directorsOfFilm, directorsData) {
    let directorNames = directorsOfFilm
        .map(d => directorsData.data.find(e => e.id == d))
        .filter(director => director != undefined)
        .reduce((acc, el, i, arr) => reduceDirectorsList(acc, el, i, arr), '');
    return directorNames;
}

function reduceDirectorsList(acc, director, currentIndex, array) {
    let separator = currentIndex < array.length - 1
        ? ', '
        : '';
    return `${acc}${director.title}${separator}`;
}

function createElement(elementName, text, classNames) {
    let el = document.createElement(elementName);
    el.innerText = text;
    el.className = classNames;
    return el;
}
