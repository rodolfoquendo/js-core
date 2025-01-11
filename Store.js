export default class Store{
    static _store (key, value = null, ttl = null) {
        const currentDate = new Date(),
            currentTime = currentDate.getTime();
        key = btoa(key);
        ttl = ttl !== null ? ttl * 1000 : null;
        if (value !== null) {
            const expirationDate = new Date();
            expirationDate.setTime(currentTime + ttl); 
            value = {
                value : value,
                ttl : ttl,
                time: {
                    current : {
                        date: currentDate,
                        time: currentTime
                    }, 
                    expires : ttl !== null ? {
                        time: expirationDate.getTime(),
                        date: expirationDate
                    } : null
                }
            };
            value = JSON.stringify(value);
            value = btoa(value);
            localStorage.setItem(key, value);
        }
        value = localStorage.getItem(key);
        if(value !== null){
            value = atob(value);
            value = JSON.parse(value);
            if(value === null){
                return value;
            }
            const value_expiration_time = value.time.expires !== null ? value.time.expires.time :  null,
                expires    = ttl !== null ? (value.time.current.time + ttl) : value_expiration_time,
                is_expired = expires !== null && expires <= currentTime;
            if(is_expired){
                value = null;
                localStorage.removeItem(key);
            }else{
                value = value.value;
            }
        }
        return value;
    }
}