
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const isset = (variable) => typeof variable !== typeof undefined;
const empty = (variable) => !isset(variable);
const is_null = (variable) => isset(variable) && variable === null;
const is_array = (variable) => Array.isArray(variable);
const is_object = (variable) => typeof variable === 'object';
const in_array = (needle, haystack) => is_array(haystack) ? haystack.includes(needle) : false;
const number_format = (number, decimals = 2, dec_point = '.', thousands_sep = '') => {
    // Strip all characters but numerical ones.
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    let n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
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