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


var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function(arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function(ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font='16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 3);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 5);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var columnHeight = (BAR_HEIGHT * times[i].toFixed(0)) / maxTime;

    if (names[i] === 'Вы') {
      var color = 'rgba(255, 0, 0, 1)';
    } else if (names[i] === 'Кекс') {
      color = 'blue';
    } else {
      color = 'grey';
    }

    ctx.fillText(times[i].toFixed(0), COLUMN_BLOCK_X + (BAR_GAP + BAR_WIDTH) * i, COLUMN_BLOCK_Y - (columnHeight + GAP * 3));
    ctx.fillStyle = color;
    ctx.fillRect(COLUMN_BLOCK_X + (BAR_GAP + BAR_WIDTH) * i, COLUMN_BLOCK_Y - (columnHeight + GAP * 2), BAR_WIDTH, columnHeight);
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], COLUMN_BLOCK_X + (BAR_GAP + BAR_WIDTH) * i, COLUMN_BLOCK_Y);
    console.log(times[i]);
  }

}
