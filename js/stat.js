'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_GAP = 50;
var COLUMN_BLOCK_X = CLOUD_X + GAP * 4;
var COLUMN_BLOCK_Y = CLOUD_Y + GAP * 11 + BAR_HEIGHT;
var USER_DEFAULT_COLOR = 'rgba(255, 0, 0, 1)';

// функция отрисовки облака
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// функция нахождения максимального значения
var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

// функция отрисовки строки приветствия
var writeText = function (ctx, text, x, y) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText(text, x, y);
};

window.renderStatistics = function (ctx, names, times) {

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  writeText(ctx, 'Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 3);
  writeText(ctx, 'Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 5);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var columnHeight = (BAR_HEIGHT * times[i].toFixed(0)) / maxTime;

    // функция получения цвета с рандомной прозрачностью
    var getBarColor = function () {
      if (names[i] === 'Вы') {
        var color = USER_DEFAULT_COLOR;
      } else {
        color = 'rgba(0, 0, 255, ' + Math.random().toFixed(2) + ')';
      }
      return color;
    };

    // функция отрисовки гистограммы
    var renderColumn = function (x, height) {
      ctx.fillStyle = getBarColor();
      ctx.fillRect(x, COLUMN_BLOCK_Y - (columnHeight + GAP * 2), BAR_WIDTH, height);
    };

    writeText(ctx, times[i].toFixed(0), COLUMN_BLOCK_X + (BAR_GAP + BAR_WIDTH) * i, COLUMN_BLOCK_Y - (columnHeight + GAP * 3));
    renderColumn(COLUMN_BLOCK_X + (BAR_GAP + BAR_WIDTH) * i, columnHeight);
    writeText(ctx, names[i], COLUMN_BLOCK_X + (BAR_GAP + BAR_WIDTH) * i, COLUMN_BLOCK_Y);
  }
};
