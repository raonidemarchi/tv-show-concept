export const removeNullItemsFromArray = (objectArray) => {
  return objectArray.filter(item => item)
}

export const getLowestNumberFromObjectArray = (objectArray, property) => {
  let numbersArray = objectPropertyToArray(objectArray, property)
  return Math.min(...numbersArray)
}

export const groupObjectArrayPropertyValues = (objectArray, property) => {
  let array = objectPropertyToArray(objectArray, property)
  return [...new Set(array)]
}

export const objectPropertyToArray = (objectArray, property) => {
  return objectArray.map(item => item[property])
}
