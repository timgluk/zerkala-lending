const length = document.querySelector('#length') // input Длина
const width = document.querySelector('#width') // input Ширина
const square = document.querySelector('#square') // input квадратный метр
const sumOut = document.querySelector('.out-wrap__total') // Вывод div Сумма
const partsOutSum = document.querySelector('#parts-sum') // Вывод Цена + комплектующие
const montageOutSum = document.querySelector('#montage') // Вывод Цена + комплектующие + монтаж
const squarePrice = 454.25 // Цена за квадрат Байкал и Ритейл
const partsPrice = 242 // Цена Комплектующие кв.м
const montagePrice = 450 // Цена за монтаж кв.м
let valueSquare // Количество квадратных метров
let sum // Сумма 

const button = document.querySelector('.buttons__button') // Кнопка

button.addEventListener('click', (e) => {
  if (square.value != 0 || square.value.length != 0) {
    valueSquare = square.value
  } 

  if (square.value.length === 0 || square.value == 0) {
    valueSquare = length.value * width.value
    square.value = length.value * width.value
  }

  sum = valueSquare * squarePrice
  sumOut.textContent = `${sum} ₽`
  partsOutSum.textContent = `${sum + partsPrice * valueSquare} ₽`
  montageOutSum.textContent = `${sum + partsPrice * valueSquare + montagePrice * valueSquare} ₽`
  console.log(valueSquare, square.value)
})