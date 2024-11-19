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
    toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="30 20 1000 1000" class="toggle-themes"><path d="M500,0c17.56,36.38,45.12,94.27,77.77,166.67,50.64,112.14,57.86,135.62,88.9,166.67,31.04,31.04,54.52,38.26,166.67,88.9,72.4,32.69,130.29,60.21,166.67,77.77-36.38,17.56-94.27,45.12-166.67,77.77-112.14,50.64-135.62,57.86-166.67,88.9s-38.26,54.52-88.9,166.67c-32.69,72.4-60.21,130.29-77.77,166.67-17.56-36.38-45.12-94.27-77.77-166.67-50.64-112.14-57.86-135.62-88.9-166.67-31.04-31.04-54.52-38.26-166.67-88.9-72.4-32.69-130.29-60.21-166.67-77.77,36.38-17.56,94.27-45.12,166.67-77.77,112.14-50.64,135.62-57.86,166.67-88.9,31.04-31.04,38.26-54.52,88.9-166.67C454.92,94.27,482.44,36.38,500,0h0Z"/></svg>';
    } else {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    setMode('light-mode');

    // Update SVG for light mode
    var toggleButton = document.getElementById('mode-toggle-button');
    toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" class="toggle-themes"><path d="M738.2,623.6c-199.8,0-361.8-162-361.8-361.8c0-103,43-196,112.1-261.8C268.9,31,100,219.6,100,447.8C100,697.5,302.5,900,552.2,900C780.4,900,969,731.1,1000,511.5C934.1,580.6,841.2,623.6,738.2,623.6L738.2,623.6L738.2,623.6z"/></path></svg>';
  }

  applyRandomizedColors();
}

var storedMode = localStorage.getItem('mode');
if (storedMode === 'dark-mode') {
  document.body.classList.add('dark-mode');
  var toggleButton = document.getElementById('mode-toggle-button');
  toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="30 20 1000 1000" class="toggle-themes"><path d="M500,0c17.56,36.38,45.12,94.27,77.77,166.67,50.64,112.14,57.86,135.62,88.9,166.67,31.04,31.04,54.52,38.26,166.67,88.9,72.4,32.69,130.29,60.21,166.67,77.77-36.38,17.56-94.27,45.12-166.67,77.77-112.14,50.64-135.62,57.86-166.67,88.9s-38.26,54.52-88.9,166.67c-32.69,72.4-60.21,130.29-77.77,166.67-17.56-36.38-45.12-94.27-77.77-166.67-50.64-112.14-57.86-135.62-88.9-166.67-31.04-31.04-54.52-38.26-166.67-88.9-72.4-32.69-130.29-60.21-166.67-77.77,36.38-17.56,94.27-45.12,166.67-77.77,112.14-50.64,135.62-57.86,166.67-88.9,31.04-31.04,38.26-54.52,88.9-166.67C454.92,94.27,482.44,36.38,500,0h0Z"/></svg>';
  } else if (storedMode === 'light-mode') {
  document.body.classList.add('light-mode');
  var toggleButton = document.getElementById('mode-toggle-button');
  toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" class="toggle-themes"><path d="M738.2,623.6c-199.8,0-361.8-162-361.8-361.8c0-103,43-196,112.1-261.8C268.9,31,100,219.6,100,447.8C100,697.5,302.5,900,552.2,900C780.4,900,969,731.1,1000,511.5C934.1,580.6,841.2,623.6,738.2,623.6L738.2,623.6L738.2,623.6z"/></path></svg>';
  } else {
  var systemMode = getSystemMode();
  if (systemMode === 'dark-mode') {
    document.body.classList.add('dark-mode');
    var toggleButton = document.getElementById('mode-toggle-button');
    toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="30 20 1000 1000" class="toggle-themes"><path class="cls-1" d="M500,0c17.56,36.38,45.12,94.27,77.77,166.67,50.64,112.14,57.86,135.62,88.9,166.67,31.04,31.04,54.52,38.26,166.67,88.9,72.4,32.69,130.29,60.21,166.67,77.77-36.38,17.56-94.27,45.12-166.67,77.77-112.14,50.64-135.62,57.86-166.67,88.9s-38.26,54.52-88.9,166.67c-32.69,72.4-60.21,130.29-77.77,166.67-17.56-36.38-45.12-94.27-77.77-166.67-50.64-112.14-57.86-135.62-88.9-166.67-31.04-31.04-54.52-38.26-166.67-88.9-72.4-32.69-130.29-60.21-166.67-77.77,36.38-17.56,94.27-45.12,166.67-77.77,112.14-50.64,135.62-57.86,166.67-88.9,31.04-31.04,38.26-54.52,88.9-166.67C454.92,94.27,482.44,36.38,500,0h0Z"/></svg>';
  } else {
    document.body.classList.add('light-mode');
    var toggleButton = document.getElementById('mode-toggle-button');
    toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" class="toggle-themes"><path d="M738.2,623.6c-199.8,0-361.8-162-361.8-361.8c0-103,43-196,112.1-261.8C268.9,31,100,219.6,100,447.8C100,697.5,302.5,900,552.2,900C780.4,900,969,731.1,1000,511.5C934.1,580.6,841.2,623.6,738.2,623.6L738.2,623.6L738.2,623.6z"/></path></svg>';
  }
}

var toggleButton = document.getElementById('mode-toggle-button');
toggleButton.addEventListener('click', toggleMode);