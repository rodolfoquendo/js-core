import Helpers from '../lib/Helpers.js';

export default class Statistics{
    #needles = []
    static updating = false;
    setNeedles(needles){
        this.#needles = needles;
        return this;
    }
    buildData(){
        let data = {};
        this.#needles.forEach(needle => {
            let value =  0;
            if(Helpers.empty(data[needle.statistic_name])){
                data[needle.statistic_name] = 0;
            }
            if(Helpers.isset(needle.element_id) 
                && !Helpers.is_null(needle.element_id) 
                && !Helpers.is_null(document.getElementById(needle.element_id)) 
            ){
                data[needle.statistic_name] = 1;
            }
            if(Helpers.isset(needle.element_class) 
                && !Helpers.is_null(needle.element_class) 
                && !Helpers.is_null(document.querySelector(needle.element_class))      
            ){
                data[needle.statistic_name] = 1;
            }
            if(Helpers.isset(needle.element_data) 
                && !Helpers.is_null(needle.element_data)
                && !Helpers.is_null(document.querySelector(`[data-${needle.element_data}]`))           
            ){
                data[needle.statistic_name] = 1;
            }
            if(Helpers.isset(needle.url_full) 
                && !Helpers.is_null(needle.url_full)
                && window.location.href.substring(0, needle.url_full.length) == needle.url_full    
            ){
                data[needle.statistic_name] = 1;
            }
            if(Helpers.isset(needle.url_needle) 
                && !Helpers.is_null(needle.url_needle) 
                && window.location.href.includes(needle.url_needle)   
            ){
                data[needle.statistic_name] = 1;
            }
        });
        return data;
    }
    update(){
        const url = document.querySelector('body').getAttribute('data-stats_update_url');
        if(Statistics.updating || Helpers.is_null(url)){
            return null;
        }
        Statistics.updating = true;
        return fetch(url, {
            method: 'POST',
            mode: 'cors', 
            body: JSON.stringify(this.buildData())
        }).finally(() => {
            Statistics.updating = false;
        });
    }
    start(){
        if(Helpers.empty(window.intervals)){
            window.intervals = {};
        }
        window.intervals['statistics.start'] = setInterval(function(){
            /* istanbul ignore next line */
            stats.update();
        },60000);
    }
    static init(needles = []){
        const stats = new Statistics(needles);
        return stats.start();
    }
}