const arr = ['a', 'b', null, 1, 5, 'b', 'ab', 'a', 'a', 'a', 'b']
const findMaxDuplicatedString = arr => {
  const collection = {}
  let maxCount = 0
  let mostFrequentlyOccuredString

  arr.forEach((el) => {
    if (typeof el === 'string') {
      collection[el] ? collection[el] +=1 : collection[el] = 1

      if (collection[el] > maxCount) {
        maxCount = collection[el]
        mostFrequentlyOccuredString = el
      }
    }
  })

  return mostFrequentlyOccuredString
}

console.log(findMaxDuplicatedString(arr))