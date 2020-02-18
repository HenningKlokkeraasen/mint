
// items should have props: text, classNames
function renderItems(items, elementName, containerId) {
    let container = document.getElementById(containerId);
    items.forEach(item => {
        createElement(elementName, item.text, item.classNames) |> container.appendChild;
    });
}

function createElement(elementName, text, classNames) {
    let el = document.createElement(elementName);
    el.innerText = text;
    el.className = classNames;
    return el;
}
