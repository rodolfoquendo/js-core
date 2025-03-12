import {
  _eventAdd,
  _eventRemove,
  _event
} from '../lib/EventListeners.js';
let _test = 0;
const testUpdate = () => _test++;
test('_eventAdd', async () => {
  const element_id = 'event-listeners-add';
  document.querySelector('body').innerHTML += `<div id="${element_id}"></div>`;
  const element = document.getElementById(element_id);
  expect(_eventAdd(element,'click',testUpdate)).toBe(true);
  _test = 0
  element.click();
  expect(_test).toBe(1);
});

test('_eventRemove', async () => {
  const element_id = 'event-listeners-remove';
  document.querySelector('body').innerHTML += `<div id="${element_id}"></div>`;
  const element = document.getElementById(element_id);
  expect(_eventAdd(element,'click',testUpdate)).toBe(true);
  _test = 0
  element.click();
  expect(_test).toBe(1);
  expect(_eventRemove(element,'click',testUpdate)).toBe(true);
  _test = 0
  element.click();
  expect(_test).toBe(0);
});

test('_event', async () => {
  const element_id = 'event-listeners-_e';
  document.querySelector('body').innerHTML += `<div id="${element_id}"></div>`;
  const element = document.getElementById(element_id);
  expect(_event(element,'click',testUpdate)).toBe(true);
  _test = 0
  element.click();
  expect(_test).toBe(1);
});
