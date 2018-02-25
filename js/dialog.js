'use strict';

(function () {
  // Открытие/закрытие окна настройки персонажа
  var userDialogOpen = document.querySelector('.setup-open');
  window.userDialog = document.querySelector('.setup');
  var userDialogClose = document.querySelector('.setup-close');
  var userDialogUserName = document.querySelector('.setup-user-name');

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  userDialogUserName.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      document.removeEventListener('keydown', onPopupEscPress);
    }
  });

  userDialogClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

  // открытие по клавише ENTER
  userDialogOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  // функция открытия
  var openPopup = function () {
    window.userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  // функция закрытия
  var closePopup = function () {
    window.userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // открытие по клику
  userDialogOpen.addEventListener('click', function () {
    openPopup();
  });

  // закрытие по клику
  userDialogClose.addEventListener('click', function () {
    closePopup();
  });

})();
