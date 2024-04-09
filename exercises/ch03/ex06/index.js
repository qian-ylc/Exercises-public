const indexpreprocess = (str, indexStart, indexEnd) => {
  //indexEndなし
  if (indexEnd === undefined || indexEnd > str.length) {
    let indexEnd = str.length
  }
  //NaN Infinity
  if (indexStart === NaN) {
    indexStart = 0
  }
  if (indexEnd === NaN) {
    indexEnd = 0
  }
  //小数
  let indexStartProcessed = Math.trunc(indexStart)
  let indexEndProcessed = Math.trunc(indexEnd)
  //負数
  if (indexStart < 0) {
    indexStart = 0
  }
  if (indexEnd < 0) {

  }

}

export function substring(str, indexStart, indexEnd) {
  let result = ""
  if (indexEnd === undefined || indexEnd > str.length) {
    indexEnd = str.length
  }

  if (indexStart === indexEnd) {
    return ""
  }
  if (indexStart > indexEnd) {
    [indexStart, indexEnd] = [indexEnd, indexStart]
  }

  for (let i = indexStart; i < indexEnd; i++) {
    result += str[i]
  }

  return result;
}

export function slice(str, indexStart, indexEnd) {
  let result = ""
  return "TODO";
}

export function padStart(str, targetLength, padString) {
  // TODO: ここを実装しなさい
  return "TODO";
}

export function trim(str) {
  // TODO: ここを実装しなさい
  return "TODO";
}
