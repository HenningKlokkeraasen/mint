
async function loadAllData() {
    let index = await fetchJson('../data/index.json');
    let films = await fetchJson('../data/films.json');
    let directors = await fetchJson('../data/directors.json');

    return { index, films, directors };
}

async function fetchJson(filePath) {
    let response = await fetch(filePath, {});
    return await response.json();
}
