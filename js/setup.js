'use strict';

(function () {
  window.userDialog = document.querySelector('.setup');
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

  window.wizardSettingsColor = document.querySelector('.setup-wizard');
  window.wizardCoat = document.querySelector('.wizard-coat');
  window.wizardEyes = document.querySelector('.wizard-eyes');
  window.wizardFireball = document.querySelector('.setup-fireball-wrap');

  window.wizardEyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  window.wizardCoatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  window.wizardFireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    window.userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: rgba(255, 0, 0, .8);';
    node.style.position = 'absolute';
    node.style.display = 'flex';
    node.style.alignItems = 'center';
    node.style.justifyContent = 'center';
    node.style.height = '30%';
    node.style.width = '50%';
    node.style.transform = 'translate(-50%, -50%)';
    node.style.top = '40%';
    node.style.left = '50%';
    node.style.fontSize = '40px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(successHandler, errorHandler);
  window.upload(successHandler, errorHandler);

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

  var shopElement = document.querySelector('.setup-artifacts-shop');
  var artifactsElement = document.querySelector('.setup-artifacts');
  var draggedItem = null;

  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }

    artifactsElement.style.outline = '2px dashed red';
  });

  document.addEventListener('dragend', function (evt) {
    evt.preventDefault();
    artifactsElement.style.outline = '';
  }
  );

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('dragstart', function () {
    artifactsElement.style.outline = '2px dashed red';
  });

  artifactsElement.addEventListener('drop', function (evt) {
    evt.preventDefault();
    evt.target.style.backgroundColor = '';

    if (evt.target.tagName.toLowerCase() === 'div') {
      evt.target.appendChild(draggedItem);
    }

    artifactsElement.style.outline = '';
  });

  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.preventDefault();
    if (evt.target.tagName.toLowerCase() === 'div') {
      evt.target.style.backgroundColor = 'yellow';
    }
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.preventDefault();
    evt.target.style.backgroundColor = '';
  });

  document.addEventListener('dragend', function (evt) {
    evt.preventDefault();

    artifactsElement.style.backgroundColor = '';
  });

  var form = window.userDialog.querySelector('.setup-wizard-form');

  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), function () {
      window.userDialog.classList.add('hidden');
    });
    evt.preventDefault();
  });

})();
