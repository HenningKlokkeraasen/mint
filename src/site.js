window.addEventListener('DOMContentLoaded', (event) => {
    (async () => { buildSite(); })();
});

async function buildSite() {
    let { index, films, directors } = await loadAllData();

    // Register all Handlebars templates as partials
    Handlebars.partials = Handlebars.templates;

    renderNavigation(index);
    buildFilms(films, index, directors);
    buildDirectors(directors, index);
}

let renderNavigation = (json) => (
    json.data.map(mapIndexItemToGenericListItem)
    |> (items => DomRenderer.renderUl(items, 'main-nav-container')))

let mapIndexItemToGenericListItem = (item) => (
    {
        "text": item.title,
        "classNames": item.classNames
    })

let mapDirectorItemToGenericListItem = (item, classNames) => (
    {
        "text": item.title,
        "classNames": classNames
    })

function buildDirectors(data, indexData) {
    let entryInIndex = indexData.data.find(e => e.id == data.id);

    DomRenderer.renderThing({
        "p": {
            "text": entryInIndex.title
        },
        "whichPartial": () => "ul",
        "dataForPartial": data.data.map(item => mapDirectorItemToGenericListItem(item, entryInIndex.classNames))
    }, 'main-content-container');
}

function buildFilms(data, indexData, directorsData) {
    let entryInIndex = indexData.data.find(e => e.id == data.id);

    DomRenderer.renderThing({
        "p": {
            "text": entryInIndex.title
        },
        "whichPartial": () => "table",
        "dataForPartial": {
            "headerCells": [
                { "text": "Title" },
                { "text": "Director(s)" }
            ],
            "rows": mapFilms(data, entryInIndex.classNames, indexData, directorsData)
        }
    }, 'main-content-container');
}

function mapFilms(json, classNames, indexData, directorsData) {
    return json.data.map(film => {
        return {
            "cells": [
                {
                    "text": film.title,
                    "classNames": classNames
                },
                mapDirectorsCell(film, indexData, directorsData)
            ]
        }
    });
}

function mapDirectorsCell(film, indexData, directorsData) {
    let directorsCell = {}
    let directorsOfFilm = film.directors;
    if (directorsOfFilm != undefined) {
        let directorsEntryInIndex = indexData.data.find(e => e.id == directorsData.id);
        let directorNames = formatDirectorsList(directorsOfFilm, directorsData);
        directorsCell.text = directorNames;
        directorsCell.classNames = directorsEntryInIndex.classNames;
    }
    return directorsCell;
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
