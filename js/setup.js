'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var WIZARD_SECOND_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_FIRST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var coatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColor = ['black', 'red', 'blue', 'yellow', 'green'];
  var fireballWrapColor = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  // Открытие/закрытие окна настройки персонажа
  var userDialogOpen = document.querySelector('.setup-open');
  var userDialog = document.querySelector('.setup');
  var userDialogClose = userDialog.querySelector('.setup-close');
  var userDialogUserName = userDialog.querySelector('.setup-user-name');

  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

  var wizardSettingsColor = document.querySelector('.setup-wizard');
  var wizardCoat = wizardSettingsColor.querySelector('.wizard-coat');
  var wizardEyes = wizardSettingsColor.querySelector('.wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');

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

  // функция открытия
  var openPopup = function () {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  // функция закрытия
  var closePopup = function () {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // открытие по клику
  userDialogOpen.addEventListener('click', function () {
    openPopup();
  });

  // открытие по клавише ENTER
  userDialogOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  // закрытие по клику
  userDialogClose.addEventListener('click', function () {
    closePopup();
  });

  userDialogClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });


  // функция подбора рандомных элемента массива
  var randomArrItem = function (arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
  };

  var getWizards = function () {
    var wizards = [];

    for (var i = 0; i < 4; i++) {
      wizards[i] =
        {
          name: randomArrItem(WIZARD_SECOND_NAMES) + ' ' + randomArrItem(WIZARD_FIRST_NAMES),
          coatColor: randomArrItem(coatColor),
          eyesColor: randomArrItem(eyesColor)
        };
    }
    return wizards;
  };

  var wizards = getWizards();

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);

  userDialog.querySelector('.setup-similar').classList.remove('hidden');

  // смена цветов волшебника
  // смена цвета мантии
  wizardCoat.addEventListener('click', function () {
    wizardCoat.style.fill = randomArrItem(coatColor);
  });

  // смена цвета глаз
  wizardEyes.addEventListener('click', function () {
    wizardEyes.style.fill = randomArrItem(eyesColor);
  });

  // смена цвета фаербола
  wizardFireball.addEventListener('click', function () {
    wizardFireball.style.backgroundColor = randomArrItem(fireballWrapColor);
  });

})();
