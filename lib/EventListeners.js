/**
 * Adds and remove an event listener to provided element
 * Ensure the handle is an already defined function
 * 
 * @param {HTMLElement} element 
 * @param {String} type 
 * @param {Callable} handle 
 * @returns {boolean}
 */
export const _eventAdd = (element, type, handle) => {
    element.addEventListener(type,handle);
    return true;
}

/**
 * Adds and remove an event listener to provided element
 * Ensure the handle is an already defined function
 * 
 * @param {HTMLElement} element 
 * @param {String} type 
 * @param {Callable} handle 
 * @returns {boolean}
 */
export const _eventRemove = (element, type, handle) => {
    element.removeEventListener(type,handle);
    return true;
}

/**
 * Adds and remove an event listener to provided element
 * Ensure the handle is an already defined function
 * 
 * @param {HTMLElement} element 
 * @param {String} type 
 * @param {Callable} handle 
 * @returns {boolean}
 */
export const _event = (element, type, handle) => {
    return _eventRemove(element,type, handle)
        && _eventAdd(element,type, handle);
}