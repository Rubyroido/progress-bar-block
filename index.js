const progressBlock = document.querySelector('.progress');
const progressBar = progressBlock.querySelector('.progress-bar');
const input = progressBlock.querySelector('.progress__input');
const animateCheckbox = progressBlock.querySelector('.progress__animate');
const hideBlockCheckbox = progressBlock.querySelector('.progress__hide');

// функция для изменения значения в инпуте при введении значения меньше 0 или больше 100 
function inputMinMax(input) {
  if (input.value != '') {
    if (parseInt(input.value) < parseInt(input.min)) {
      input.value = input.min;
    }
    if (parseInt(input.value) > parseInt(input.max)) {
      input.value = input.max;
    }
  }
}

// функция для изменения прогресса на прогресс-баре
function changeProgress(value) {
  const angle = 360 / 100 * value;
  progressBar.style.background = `conic-gradient(blue ${angle}deg, lightgray 0deg)`
}

// позаимствовал у Доки - https://doka.guide/js/debounce/
// дебаунс для задержки изменения прогресс-бара
function debounce(callback, timeout) {
  return function perform(...args) {
    let previousCall = this.lastCall;
    this.lastCall = Date.now();
    if (previousCall && this.lastCall - previousCall <= timeout) {
      clearTimeout(this.lastCallTimer)
    }
    this.lastCallTimer = setTimeout(() => callback(...args), timeout)
  }
}

const deboucned = debounce(changeProgress, 300);

input.addEventListener('keyup', (e) => {
  inputMinMax(e.target)
  deboucned(e.target.value)
})

// анимация по чекбоксу, рекурсивная функция запускается при отметке чекбокса и продолжает вызываться с периодичностью в 1 секунду, пока чекбокс отмечен
function animate() {
  if (animateCheckbox.checked) {
    progressBar.classList.toggle('rotate');
    setTimeout(animate, 1000);
  } else {
    progressBar.classList.remove('rotate');
  }
}

animateCheckbox.addEventListener('change', animate)

// функция скрывания блока, добавил таймаут для того, чтобы была видна анимация тоггла
// при скрытии блока также отключаю чекбокс анимации, чтобы закончить рекурсию, которая иначе продолжила бы работать при скрытом блоке
function hideBlock() {
  if(hideBlockCheckbox.checked) {
    setTimeout(() => {
      animateCheckbox.checked = false;
      progressBlock.classList.add('hidden');
    }, 300)
  } 
}

hideBlockCheckbox.addEventListener('change', hideBlock)