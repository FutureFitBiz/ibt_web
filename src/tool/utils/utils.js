import store from '@/tool/store.js'

export function checkLogic(logic, answers, externalAnswers) {
  let answerValues = Object.values(answers)
  let externalAnswerValues = []
  if (externalAnswers) {
    answerValues.concat(Object.values(externalAnswers))
  }

  return logic.every((anyArray, index1, arr1) => {
    return anyArray.some((questionCode, index, arr) => {
        return answerValues.includes(questionCode)
    })
  })
}

export function findProduct(code) {
  for (let item of store.state.products) {
    if (item.path === code) {
      return item
    }
  }
}
