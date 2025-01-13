export default class EventListeners{
    static add(element, type, handle){
        element.addEventListener(type,handle);
        return true;
    }
    static remove(element, type, handle){
        element.removeEventListener(type,handle);
        return true;
    }
    static _e(element, type, handle){
        return EventListeners.remove(element,type, handle)
            && EventListeners.add(element,type, handle);
    }
}
