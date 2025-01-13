import EventListeners from '../lib/EventListeners.js';

test('EventListeners.add', async () => {
  const element_id = 'event-listeners-add';
  document.querySelector('body').innerHTML += `<div id="${element_id}"></div>`;
  const element = document.getElementById(element_id);
  expect(EventListeners.add(element,'click',()=>{})).toBe(true);
});

test('EventListeners.remove', async () => {
  const element_id = 'event-listeners-remove';
  document.querySelector('body').innerHTML += `<div id="${element_id}"></div>`;
  const element = document.getElementById(element_id);
  expect(EventListeners.add(element,'click',()=>{})).toBe(true);
  expect(EventListeners.remove(element,'click',()=>{})).toBe(true);
});

test('EventListeners._e', async () => {
  const element_id = 'event-listeners-_e';
  document.querySelector('body').innerHTML += `<div id="${element_id}"></div>`;
  const element = document.getElementById(element_id);
  expect(EventListeners._e(element,'click',()=>{})).toBe(true);
});
