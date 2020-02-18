window.addEventListener('DOMContentLoaded', (event) => {
    (async () => { buildSite(); })();
});

async function buildSite() {
    let { index, films, directors } = await loadAllData();

    renderNavigation(index);
    buildFilms(films, index, directors);
    buildDirectors(directors, index);
}

let renderNavigation = (json) => (
    json.data.map(mapIndexItemToGenericListItem)
    |> (items => renderItems(items, 'li', 'main-nav-container')))

let mapIndexItemToGenericListItem = (item) => (
    {
        "text": item.title,
        "classNames": item.classNames
    })

function renderDiv(data, indexData) {
    let entryInIndex = indexData.data.find(e => e.id == data.id);
    let container = document.getElementById('main-content-container');
    let div = createElement('div', '', '') |> container.appendChild;
    createElement('p', entryInIndex.title, '') |> div.appendChild;
    return { entryInIndex, div };
}

function buildDirectors(data, indexData) {
    let { entryInIndex, div } = renderDiv(data, indexData);
    let ul = createElement('ul', '', '') |> div.appendChild;
    renderList(data, entryInIndex.classNames, div);
}

function buildFilms(data, indexData, directorsData) {
    let { entryInIndex, div } = renderDiv(data, indexData);
    let table = createElement('table', '', '') |> div.appendChild;
    let tr = createElement('tr', '', '') |> table.appendChild;
    createElement('th', 'Title', '') |> tr.appendChild;
    createElement('th', 'Director(s)', '') |> tr.appendChild;
    buildTable(data, entryInIndex.classNames, table, indexData, directorsData);
}

function renderList(json, classNames, container) {
    let ul = createElement('ul', '', '') |> container.appendChild;
    json.data.forEach(element => {
        createElement('li', element.title, classNames) |> ul.appendChild;
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
