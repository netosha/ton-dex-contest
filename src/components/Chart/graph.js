/* eslint-disable */

import styles from './style.module.scss'
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function TChart(container) {

  // Todo: Make it as func file
  function formatDate(time, short) {
    var date = new Date(time);
    var s = MONTH_NAMES[date.getMonth()] + ' ' + date.getDate();
    if (short) return s;
    return DAY_NAMES[date.getDay()] + ', ' + s;
  }

  // Todo: Make it as func file
  function formatNumber(n, short) {
    var abs = Math.abs(n);
    if (abs > 1000000000 && short) return (n / 1000000000).toFixed(2) + 'B';
    if (abs > 1000000 && short) return (n / 1000000).toFixed(2) + 'M';
    if (abs > 1000 && short) return (n / 1000).toFixed(1) + 'K';

    if (abs > 1) {
      var s = abs.toFixed(0);
      var formatted = n < 0 ? '-' : '';
      for (var i = 0; i < s.length; i++) {
        formatted += s.charAt(i);
        if ((s.length - 1 - i) % 3 === 0) formatted += ' ';
      }
      return formatted;
    }

    return n.toString()
  }


  /**
   *
   * @param {HTMLDivElement} parent
   * @param {K in keyof HTMLElementTagNameMap} tag
   * @param {string} className
   * @returns {HTMLDivElement}
   */
  function createElement(parent, tag, className) {
    var element = document.createElement(tag);
    if (className) element.classList.add(className);
    parent.appendChild(element);
    return element;
  }

  function removeAllChild(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  function addEventListener(element, event, listener) {
    element.addEventListener(event, listener, false);
  }

  function removeEventListener(element, event, listener) {
    element.removeEventListener(event, listener);
  }

  function createAnimation(value, duration) {
    return {
      fromValue: value,
      toValue: value,
      value: value,
      startTime: 0,
      duration: duration,
      delay: 0
    }
  }

  function play(anim, toValue) {
    anim.startTime = time;
    anim.toValue = toValue;
    anim.fromValue = anim.value;
  }

  function updateAnimation(anim) {
    if (anim.value === anim.toValue) return false;
    var progress = ((time - anim.startTime) - anim.delay) / anim.duration;
    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;
    var ease = -progress * (progress - 2);
    anim.value = anim.fromValue + (anim.toValue - anim.fromValue) * ease;
    return true;
  }

  const canvas = createElement(container, 'canvas');

  var context = canvas.getContext('2d');
  var checksContainer = createElement(container, 'div', styles.checks);
  var popup = createElement(container, 'div', styles.popup);
  popup.style.display = 'none';
  var popupTitle = null;

  var colors = null;
  var data = null;
  var xColumn = null;
  var columns = null;
  var popupColumns = null;
  var popupValues = null;

  var width = 0;
  var height = 0;
  var mainHeight = 0;

  var textCountX = 6;
  var textCountY = 6;

  var SCALE_DURATION = 400;
  var TEXT_X_FADE_DURATION = 200;

  var pixelRatio = window.devicePixelRatio;
  var previewMarginTop = 32 * pixelRatio;
  var previewHeight = 38 * pixelRatio;
  var mouseArea = 20 * pixelRatio;
  var previewUiW = 4 * pixelRatio;
  var previewUiH = 1 * pixelRatio;
  var lineWidth = 1 * pixelRatio;
  var previewLineWidth = 1 * pixelRatio;
  var mainLineWidth = 2 * pixelRatio;
  var circleRadius = 3 * pixelRatio;
  var circleLineWidth = 4 * pixelRatio;
  var font = (10 * pixelRatio) + 'px Arial';
  var textYMargin = -6 * pixelRatio;
  var textXMargin = 16 * pixelRatio;
  var textXWidth = 30 * pixelRatio;
  var textYHeight = 45 * pixelRatio;
  var mainPaddingTop = 21 * pixelRatio;
  var paddingHor = 11 * pixelRatio;
  var popupLeftMargin = -25;
  var popupTopMargin = !('ontouchstart' in window) ? 8 : 40;

  var intervalX = 0;
  var forceMinY = 0;

  var mainMinX = 0;
  var mainMinY = 0;
  var mainMaxX = 0;
  var mainMaxY = 0;
  var mainRangeX = 0;
  var mainRangeY = createAnimation(0, SCALE_DURATION);
  var mainScaleX = 1;
  var mainScaleY = 1;
  var mainOffsetX = 0;
  var mainOffsetY = 0;

  var mainMinI = 0;
  var mainMaxI = 0;

  var previewMinX = 0;
  var previewMinY = 0;
  var previewMaxX = 0;
  var previewMaxY = 0;
  var previewRangeX = 0;
  var previewRangeY = createAnimation(0, SCALE_DURATION);
  var previewScaleX = 1;
  var previewScaleY = 1;
  var previewOffsetX = 0;
  var previewOffsetY = 0;

  var selectX = 0;
  var selectY = 0;
  var selectI = 0;

  var oldTextX = {delta: 1, alpha: createAnimation(0, TEXT_X_FADE_DURATION)};
  var newTextX = {delta: 1, alpha: createAnimation(0, TEXT_X_FADE_DURATION)};
  var oldTextY = {delta: 1, alpha: createAnimation(0, SCALE_DURATION)};
  var newTextY = {delta: 1, alpha: createAnimation(0, SCALE_DURATION)};

  var needRedrawMain = true;
  var needRedrawPreview = true;

  var canvasBounds = {left: 0, top: 0};

  var mouseX = 0;
  var mouseY = 0;
  var newMouseX = 0;
  var newMouseY = 0;
  var mouseStartX = 0;
  var mouseRange = 0;
  var previewUiMin = 0;
  var previewUiMax = 0;

  var time = 0;

  var NONE = 0;
  var DRAG_START = 1;
  var DRAG_END = 2;
  var DRAG_ALL = 3;

  var mouseMode = NONE;

  function onMouseDown(e) {
    newMouseX = mouseX = (e.clientX - canvasBounds.left) * pixelRatio;
    newMouseY = mouseY = (e.clientY - canvasBounds.top) * pixelRatio;

    var inPreview = (mouseY > height - previewHeight) && (mouseY < height) && (mouseX > -mouseArea) && (mouseX < width + mouseArea);
    if (inPreview) {
      if (mouseX > previewUiMin - mouseArea && mouseX < previewUiMin + mouseArea / 2) {
        mouseMode = DRAG_START;
      } else if (mouseX > previewUiMax - mouseArea / 2 && mouseX < previewUiMax + mouseArea) {
        mouseMode = DRAG_END;
      } else if (mouseX > previewUiMin + mouseArea / 2 && mouseX < previewUiMax - mouseArea / 2) {
        mouseMode = DRAG_ALL;

        mouseStartX = previewUiMin - mouseX;
        mouseRange = mainMaxX - mainMinX;
      }
    }
  }

  function onTouchDown(e) {
    onMouseDown(e.touches[0])
  }

  function onMouseMove(e) {
    newMouseX = (e.clientX - canvasBounds.left) * pixelRatio;
    newMouseY = (e.clientY - canvasBounds.top) * pixelRatio;
  }

  function onTouchMove(e) {
    onMouseMove(e.touches[0])
  }

  function onMouseUp(e) {
    mouseMode = NONE;
  }

  addEventListener(document, 'mousedown', onMouseDown);
  addEventListener(document, 'touchstart', onTouchDown);
  addEventListener(document, 'mousemove', onMouseMove);
  addEventListener(document, 'touchmove', onTouchMove);
  addEventListener(document, 'mouseup', onMouseUp);
  addEventListener(document, 'touchend', onMouseUp);
  addEventListener(document, 'touchcancel', onMouseUp);

  var destroyed = false;
  this.destroy = function () {
    destroyed = true;
    removeAllChild(container);
    removeEventListener(document, 'mousedown', onMouseDown);
    removeEventListener(document, 'touchstart', onTouchDown);
    removeEventListener(document, 'mousemove', onMouseMove);
    removeEventListener(document, 'touchmove', onTouchMove);
    removeEventListener(document, 'mouseup', onMouseUp);
    removeEventListener(document, 'touchend', onMouseUp);
    removeEventListener(document, 'touchcancel', onMouseUp);
  };

  requestAnimationFrame(render);

  function screenToMainX(screenX) {
    return (screenX - mainOffsetX) / mainScaleX;
  }

  function mainToScreenX(x) {
    return x * mainScaleX + mainOffsetX;
  }

  function mainToScreenY(y) {
    return y * mainScaleY + mainOffsetY;
  }

  function screenToPreviewX(screenX) {
    return (screenX - previewOffsetX) / previewScaleX;
  }

  function previewToScreenX(x) {
    return x * previewScaleX + previewOffsetX;
  }

  this.setColors = function (newColors) {
    colors = newColors;
    needRedrawMain = needRedrawPreview = true;
  };

  this.setData = function (newData) {
    function findNameOfX(types) {
      for (var name in types) {
        if (types[name] === 'x') return name;
      }
      return null;
    }

    popupColumns = [];
    popupValues = [];
    columns = [];

    removeAllChild(checksContainer);
    removeAllChild(popup);
    popupTitle = createElement(popup, 'div', styles.title);

    if (newData.columns.length < 2 || newData.columns[0].length < 3) {
      data = null;
      return;
    }

    data = newData;
    var nameOfX = findNameOfX(data.types);

    for (var c = 0; c < data.columns.length; c++) {
      var columnData = data.columns[c];
      var name = columnData[0];
      var column = {
        name: name,
        data: columnData,
        min: forceMinY !== undefined ? forceMinY : columnData[1],
        max: columnData[1],
        alpha: createAnimation(1, SCALE_DURATION),
        previewAlpha: createAnimation(1, SCALE_DURATION / 2)
      };
      if (name === nameOfX) {
        column.min = columnData[1];
        column.max = columnData[columnData.length - 1];
        xColumn = column
      } else {
        for (var i = 2; i < columnData.length; i++) {
          var value = columnData[i];
          if (value < column.min) column.min = value;
          else if (value > column.max) column.max = value;
        }
        columns.push(column);

        // create checkbox

        if (data.columns.length > 2) {
          var label = createElement(checksContainer, 'label', styles.checkbox);
          label.innerText = data.names[name];

          var input = createElement(label, 'input');
          input.setAttribute('data-id', columns.length - 1);
          input.checked = true;
          input.type = 'checkbox';
          addEventListener(input, 'change', function (e) {
            var id = e.currentTarget.getAttribute('data-id');
            var checked = e.currentTarget.checked;
            var checkedColumn = columns[id];
            checkedColumn.saveScaleY = previewScaleY;
            checkedColumn.saveOffsetY = previewOffsetY;

            play(checkedColumn.alpha, checked ? 1 : 0);

            checkedColumn.previewAlpha.delay = checked ? SCALE_DURATION / 2 : 0;
            play(checkedColumn.previewAlpha, checked ? 1 : 0);

            needRedrawMain = needRedrawPreview = true;
            updatePreviewRangeY();
            updateMainRangeY();
          });

          var span = createElement(label, 'span', styles.circle);
          span.style.borderColor = data.colors[name];

          span = createElement(label, 'span', styles.symbol);
        }

        // create popup column

        var popupColumn = createElement(popup, 'div', styles.column);
        popupColumn.style.color = data.colors[name];
        popupColumns.push(popupColumn);

        var popupValue = createElement(popupColumn, 'div', styles.value);
        popupValues.push(popupValue);

        var popupLabel = createElement(popupColumn, 'div', styles.label);
        popupLabel.innerText = data.names[name];
      }
    }

    intervalX = xColumn.data[2] - xColumn.data[1];
    previewMinX = xColumn.min;
    previewMaxX = xColumn.max;
    previewRangeX = previewMaxX - previewMinX;

    onResize();
    previewRangeY.value = previewRangeY.toValue;

    setMainMinMax(previewMaxX - previewRangeX / 4, previewMaxX);
    mainRangeY.value = mainRangeY.toValue;
    updateMainRangeY();
    needRedrawMain = needRedrawPreview = true;
  };

  function updateMainRangeX() {
    mainRangeX = mainMaxX - mainMinX;
    mainScaleX = (width - paddingHor * 2) / mainRangeX;
    mainOffsetX = -mainMinX * mainScaleX + paddingHor;

    var delta = mainRangeX / intervalX / textCountX;

    var pow = 1;
    while (pow <= delta) pow *= 2;
    delta = pow;

    if (delta < newTextX.delta) { // add dates
      oldTextX.delta = newTextX.delta;
      oldTextX.alpha.value = 1;
      play(oldTextX.alpha, 1);

      newTextX.delta = delta;
      newTextX.alpha.value = 0;
      play(newTextX.alpha, 1);
    } else if (delta > newTextX.delta) {  // remove dates
      oldTextX.delta = newTextX.delta;
      oldTextX.alpha.value = newTextX.alpha.value;
      play(oldTextX.alpha, 0);

      newTextX.delta = delta;
      newTextX.alpha.value = 1;
      play(newTextX.alpha, 1);
    }
  }

  function updateMainRangeY() {
    mainMinY = forceMinY !== undefined ? forceMinY : Number.MAX_VALUE;
    mainMaxY = Number.MIN_VALUE;

    for (var c = 0; c < columns.length; c++) {
      var column = columns[c];
      if (column.alpha.toValue === 0) continue;
      for (var i = mainMinI; i < mainMaxI; i++) {
        var y = column.data[i];
        if (y < mainMinY) mainMinY = y;
        if (y > mainMaxY) mainMaxY = y;
      }
    }

    if (mainMaxY === Number.MIN_VALUE) mainMaxY = 1;

    var range = mainMaxY - mainMinY;
    if (mainRangeY.toValue !== range) {
      play(mainRangeY, range);

      oldTextY.delta = newTextY.delta;
      oldTextY.alpha.value = newTextY.alpha.value;
      play(oldTextY.alpha, 0);

      newTextY.delta = Math.floor(mainRangeY.toValue / textCountY);
      newTextY.alpha.value = 1 - oldTextY.alpha.value;
      play(newTextY.alpha, 1);
    }
  }

  function updatePreviewRangeX() {
    previewScaleX = (width - paddingHor * 2) / previewRangeX;
    previewOffsetX = -previewMinX * previewScaleX + paddingHor;
  }

  function updatePreviewRangeY() {
    previewMinY = forceMinY !== undefined ? forceMinY : Number.MAX_VALUE;
    previewMaxY = Number.MIN_VALUE;

    for (var c = 0; c < columns.length; c++) {
      var column = columns[c];
      if (column.alpha.toValue === 0) continue;
      if (column.min < previewMinY) previewMinY = column.min;
      if (column.max > previewMaxY) previewMaxY = column.max;
    }

    if (previewMaxY === Number.MIN_VALUE) previewMaxY = 1;

    play(previewRangeY, previewMaxY - previewMinY);
  }

  function setMainMinMax(min, max) {
    var changed = false;

    if (min !== null && mainMinX !== min) {
      mainMinX = min;
      mainMinI = Math.floor((mainMinX - previewMinX - paddingHor / mainScaleX) / intervalX) + 1;
      if (mainMinI < 1) mainMinI = 1;
      changed = true;
    }

    if (max !== null && mainMaxX !== max) {
      mainMaxX = max;
      mainMaxI = Math.ceil((mainMaxX - previewMinX + paddingHor / mainScaleX) / intervalX) + 2;
      if (mainMaxI > xColumn.data.length) mainMaxI = xColumn.data.length;
      changed = true;
    }

    if (changed) {
      updateMainRangeX();
      updateMainRangeY();
      needRedrawPreview = needRedrawMain = true;
    }
  }

  function select(mouseX, mouseY) {
    if (selectX !== mouseX) {
      selectX = mouseX;
      needRedrawMain = true;

      if (selectX === null) {
        selectI = -1;
        popup.style.display = 'none';
      } else {
        popup.style.display = 'block';

        var newSelectI = Math.round((mouseX - previewMinX) / intervalX) + 1;
        if (newSelectI < 1) newSelectI = 1;
        if (newSelectI > xColumn.data.length - 1) newSelectI = xColumn.data.length - 1;

        if (selectI !== newSelectI) {
          selectI = newSelectI;
          var x = xColumn.data[selectI];
          popupTitle.innerText = formatDate(x, false);

          for (var c = 0; c < columns.length; c++) {
            var yColumn = columns[c];
            var y = yColumn.data[selectI];
            popupColumns[c].style.display = yColumn.alpha.toValue === 0 ? 'none' : 'block';
            popupValues[c].innerText = formatNumber(y, false);
          }
        }

        var popupBounds = popup.getBoundingClientRect();
        var popupX = (mainToScreenX(mouseX) / pixelRatio) + popupLeftMargin;
        if (popupX < 0) popupX = 0;
        if (popupX + popupBounds.width > canvasBounds.width) popupX = canvasBounds.width - popupBounds.width;
        popup.style.left = popupX + 'px';
      }
    }

    if (selectY !== mouseY) {
      selectY = mouseY;
      if (!popupBounds) popupBounds = popup.getBoundingClientRect();
      var popupY = mouseY / pixelRatio + 39 - popupBounds.height - popupTopMargin;
      if (popupY < 0) popupY = mouseY / pixelRatio + 39 + popupTopMargin;
      popup.style.top = popupY + 'px';
    }
  }

  function onResize() {
    canvasBounds = canvas.getBoundingClientRect();
    var newWidth = canvasBounds.width * pixelRatio;
    var newHeight = canvasBounds.height * pixelRatio;

    if (width !== newWidth || height !== newHeight) {
      width = newWidth;
      height = newHeight;
      mainHeight = height - previewHeight - previewMarginTop;
      textCountX = Math.max(1, Math.floor(width / (textXWidth * 2)));
      textCountY = Math.max(1, Math.floor(mainHeight / textYHeight));

      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      updateMainRangeX();
      updateMainRangeY();
      updatePreviewRangeX();
      updatePreviewRangeY();

      needRedrawMain = needRedrawPreview = true;
    }
  }

  function render(t) {
    if (destroyed) return;
    time = t;

    if (data !== null) {

      // resize

      onResize();

      if (width > 0 && height > 0) {
        // mouse

        if (mouseMode > 0) {
          mouseX += (newMouseX - mouseX) * 0.5;
          mouseY += (newMouseY - mouseY) * 0.5;
        } else {
          mouseX = newMouseX;
          mouseY = newMouseY;
        }

        if (mouseMode === DRAG_START) {
          var x = mouseX;
          if (x > previewUiMax - mouseArea * 2) x = previewUiMax - mouseArea * 2;
          var newMinX = screenToPreviewX(x);
          if (newMinX < previewMinX) newMinX = previewMinX;
          setMainMinMax(newMinX, null);
        } else if (mouseMode === DRAG_END) {
          var x = mouseX;
          if (x < previewUiMin + mouseArea * 2) x = previewUiMin + mouseArea * 2;
          var newMaxX = screenToPreviewX(x);
          if (newMaxX > previewMaxX) newMaxX = previewMaxX;
          setMainMinMax(null, newMaxX);
        } else if (mouseMode === DRAG_ALL) {
          var startX = mouseX + mouseStartX;
          var newMinX = screenToPreviewX(startX);
          if (newMinX < previewMinX) newMinX = previewMinX;
          if (newMinX > previewMaxX - mouseRange) newMinX = previewMaxX - mouseRange;
          setMainMinMax(newMinX, newMinX + mouseRange);
        }

        var inMain = (mouseY > 0) && (mouseY < height - previewHeight) && (mouseX > 0) && (mouseX < width);
        if (inMain) {
          select(screenToMainX(Math.floor(mouseX)), Math.floor(mouseY));
        } else {
          select(null, null);
        }

        // animation

        if (updateAnimation(oldTextX.alpha)) needRedrawMain = true;
        if (updateAnimation(newTextX.alpha)) needRedrawMain = true;
        if (updateAnimation(oldTextY.alpha)) needRedrawMain = true;
        if (updateAnimation(newTextY.alpha)) needRedrawMain = true;
        if (updateAnimation(mainRangeY)) needRedrawMain = true;
        if (updateAnimation(previewRangeY)) needRedrawPreview = true;

        for (var c = 0; c < columns.length; c++) {
          var yColumn = columns[c];
          if (updateAnimation(yColumn.alpha)) needRedrawMain = true;
          if (updateAnimation(yColumn.previewAlpha)) needRedrawPreview = true;
        }

        // render

        if (needRedrawPreview) {
          needRedrawPreview = false;
          renderPreview();
        }
        if (needRedrawMain) {
          needRedrawMain = false;
          renderMain();
        }

      }
    }

    requestAnimationFrame(render);
  }

  function renderTextsX(textX, skipStep) {
    if (textX.alpha.value > 0) {
      context.globalAlpha = textX.alpha.value;

      var delta = textX.delta;
      if (skipStep) delta *= 2;

      var endI = Math.min(Math.ceil(mainMaxX / intervalX / delta) * delta, xColumn.data.length);
      if (skipStep) endI -= textX.delta;
      var startI = Math.max(mainMinI - 1, 1);

      for (var i = endI - 1; i >= startI; i -= delta) {
        var value = xColumn.data[i];
        var x = mainToScreenX(value);
        var offsetX = 0;
        if (i === xColumn.data.length - 1) {
          offsetX = -textXWidth;
        } else if (i > 1) {
          offsetX = -(textXWidth / 2);
        }
        context.fillText(formatDate(value, true), x + offsetX, mainHeight + textXMargin);
      }
    }
  }

  function renderTextsY(textY) {
    if (textY.alpha.value > 0) {
      context.globalAlpha = textY.alpha.value;

      for (var i = 1; i < textCountY; i++) {
        var value = mainMinY + textY.delta * i;
        var y = mainToScreenY(value);
        context.fillText(formatNumber(value, true), paddingHor, y + textYMargin);
      }
    }
  }

  function renderLinesY(textY) {
    if (textY.alpha.value > 0) {
      context.globalAlpha = textY.alpha.value;

      for (var i = 1; i < textCountY; i++) {
        var value = mainMinY + textY.delta * i;
        var y = mainToScreenY(value);
        context.beginPath();
        context.moveTo(paddingHor, y);
        context.lineTo(width - paddingHor, y);
        context.stroke();
      }
    }
  }

  function renderPreview() {
    context.clearRect(0, height - previewHeight - 1, width, previewHeight + 1);

    // paths

    previewScaleY = -previewHeight / previewRangeY.value;
    previewOffsetY = height - previewMinY * previewScaleY;

    for (var c = 0; c < columns.length; c++) {
      var yColumn = columns[c];

      if (yColumn.previewAlpha.value === 0) continue;

      var columnScaleY = previewScaleY;
      var columnOffsetY = previewOffsetY;

      if (yColumn.alpha.toValue === 0) {
        columnScaleY = yColumn.saveScaleY;
        columnOffsetY = yColumn.saveOffsetY;
      } else {
        var columnRangeY = yColumn.max - yColumn.min;
        if (columnRangeY > previewRangeY.value) {
          columnScaleY = -previewHeight / columnRangeY;
          columnOffsetY = height - previewMinY * columnScaleY;
        }
      }

      context.globalAlpha = yColumn.previewAlpha.value;
      context.lineWidth = previewLineWidth;
      renderPath(yColumn, 1, yColumn.data.length, previewScaleX, columnScaleY, previewOffsetX, columnOffsetY)
    }

    // draw preview ui

    previewUiMin = previewToScreenX(mainMinX);
    previewUiMax = previewToScreenX(mainMaxX);

    context.globalAlpha = colors.previewAlpha;
    context.beginPath();
    context.rect(paddingHor, height - previewHeight, previewUiMin - paddingHor, previewHeight);
    context.rect(previewUiMax, height - previewHeight, width - previewUiMax - paddingHor, previewHeight);
    context.fillStyle = colors.preview;
    context.fill();

    context.globalAlpha = colors.previewBorderAlpha;
    context.beginPath();
    context.rect(previewUiMin, height - previewHeight, previewUiW, previewHeight);
    context.rect(previewUiMax - previewUiW, height - previewHeight, previewUiW, previewHeight);
    context.rect(previewUiMin, height - previewHeight, previewUiMax - previewUiMin, previewUiH);
    context.rect(previewUiMin, height - previewUiH, previewUiMax - previewUiMin, previewUiH);
    context.fillStyle = colors.previewBorder;
    context.fill();
  }

  function renderMain() {
    context.clearRect(0, 0, width, mainHeight + previewMarginTop);

    mainScaleY = -(mainHeight - mainPaddingTop) / mainRangeY.value;
    mainOffsetY = mainHeight - mainMinY * mainScaleY;

    // lines

    context.strokeStyle = colors.line;
    context.lineWidth = lineWidth;

    renderLinesY(oldTextY);
    renderLinesY(newTextY);

    context.globalAlpha = 1;
    context.strokeStyle = colors.zeroLine;
    context.beginPath();
    context.moveTo(paddingHor, mainHeight);
    context.lineTo(width - paddingHor, mainHeight);
    context.stroke();

    // paths

    for (var c = 0; c < columns.length; c++) {
      var yColumn = columns[c];

      if (yColumn.alpha.value === 0) continue;

      context.globalAlpha = yColumn.alpha.value;
      context.lineWidth = mainLineWidth;

      renderPath(yColumn, mainMinI, mainMaxI, mainScaleX, mainScaleY, mainOffsetX, mainOffsetY);
    }

    // select

    if (selectX) {
      context.globalAlpha = 1;
      context.strokeStyle = colors.selectLine;
      context.lineWidth = lineWidth;
      context.beginPath();
      var x = mainToScreenX(selectX);
      context.moveTo(x, 0);
      context.lineTo(x, mainHeight);
      context.stroke();

      var x = xColumn.data[selectI];
      for (var c = 0; c < columns.length; c++) {
        var yColumn = columns[c];
        if (yColumn.alpha.toValue === 0) continue;
        var y = yColumn.data[selectI];
        context.strokeStyle = data.colors[yColumn.name];
        context.fillStyle = colors.circleFill;
        context.lineWidth = circleLineWidth;
        context.beginPath();
        context.arc(x * mainScaleX + mainOffsetX, y * mainScaleY + mainOffsetY, circleRadius, 0, Math.PI * 2);
        context.stroke();
        context.fill();
      }
    }

    // text

    context.fillStyle = colors.text;
    context.font = font;
    var skipStepNew = oldTextX.delta > newTextX.delta;
    renderTextsX(oldTextX, !skipStepNew);
    renderTextsX(newTextX, skipStepNew);

    renderTextsY(oldTextY);
    renderTextsY(newTextY);

    context.globalAlpha = 1;
    context.fillText(formatNumber(mainMinY), paddingHor, mainHeight + textYMargin);
  }

  function renderPath(yColumn, minI, maxI, scaleX, scaleY, offsetX, offsetY) {
    context.strokeStyle = data.colors[yColumn.name];

    context.beginPath();
    context.lineJoin = 'bevel';
    context.lineCap = 'butt';

    var firstX = xColumn.data[minI];
    var firstY = yColumn.data[minI];
    context.moveTo(firstX * scaleX + offsetX, firstY * scaleY + offsetY);

    var step = Math.floor((maxI - minI) / (width - paddingHor * 2));
    if (step < 1) step = 1;

    for (var i = minI + 1; i < maxI; i += step) {
      var x = xColumn.data[i];
      var y = yColumn.data[i];
      context.lineTo(x * scaleX + offsetX, y * scaleY + offsetY);
    }
    context.stroke();
  }
}
