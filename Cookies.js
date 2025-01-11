export default class Cookies{
    add (cookieName, val, expire = 365){
        const d = new Date();
        d.setTime(d.getTime() + (expire * 24 * 3600 * 1000));
        document.cookie = cookieName + "=" + val + ";expires=" + d.toUTCString() + ";path=/;SameSite=Lax;";
    }
    get (cookieName){
        const name = cookieName + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
    }
    check (cookieName){
        const cookie = this.get(cookieName);
        if (cookie != "") {
            return cookie;
        }
        return false;
    }
}