import {
  isset, 
  empty,
  is_null,
  is_object,
  is_array,
  in_array,
  number_format,
} from '../lib/Helpers.js';

test('isset', async () => {
  expect(isset(hola)).toBe(false);
  let hola;
  expect(isset(hola)).toBe(false);
  let adios = null;
  expect(isset(adios)).toBe(true);
  let array = [];
  expect(isset(array[0])).toBe(false);
  expect(isset(array['hola'])).toBe(false);
  array["adios"] = true;
  expect(isset(array['adios'])).toBe(true);
});
test('empty', async () => {
  expect(empty(hola)).toBe(true);
  let hola;
  expect(empty(hola)).toBe(true);
  let adios = null;
  expect(empty(adios)).toBe(false);
  let array = [];
  expect(empty(array[0])).toBe(true);
  expect(empty(array['hola'])).toBe(true);
  array["adios"] = true;
  expect(empty(array['adios'])).toBe(false);
});
test('is_null', async () => {
  expect(is_null(test)).toBe(false);
  let test;
  expect(is_null(test)).toBe(false);
  test = null;
  expect(is_null(test)).toBe(true);
  test = 123;
  expect(is_null(test)).toBe(false);
});
test('is_object', async () => {
  let test = 'asd';
  expect(is_object(test)).toBe(false);
  test = 1234;
  expect(is_object(test)).toBe(false);
  test = {};
  expect(is_object(test)).toBe(true);
});
test('is_array', async () => {
  let test = 'asd';
  expect(is_array(test)).toBe(false);
  test = {};
  expect(is_array(test)).toBe(false);
  test = 1234;
  expect(is_array(test)).toBe(false);
  test = [];
  expect(is_array(test)).toBe(true);
});
test('in_array', async () => {
  let test = {};
  expect(in_array("hola",test)).toBe(false);
  test = 'asd';
  expect(in_array("hola",test)).toBe(false);
  test = 123;
  expect(in_array("hola",test)).toBe(false);
  test = [];
  expect(in_array("hola",test)).toBe(false);
  test.push("Adios");
  expect(in_array("hola",test)).toBe(false);
  test.push("hola");
  expect(in_array("hola",test)).toBe(true);
});
test('number_format', async () => {
  expect(number_format(14)).toBe("14.00");
  expect(number_format(Infinity)).toBe("0.00");
  expect(number_format(14, Infinity)).toBe("14");
  expect(number_format(Infinity, Infinity)).toBe("0");
  expect(number_format(14.0,2)).toBe("14.00");
  expect(number_format(14.001,2)).toBe("14.00");
  expect(number_format(14.0001,2)).toBe("14.00");
  expect(number_format(1400000.00001,3,',','.')).toBe("1.400.000,000");
});