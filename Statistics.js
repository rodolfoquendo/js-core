export default class Statistics{
    #needles = []
    setNeedles(needles){
        this.#needles = needles;
        return this;
    }
    buildData(){
        let data = {};
        this.#needles.forEach(needle => {
            const element_id = typeof needle.element_id !== typeof undefined ? needle.element_id : null,
            element_data = typeof needle.element_data !== typeof undefined ? needle.element_data : null,
            element_class = typeof needle.class !== typeof undefined ? needle.class : null,
            url_needle = typeof needle.url !== typeof undefined ? needle.url : null,
            statistic_name = typeof needle.stat !== typeof undefined ? needle.stat : null;
            if(!is_null(element_id)){
                data[statistic_name] = !is_null(document.getElementById(element_id)) ? 1 : 0;
            }
            if(!is_null(element_data)){
                data[statistic_name] = !is_null(document.querySelector(`[data-${element_data}]`)) ? 1 : 0;
            }
            if(!is_null(element_class)){
                data[statistic_name] = !is_null(document.querySelector(`.${element_class}`)) ? 1 : 0;
            }
        });
        return data;
    }
    update(){
        return !App.actions("StatisticsUpdate") 
        ?  App.actions("StatisticsUpdate", true) && fetch(window.app_url, {
            method: 'POST',
            mode: 'cors', 
            body: JSON.stringify(this.buildData())
        }).finally(() => {
            App.actions("StatisticsUpdate", false);
        })
        : null;
    }
    static init(needles = []){
        const stats = new Statistics(needles);
        return stats.update();
    }
}