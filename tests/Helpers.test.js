import Helpers from '../lib/Helpers.js';

test('Helpers.isset', async () => {
  expect(Helpers.isset(hola)).toBe(false);
  let hola;
  expect(Helpers.isset(hola)).toBe(false);
  let adios = null;
  expect(Helpers.isset(adios)).toBe(true);
  let array = [];
  expect(Helpers.isset(array[0])).toBe(false);
  expect(Helpers.isset(array['hola'])).toBe(false);
  array["adios"] = true;
  expect(Helpers.isset(array['adios'])).toBe(true);
});
test('Helpers.empty', async () => {
  expect(Helpers.empty(hola)).toBe(true);
  let hola;
  expect(Helpers.empty(hola)).toBe(true);
  let adios = null;
  expect(Helpers.empty(adios)).toBe(false);
  let array = [];
  expect(Helpers.empty(array[0])).toBe(true);
  expect(Helpers.empty(array['hola'])).toBe(true);
  array["adios"] = true;
  expect(Helpers.empty(array['adios'])).toBe(false);
});
test('Helpers.is_null', async () => {
  expect(Helpers.is_null(test)).toBe(false);
  let test;
  expect(Helpers.is_null(test)).toBe(false);
  test = null;
  expect(Helpers.is_null(test)).toBe(true);
  test = 123;
  expect(Helpers.is_null(test)).toBe(false);
});
test('Helpers.is_object', async () => {
  let test = 'asd';
  expect(Helpers.is_object(test)).toBe(false);
  test = 1234;
  expect(Helpers.is_object(test)).toBe(false);
  test = {};
  expect(Helpers.is_object(test)).toBe(true);
});
test('Helpers.is_array', async () => {
  let test = 'asd';
  expect(Helpers.is_array(test)).toBe(false);
  test = {};
  expect(Helpers.is_array(test)).toBe(false);
  test = 1234;
  expect(Helpers.is_array(test)).toBe(false);
  test = [];
  expect(Helpers.is_array(test)).toBe(true);
});
test('Helpers.in_array', async () => {
  let test = {};
  expect(Helpers.in_array("hola",test)).toBe(false);
  test = 'asd';
  expect(Helpers.in_array("hola",test)).toBe(false);
  test = 123;
  expect(Helpers.in_array("hola",test)).toBe(false);
  test = [];
  expect(Helpers.in_array("hola",test)).toBe(false);
  test.push("Adios");
  expect(Helpers.in_array("hola",test)).toBe(false);
  test.push("hola");
  expect(Helpers.in_array("hola",test)).toBe(true);
});
test('Helpers.number_format', async () => {
  expect(Helpers.number_format(14)).toBe("14.00");
  expect(Helpers.number_format(Infinity)).toBe("0.00");
  expect(Helpers.number_format(14, Infinity)).toBe("14");
  expect(Helpers.number_format(Infinity, Infinity)).toBe("0");
  expect(Helpers.number_format(14.0,2)).toBe("14.00");
  expect(Helpers.number_format(14.001,2)).toBe("14.00");
  expect(Helpers.number_format(14.0001,2)).toBe("14.00");
  expect(Helpers.number_format(1400000.00001,3,',','.')).toBe("1.400.000,000");
});