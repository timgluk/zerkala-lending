// модалльное окно
const singInButtons = [...document.querySelectorAll(".buttons__button_prime")];
const singInButtonFile = document.querySelector(
  ".buttons__button_transparrent"
);
const singInButtonReviews = document.querySelector(".reviews__button");
const modal = document.querySelector(".modal-wrapper");
const modalFile = document.querySelector(".modal-wrapper-file");

singInButtonFile.addEventListener("click", () => {
  modalFile.classList.add("modal-wrapper_active");
});

singInButtons.map((singInButton) => {
  singInButton.addEventListener("click", () => {
    modal.classList.add("modal-wrapper_active");
  });
});

singInButtonReviews.addEventListener("click", () => {
  modal.classList.add("modal-wrapper_active");
});

modal.addEventListener("click", (e) => {
  const caption = e.target;
  if (!caption.classList.contains("modal-wrapper_active")) return;
  modal.classList.remove("modal-wrapper_active");
});

modalFile.addEventListener("click", (e) => {
  const caption = e.target;
  if (!caption.classList.contains("modal-wrapper_active")) return;
  modalFile.classList.remove("modal-wrapper_active");
});

// Калькуляторы

const partsPrice = 242; // Цена Комплектующие кв.м
const montagePrice = 450; // Цена за Монтаж кв.м
const calculators = [...document.querySelectorAll(".calculator-wrap")];

calculators.map((calc) => {
  const readButton = calc.querySelector(".description__text_link"); // Читать далее
  const dissText = calc.querySelector(".description__text_diss"); // Скрытый текст
  const lengthData = calc.querySelector("#length"); // input Длина
  const widthData = calc.querySelector("#width"); // input Ширина
  const square = calc.querySelector("#square"); // input квадратный метр
  const sumOut = calc.querySelector(".out-wrap__total"); // Вывод div Сумма
  const partsOutSum = calc.querySelector("#parts-sum"); // Вывод Цена + комплектующие
  const montageOutSum = calc.querySelector("#montage"); // Вывод Цена + комплектующие + монтаж
  const productPrice = parseFloat(
    calc
      .querySelector(".out-wrap__input-price-square")
      .innerHTML.replace(/[^0-9.]/g, "")
  );
  const buttonСalculate = calc.querySelector(".buttons__calculate"); // Кнопка
  const buttonForm = calc.querySelector(".buttons__button"); // Кнопка
  let sum; // Сумма

  readButton.addEventListener("click", () => {
    readButton.style.display = "none";
    dissText.style.display = "inline";
  });

  buttonForm.addEventListener("click", () => {
    modal.classList.add("modal-wrapper_active");
  });

  buttonСalculate.addEventListener("click", (e) => {
    let l = +lengthData?.value;
    let w = +widthData?.value;
    let s = +square?.value;
    let valueSquare = s > 0 ? s : l * w; // Количество квадратных метров
    if (s > 0 || l * w === s) {
      sum = valueSquare * productPrice; //
      sumOut.textContent = `${sum} ₽`;
      partsOutSum.textContent = `${sum + partsPrice * valueSquare} ₽`;
      montageOutSum.textContent = `${
        sum + partsPrice * valueSquare + montagePrice * valueSquare
      } ₽`;
    }

    if (s > 0 && l * w != s) {
      lengthData.value = 0;
      widthData.value = 0;
      sum = valueSquare * productPrice; //
      sumOut.textContent = `${sum} ₽`;
      partsOutSum.textContent = `${sum + partsPrice * valueSquare} ₽`;
      montageOutSum.textContent = `${
        sum + partsPrice * valueSquare + montagePrice * valueSquare
      } ₽`;
    }

    if (s <= 0) {
      sum = valueSquare * productPrice; //
      sumOut.textContent = `${sum} ₽`;
      partsOutSum.textContent = `${sum + partsPrice * valueSquare} ₽`;
      montageOutSum.textContent = `${
        sum + partsPrice * valueSquare + montagePrice * valueSquare
      } ₽`;
    }
  });
});

// Вопросы и ответы

const question = [...document.querySelectorAll(".question")];

question.map((el) =>
  el.addEventListener("click", (e) => {
    const answer = el.nextElementSibling;
    const arrow = el.querySelector(".question__arrow");
    answer.classList.toggle("answer_active");
    arrow.classList.toggle("question__arrow_active");
  })
);

// Отправка формы

// async function submitForm(event) {
//   event.preventDefault(); // отключаем перезагрузку/перенаправление страницы
//   try {
//     // Формируем запрос
//     const response = await fetch(event.target.action, {
//       method: "POST",
//       body: new FormData(event.target),
//     });
//     // проверяем, что ответ есть
//     if (!response.ok)
//       throw `Ошибка при обращении к серверу: ${response.status}`;
//     // проверяем, что ответ действительно JSON
//     const contentType = response.headers.get("content-type");
//     if (!contentType || !contentType.includes("application/json")) {
//       throw "Не отправлено. Вы - РОБОТ!";
//     }
//     // обрабатываем запрос
//     const json = await response.json();
//     if (json.result === "success") {
//       // в случае успеха
//       alert(json.info);
//       setTimeout(() => {
//         modal.classList.remove("modal-wrapper_active");
//       }, "1000");
//     } else {
//       // в случае ошибки
//       console.log(json);
//       throw json.info;
//     }
//   } catch (error) {
//     // обработка ошибки
//     alert(error);
//   }
// }

async function submitForm(event) {
  event.preventDefault(); // отключаем перезагрузку/перенаправление страницы
  try {
  	// Формируем запрос
    const response = await fetch(event.target.action, {
    	method: 'POST',
    	body: new FormData(event.target)
    });
    // проверяем, что ответ есть
    if (!response.ok) throw (`Ошибка при обращении к серверу: ${response.status}`);
    // проверяем, что ответ действительно JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw ('Ошибка обработки. Ответ не JSON');
    }
    // обрабатываем запрос
    const json = await response.json();
    if (json.result === "success") {
    	// в случае успеха
    	alert(json.info);
    } else { 
    	// в случае ошибки
    	console.log(json);
    	throw (json.info);
    }
  } catch (error) { // обработка ошибки
    alert(error);
  }
}
