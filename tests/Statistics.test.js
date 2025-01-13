import Statistics from '../lib/Statistics.js';
import Helpers from '../lib/Helpers.js';

global.fetch = (data) => new Promise((resolve, reject) => {
  resolve(data);
});
// Mock window.location
global.window.location = {
  href: 'http://dummy.com?page=1&name=testing',
  /*
  * Other settings
  */
  toString: () => {
      return global.window.location.href;
  },
};

test('Statistics.setNeedles', async () => {
  let instance = new Statistics(),
    needles = [
      {
        statistic_name: 'test_id',
        element_id : "test_id",
        element_class : null,
        element_data : null,
        url_full : null,
        url_needle : null,
      },
      {
        statistic_name: 'test_class',
        element_id : null,
        element_class : '.test_class',
        element_data : null,
        url_needle : null,
        url : null,
      },
      {
        statistic_name: 'test_data',
        element_id : null,
        element_class : null,
        element_data : 'test_data="testing"',
        url_full : null,
        url_needle : null,
      },
      {
        statistic_name: 'test_url_full',
        element_id : null,
        element_class : null,
        element_data : null,
        url_full : 'test_url_full',
        url_needle : null,
      },
      {
        statistic_name: 'test_url_needle',
        element_id : null,
        element_class : null,
        element_data : null,
        url_full : null,
        url_needle : 'test_url_needle',
      },
    ];
  instance.setNeedles(needles);
  let data = instance.buildData();
  expect(Helpers.isset(data['test_id'])).toBe(true);
  expect(Helpers.isset(data['test_class'])).toBe(true);
  expect(Helpers.isset(data['test_data'])).toBe(true);
  expect(Helpers.isset(data['test_url_full'])).toBe(true);
  expect(Helpers.isset(data['test_url_needle'])).toBe(true);
  expect(data['test_id'] == 0).toBe(true);
  expect(data['test_class'] == 0).toBe(true);
  expect(data['test_data'] == 0).toBe(true);
  expect(data['test_url_full'] == 0).toBe(true);
  expect(data['test_url_needle'] == 0).toBe(true);

  document.querySelector('body').setAttribute('data-test_data','testing');
  data = instance.buildData()
  expect(data['test_data'] == 1).toBe(true);

  document.querySelector('body').innerHTML += '<div id="test_id"></div>';
  data = instance.buildData()
  expect(data['test_id'] == 1).toBe(true);
  expect(data['test_class'] == 0).toBe(true);
  expect(data['test_data'] == 1).toBe(true);
  expect(data['test_url_full'] == 0).toBe(true);
  expect(data['test_url_needle'] == 0).toBe(true);

  document.querySelector('body').innerHTML += '<div class="test_class"></div>';
  data = instance.buildData()
  expect(data['test_id'] == 1).toBe(true);
  expect(data['test_class'] == 1).toBe(true);
  expect(data['test_data'] == 1).toBe(true);
  expect(data['test_url_full'] == 0).toBe(true);
  expect(data['test_url_needle'] == 0).toBe(true);


  window.location.href = 'test_url_full';
  data = instance.buildData()
  console.log(window.location.href);
  expect(data['test_id'] == 1).toBe(true);
  expect(data['test_class'] == 1).toBe(true);
  expect(data['test_data'] == 1).toBe(true);
  expect(data['test_url_full'] == 1).toBe(true);
  expect(data['test_url_needle'] == 0).toBe(true);

  window.location.href = 'asd/test_url_needle/asd';
  data = instance.buildData()
  expect(data['test_url_needle'] == 1).toBe(true);

  expect(instance.update()).toBe(null);

  document.querySelector('body').setAttribute('data-stats_update_url','https://insigniaeducation.com/');
  expect(instance.update() !== null).toBe(true);
  
  instance.start();
  expect(typeof window.intervals['statistics.start'] !== typeof undefined).toBe(true);
  clearInterval(window.intervals['statistics.start']);
  window.intervals = {}
  expect(typeof window.intervals['statistics.start'] === typeof undefined).toBe(true);
  Statistics.init([
    {
      statistic_name: 'test_id',
      element_id : "test_id",
      element_class : null,
      element_data : null,
      url_full : null,
      url_needle : null,
    },
  ]);
  expect(typeof window.intervals['statistics.start'] !== typeof undefined).toBe(true);

});