class DomRenderer {
    static renderThing(data, containerOrContainerId){
        this.renderHbsTemplate(data, containerOrContainerId, 'thing');
    }

    static renderUl(data, containerOrContainerId) {
        this.renderHbsTemplate(data, containerOrContainerId, 'ul');
    }

    static renderP(data, containerOrContainerId) {
        this.renderHbsTemplate(data, containerOrContainerId, 'p');
    }

    static renderTable(data, containerOrContainerId) {
        this.renderHbsTemplate(data, containerOrContainerId, 'table');
    }

    static renderHbsTemplate(data, containerOrContainerId, templateName) {
        const renderedHtml = Handlebars.templates[templateName](data);
        this.resolveContainer(containerOrContainerId).innerHTML += renderedHtml;
    }

    static resolveContainer(containerOrContainerId) {
        if (containerOrContainerId instanceof Element)
            return containerOrContainerId;
        if (typeof (containerOrContainerId) == 'string')
            return document.getElementById(containerOrContainerId);
        return undefined;
    }
}