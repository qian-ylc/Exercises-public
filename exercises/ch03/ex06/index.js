export function substring(str, indexStart, indexEnd) {
  let result = ""
  //undefined
  if (indexEnd === undefined) {
    indexEnd = str.length
  }
  //NaN Infinity
  if (isNaN(indexStart)) {
    indexStart = 0
  }
  if (isNaN(indexEnd)) {
    indexEnd = 0
  }
  //小数
  indexStart = Math.trunc(indexStart)
  indexEnd = Math.trunc(indexEnd)
  //まずは交換、そして負数の処理？
  if (indexStart > indexEnd) {
    [indexStart, indexEnd] = [indexEnd, indexStart]
  }
  //負数
  if (indexStart < 0) {
    indexStart = 0
  }
  if (indexEnd < 0) {
    indexEnd = str.length + indexEnd
  }
  //indexEnd > str.length
  if (indexEnd > str.length) {
    indexEnd = str.length
  }

  // 結果判定
  // indexStart>=indexEnd
  if (indexStart === indexEnd) {
    return ""
  }
  if (indexStart > str.length) {
    return ""
  }
  //通常処理
  for (let i = indexStart; i < indexEnd; i++) {
    result += str[i]
  }

  return result;
}

export function slice(str, indexStart, indexEnd) {
  let result = ""
  //前処理
  //undefined
  if (indexStart === undefined) {
    indexStart = 0
  }
  if (indexEnd === undefined) {
    indexEnd = str.length
  }
  //NaN Infinity
  if (isNaN(indexStart)) {
    indexStart = 0
  }
  if (isNaN(indexEnd)) {
    indexEnd = 0
  }
  //小数
  indexStart = Math.trunc(indexStart)
  indexEnd = Math.trunc(indexEnd)
  //負数
  if (indexStart < 0) {
    indexStart = Math.max(indexStart + str.length, 0)
  }
  if (indexEnd < 0) {
    indexEnd = Math.max(str.length + indexEnd, 0)
  }
  //indexEnd > str.length
  if (indexEnd > str.length) {
    indexEnd = str.length
  }

  //結果判定
  if (indexStart >= str.length) {
    return ""
  }
  if (indexEnd <= indexStart) {
    return ""
  }

  //通常処理
  for (let i = indexStart; i < indexEnd; i++) {
    result += str[i]
  }
  return result
}

export function padStart(str, targetLength, padString) {
  let result = str
  //padString省略される
  if (padString === undefined) {
    padString = " "
  }

  //
  if (targetLength <= 0) {
    return str
  }
  if (targetLength <= str.length) {
    return str
  }

  //通常処理
  let pad = ""
  for (let i = 0; i < targetLength - str.length; i++) {
    pad += padString[i % padString.length]
  }
  result = pad + result
  return result
}

export function trim(str) {
  let start = 0
  let end = str.length - 1
  let result = ""
  while (str[start] === " ") {
    start++
  }
  while (str[end] === " ") {
    end--
  }
  for (let i = start; i <= end; i++) {
    result += str[i]
  }

  return result;
}