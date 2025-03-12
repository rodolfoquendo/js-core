import _store from '../lib/Store.js';
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock;

test('_store', async () => {
  expect(_store('hola')).toBe(null);
  expect(_store('hola',null)).toBe(null);
  expect(_store('adios',null)).toBe(null);

  expect(_store('hola','hola')).toBe('hola');
  expect(localStorage.getItem(btoa('hola')) !== null).toBe(true);
  expect(localStorage.getItem('hola') === null).toBe(true);

 
  _store('test','hola', null, false);
  expect(localStorage.getItem('test') !== null).toBe(true);
  expect(localStorage.getItem('test').includes('"value":"hola"'));
  expect(localStorage.getItem('test').includes('"ttl":null'));
  expect(localStorage.getItem('test').includes('"expires":null'));
  expect(localStorage.getItem(btoa('test')) === null).toBe(true);


  expect(_store('hola',123)).toBe(123);
  _store('hola',123,1);
  expect(_store('hola')).toBe(123);
  await new Promise((r) => setTimeout(r, 2000));
  expect(_store('hola')).toBe(null);
});