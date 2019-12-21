'use strict'

//--------------------------------------------------------------------------
// DOMの生成を行います
//--------------------------------------------------------------------------
// Creates the specified element
// true = id : false = class
export const createElement = (element, choice, names = []) => {
    const _element = document.createElement(element);
    if(choice) {
        _element.id = names[0];
        return _element;
    }
    _.forEach(names, name => {
        _element.classList.add(name);
    });
    return _element;
}

//--------------------------------------------------------------------------
// Wrapperの制御を行います
//--------------------------------------------------------------------------
const divWrapper = document.getElementById('wrapper');
// Change the style of wrapper and prepare for drawing animation
export const wrapperStyleToggle = (names = []) => {
    _.forEach(names, name => {
        divWrapper.classList.toggle(name);
    });
}

// Delete all child elements
export const removeWrapperChild = () => {
    while(divWrapper.firstChild) {
        divWrapper.removeChild(divWrapper.firstChild);
    }
}