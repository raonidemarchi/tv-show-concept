import { removeNullItemsFromArray, objectPropertyToArray, getLowestNumberFromObjectArray, groupObjectArrayPropertyValues } from './Helpers'

it('remove null rows from array', () => {
  const objArray = [{ 'item': 'value' }, null, { 'item': 'value' }]
  const arrayWithoutNulls = removeNullItemsFromArray(objArray)

  expect(arrayWithoutNulls.findIndex(item => item === null)).toEqual(-1)
})

it('transform object property into array', () => {
  const objArray = [{ 'item': 'value1' }, { 'item': 'value2' }]
  const array = objectPropertyToArray(objArray, 'item')

  expect(array).toEqual(['value1', 'value2'])
})

it('get lowest number from object array', () => {
  const objArray = [{ 'number': 90 }, { 'number': 12 }, { 'number': 2 }, { 'number': 4 }]
  const lowestNumber = getLowestNumberFromObjectArray(objArray, 'number')

  expect(lowestNumber).toEqual(2)
})

it('group object array property values', () => {
  const objArray = [{ 'name': 'Luke' }, { 'name': 'Luke' }, { 'name': 'Leya' }, { 'name': 'R2' }, { 'name': 'R2' }]
  const uniqueValue = groupObjectArrayPropertyValues(objArray, 'name')

  expect(uniqueValue).toEqual(['Luke', 'Leya', 'R2'])
})
