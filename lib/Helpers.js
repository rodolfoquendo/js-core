export const isset = (variable) => {
    return typeof variable !== typeof undefined;
}

export const empty = (variable) => {
    return !isset(variable);
}

export const is_null = (variable) => {
    return isset(variable) && variable === null;
}

export const is_array = (variable) => {
    return Array.isArray(variable);
}

export const is_object = (variable) => {
    return typeof variable === 'object';
}

export const in_array = (needle, haystack) => {
    return is_array(haystack) ? haystack.includes(needle) : false;
}

export const number_format = (number, decimals = 2, dec = '.', sep = '') => {
    // Strip all characters but numerical ones.
    number = isFinite(+number) ? (number + '').replace(/[^0-9+\-Ee.]/g, '') : number;
    let n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        s = '',
        toFixedFix =  (n, prec) => {
            const k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
};

