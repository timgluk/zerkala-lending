const lengthData = document.querySelector('#length') // input Длина
const widthData = document.querySelector('#width') // input Ширина
const square = document.querySelector('#square') // input квадратный метр
const sumOut = document.querySelector('.out-wrap__total') // Вывод div Сумма
const partsOutSum = document.querySelector('#parts-sum') // Вывод Цена + комплектующие
const montageOutSum = document.querySelector('#montage') // Вывод Цена + комплектующие + монтаж
const squarePrice = 454.25 // Цена за квадрат Байкал и Ритейл
const partsPrice = 242 // Цена Комплектующие кв.м
const montagePrice = 450 // Цена за монтаж кв.м
const button = document.querySelector('.buttons__button') // Кнопка
let sum // Сумма 

button.addEventListener('click', (e) => {
  let l = +lengthData?.value
  let w = +widthData?.value
  let s = +square?.value

  let valueSquare = s > 0 ? s : l * w // Количество квадратных метров

  console.log(valueSquare)
  if (s > 0 || l * w === s) {
    sum = valueSquare * squarePrice 
    sumOut.textContent = `${sum} ₽`
    partsOutSum.textContent = `${sum + partsPrice * valueSquare} ₽`
    montageOutSum.textContent = `${sum + partsPrice * valueSquare + montagePrice * valueSquare} ₽`
  }

  if (s > 0 && l * w != s) {
    lengthData.value = 0
    widthData.value = 0
    sum = valueSquare * squarePrice
    sumOut.textContent = `${sum} ₽`
    partsOutSum.textContent = `${sum + partsPrice * valueSquare} ₽`
    montageOutSum.textContent = `${sum + partsPrice * valueSquare + montagePrice * valueSquare} ₽`
  }

  if ( s <= 0 ) {
    sum = valueSquare * squarePrice 
    sumOut.textContent = `${sum} ₽`
    partsOutSum.textContent = `${sum + partsPrice * valueSquare} ₽`
    montageOutSum.textContent = `${sum + partsPrice * valueSquare + montagePrice * valueSquare} ₽`
  }
})