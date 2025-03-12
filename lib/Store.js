const _store = (key, value = null, ttl = null, encode = true) => {
    const currentDate = new Date(),
        currentTime = currentDate.getTime();
    key = encode ? btoa(key) : key;
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
        value = encode ? btoa(value) : value;
        localStorage.setItem(key, value);
    }
    value = localStorage.getItem(key);
    if(value !== null){
        value = encode ? atob(value) : value;
        value = JSON.parse(value);
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
export default _store;