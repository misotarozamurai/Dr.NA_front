'use strict'

//--------------------------------------------------------------------------
// DOMの生成を行います
//--------------------------------------------------------------------------
// ----- Creates the specified element -----
// true = id : false = class
export const createElement = (element, choice, names = []) => {
    const _element = document.createElement(element);
    if(choice) {
        _element.id = escapeHtml(names[0]);
        return _element;
    }
    _.forEach(names, name => {
        _element.classList.add(escapeHtml(name));
    });
    return _element;
}

// ----- Perform HTML escaping -----
export const escapeHtml = str => {
    str = str.replace(/&/g, '&amp;');
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    str = str.replace(/"/g, '&quot;');
    str = str.replace(/'/g, '&#39;');
    return str;
}

//--------------------------------------------------------------------------
// Wrapperの制御を行います
//--------------------------------------------------------------------------
const divWrapper = document.getElementById('wrapper');
// ----- Change the style of wrapper and prepare for drawing animation -----
export const wrapperStyleToggle = (names = []) => {
    _.forEach(names, name => {
        divWrapper.classList.toggle(name);
    });
}

// ----- Delete all child elements -----
export const removeWrapperChild = () => {
    while(divWrapper.firstChild) {
        divWrapper.removeChild(divWrapper.firstChild);
    }
}

// ----- Deletes the child element specified by ID -----
export const removeSpecificChild = name => {
    const child = document.getElementById(name);
    divWrapper.removeChild(child);
}