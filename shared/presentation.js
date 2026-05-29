/* AI Gekozen - Presentation Engine */

(function () {
  'use strict';

  var CANVAS_W = 1920;
  var CANVAS_H = 1080;

  function init() {
    var stage = document.querySelector('.stage');
    var canvas = document.querySelector('.canvas');
    var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
    var total = slides.length;
    var current = 0;

    if (!stage || !canvas || total === 0) {
      console.warn('Presentation: missing DOM elements');
      return;
    }

    var alreadyActive = slides.findIndex(function (s) { return s.classList.contains('active'); });
    if (alreadyActive >= 0) current = alreadyActive;

    function scaleCanvas() {
      var vw = window.innerWidth;
      var vh = window.innerHeight;
      var scale = Math.min(vw / CANVAS_W, vh / CANVAS_H);
      canvas.style.transform = 'scale(' + scale + ')';
    }

    function buildCounter() {
      var counters = document.querySelectorAll('.footer-counter');
      counters.forEach(function (el, i) {
        el.textContent = String(i + 1).padStart(2, '0') + ' / ' + String(total).padStart(2, '0');
      });

      var indicator = document.querySelector('.slide-indicator');
      if (!indicator) {
        indicator = document.createElement('div');
        indicator.className = 'slide-indicator';
        document.body.appendChild(indicator);
      }
      updateIndicator();
    }

    function updateIndicator() {
      var indicator = document.querySelector('.slide-indicator');
      if (indicator) {
        indicator.innerHTML =
          '<span class="current">' + String(current + 1).padStart(2, '0') + '</span>' +
          ' / ' + String(total).padStart(2, '0');
      }
    }

    function showSlide(idx) {
      if (idx < 0 || idx >= total) return;
      slides[current].classList.remove('active');
      current = idx;
      slides[current].classList.add('active');
      updateIndicator();
      var hash = '#slide-' + (current + 1);
      if (window.location.hash !== hash) {
        history.replaceState(null, '', hash);
      }
    }

    function next() { if (current < total - 1) showSlide(current + 1); }
    function prev() { if (current > 0) showSlide(current - 1); }
    function first() { showSlide(0); }
    function last() { showSlide(total - 1); }

    function toggleFullscreen() {
      if (!document.fullscreenElement) {
        var req = document.documentElement.requestFullscreen ||
                  document.documentElement.webkitRequestFullscreen ||
                  document.documentElement.mozRequestFullScreen;
        if (req) req.call(document.documentElement);
      } else {
        var exit = document.exitFullscreen ||
                   document.webkitExitFullscreen ||
                   document.mozCancelFullScreen;
        if (exit) exit.call(document);
      }
    }

    function onKey(e) {
      var k = e.key;
      if (k === 'ArrowRight' || k === ' ' || k === 'Enter' || k === 'PageDown') {
        e.preventDefault(); next();
      } else if (k === 'ArrowLeft' || k === 'Backspace' || k === 'PageUp') {
        e.preventDefault(); prev();
      } else if (k === 'Home') {
        e.preventDefault(); first();
      } else if (k === 'End') {
        e.preventDefault(); last();
      } else if (k === 'f' || k === 'F') {
        e.preventDefault(); toggleFullscreen();
      }
    }

    function onClick(e) {
      if (e.target.closest('a, button, .prompt-box, input, textarea, select')) return;
      var x = e.clientX;
      var w = window.innerWidth;
      if (x > w * 0.5) next(); else prev();
    }

    function readHash() {
      var m = (window.location.hash || '').match(/slide-(\d+)/);
      if (m) {
        var n = parseInt(m[1], 10) - 1;
        if (n >= 0 && n < total) showSlide(n);
      }
    }

    function setupHintFade() {
      var hint = document.querySelector('.nav-hint');
      if (!hint) return;
      setTimeout(function () { hint.classList.add('faded'); }, 4500);
      var timer;
      var wake = function () {
        hint.classList.remove('faded');
        clearTimeout(timer);
        timer = setTimeout(function () { hint.classList.add('faded'); }, 2500);
      };
      document.addEventListener('mousemove', wake, { passive: true });
      document.addEventListener('keydown', wake, { passive: true });
    }

    scaleCanvas();
    buildCounter();
    slides.forEach(function (s, i) {
      s.classList.toggle('active', i === current);
    });
    readHash();
    setupHintFade();

    window.addEventListener('resize', scaleCanvas, { passive: true });
    window.addEventListener('orientationchange', scaleCanvas, { passive: true });
    window.addEventListener('hashchange', readHash);
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
