function setMode(mode) {
  localStorage.setItem('mode', mode);
}

function getSystemMode() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark-mode';
  } else {
      return 'light-mode';
  }
}

function toggleMode(event) {
  event.preventDefault(); // Prevent URL change

  var body = document.body;
  if (body.classList.contains('light-mode')) {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    setMode('dark-mode');

    // Update SVG for dark mode
    var toggleButton = document.getElementById('mode-toggle-button');
    toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" class="toggle-themes"><path class="cls-1" d="M500,0c17.56,36.38,45.12,94.27,77.77,166.67,50.64,112.14,57.86,135.62,88.9,166.67,31.04,31.04,54.52,38.26,166.67,88.9,72.4,32.69,130.29,60.21,166.67,77.77-36.38,17.56-94.27,45.12-166.67,77.77-112.14,50.64-135.62,57.86-166.67,88.9s-38.26,54.52-88.9,166.67c-32.69,72.4-60.21,130.29-77.77,166.67-17.56-36.38-45.12-94.27-77.77-166.67-50.64-112.14-57.86-135.62-88.9-166.67-31.04-31.04-54.52-38.26-166.67-88.9-72.4-32.69-130.29-60.21-166.67-77.77,36.38-17.56,94.27-45.12,166.67-77.77,112.14-50.64,135.62-57.86,166.67-88.9,31.04-31.04,38.26-54.52,88.9-166.67C454.92,94.27,482.44,36.38,500,0h0Z"/></svg>';
    } else {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    setMode('light-mode');

    // Update SVG for light mode
    var toggleButton = document.getElementById('mode-toggle-button');
    toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" class="toggle-themes"><path class="cls-1" d="M709.08,692.93c-222.02,0-402.01-179.99-402.01-402.01,0-114.44,47.82-217.73,124.56-290.92C187.67,34.43,0,244.04,0,497.5c0,277.53,224.98,502.5,502.5,502.5,253.46,0,463.07-187.67,497.5-431.63-73.19,76.74-176.48,124.56-290.92,124.56h0Z"/></path></svg>';
  }

  applyRandomizedColors();
}

var storedMode = localStorage.getItem('mode');
if (storedMode === 'dark-mode') {
  document.body.classList.add('dark-mode');
  var toggleButton = document.getElementById('mode-toggle-button');
  toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" class="toggle-themes"><path class="cls-1" d="M500,0c17.56,36.38,45.12,94.27,77.77,166.67,50.64,112.14,57.86,135.62,88.9,166.67,31.04,31.04,54.52,38.26,166.67,88.9,72.4,32.69,130.29,60.21,166.67,77.77-36.38,17.56-94.27,45.12-166.67,77.77-112.14,50.64-135.62,57.86-166.67,88.9s-38.26,54.52-88.9,166.67c-32.69,72.4-60.21,130.29-77.77,166.67-17.56-36.38-45.12-94.27-77.77-166.67-50.64-112.14-57.86-135.62-88.9-166.67-31.04-31.04-54.52-38.26-166.67-88.9-72.4-32.69-130.29-60.21-166.67-77.77,36.38-17.56,94.27-45.12,166.67-77.77,112.14-50.64,135.62-57.86,166.67-88.9,31.04-31.04,38.26-54.52,88.9-166.67C454.92,94.27,482.44,36.38,500,0h0Z"/></svg>';
  } else if (storedMode === 'light-mode') {
  document.body.classList.add('light-mode');
  var toggleButton = document.getElementById('mode-toggle-button');
  toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" class="toggle-themes"><path class="cls-1" d="M709.08,692.93c-222.02,0-402.01-179.99-402.01-402.01,0-114.44,47.82-217.73,124.56-290.92C187.67,34.43,0,244.04,0,497.5c0,277.53,224.98,502.5,502.5,502.5,253.46,0,463.07-187.67,497.5-431.63-73.19,76.74-176.48,124.56-290.92,124.56h0Z"/></path></svg>';
  } else {
  var systemMode = getSystemMode();
  if (systemMode === 'dark-mode') {
    document.body.classList.add('dark-mode');
    var toggleButton = document.getElementById('mode-toggle-button');
    toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" class="toggle-themes"><path class="cls-1" d="M500,0c17.56,36.38,45.12,94.27,77.77,166.67,50.64,112.14,57.86,135.62,88.9,166.67,31.04,31.04,54.52,38.26,166.67,88.9,72.4,32.69,130.29,60.21,166.67,77.77-36.38,17.56-94.27,45.12-166.67,77.77-112.14,50.64-135.62,57.86-166.67,88.9s-38.26,54.52-88.9,166.67c-32.69,72.4-60.21,130.29-77.77,166.67-17.56-36.38-45.12-94.27-77.77-166.67-50.64-112.14-57.86-135.62-88.9-166.67-31.04-31.04-54.52-38.26-166.67-88.9-72.4-32.69-130.29-60.21-166.67-77.77,36.38-17.56,94.27-45.12,166.67-77.77,112.14-50.64,135.62-57.86,166.67-88.9,31.04-31.04,38.26-54.52,88.9-166.67C454.92,94.27,482.44,36.38,500,0h0Z"/></svg>';
  } else {
    document.body.classList.add('light-mode');
    var toggleButton = document.getElementById('mode-toggle-button');
    toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" class="toggle-themes"><path class="cls-1" d="M709.08,692.93c-222.02,0-402.01-179.99-402.01-402.01,0-114.44,47.82-217.73,124.56-290.92C187.67,34.43,0,244.04,0,497.5c0,277.53,224.98,502.5,502.5,502.5,253.46,0,463.07-187.67,497.5-431.63-73.19,76.74-176.48,124.56-290.92,124.56h0Z"/></path></svg>';
  }
}

var toggleButton = document.getElementById('mode-toggle-button');
toggleButton.addEventListener('click', toggleMode);