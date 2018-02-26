'use strict';

(function () {

  // функция последовательного выбора цвета у массива
  window.getColor = function (arr) {
    arr.push(arr.shift());
    return arr[0];
  };

  // смена цветов волшебника
  // смена цвета мантии
  window.wizardCoat.addEventListener('click', function () {
    window.wizardCoat.style.fill = window.getColor(window.wizardCoatColors);
  });

  // смена цвета глаз
  window.wizardEyes.addEventListener('click', function () {
    window.wizardEyes.style.fill = window.getColor(window.wizardEyesColors);
  });

  // смена цвета фаербола
  window.wizardFireball.addEventListener('click', function () {
    window.wizardFireball.style.backgroundColor = window.getColor(window.wizardFireballColors);
  });

})();

