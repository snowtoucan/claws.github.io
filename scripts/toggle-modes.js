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
    toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="30 0 397.78 393.36" class="toggle-themes"><path d="m198,68.4c4.48,9.28,11.51,24.05,19.84,42.52,12.92,28.61,14.76,34.6,22.68,42.52s13.91,9.76,42.52,22.68c18.47,8.34,33.24,15.36,42.52,19.84-9.28,4.48-24.05,11.51-42.52,19.84-28.61,12.92-34.6,14.76-42.52,22.68s-9.76,13.91-22.68,42.52c-8.34,18.47-15.36,33.24-19.84,42.52-4.48-9.28-11.51-24.05-19.84-42.52-12.92-28.61-14.76-34.6-22.68-42.52s-13.91-9.76-42.52-22.68c-18.47-8.34-33.24-15.36-42.52-19.84,9.28-4.48,24.05-11.51,42.52-19.84,28.61-12.92,34.6-14.76,42.52-22.68s9.76-13.91,22.68-42.52c8.34-18.47,15.36-33.24,19.84-42.52h0Z"></path></svg>';
    var toggleButton = document.getElementById('mode-toggle-button-mob');
    toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="30 0 397.78 393.36" class="toggle-themes"><path d="m198,68.4c4.48,9.28,11.51,24.05,19.84,42.52,12.92,28.61,14.76,34.6,22.68,42.52s13.91,9.76,42.52,22.68c18.47,8.34,33.24,15.36,42.52,19.84-9.28,4.48-24.05,11.51-42.52,19.84-28.61,12.92-34.6,14.76-42.52,22.68s-9.76,13.91-22.68,42.52c-8.34,18.47-15.36,33.24-19.84,42.52-4.48-9.28-11.51-24.05-19.84-42.52-12.92-28.61-14.76-34.6-22.68-42.52s-13.91-9.76-42.52-22.68c-18.47-8.34-33.24-15.36-42.52-19.84,9.28-4.48,24.05-11.51,42.52-19.84,28.61-12.92,34.6-14.76,42.52-22.68s9.76-13.91,22.68-42.52c8.34-18.47,15.36-33.24,19.84-42.52h0Z"></path></svg>';
  } else {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    setMode('light-mode');

    // Update SVG for light mode
    var toggleButton = document.getElementById('mode-toggle-button');
    toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 397.78 393.36" class="toggle-themes"><path d="m252.78,244.58c-56.36,0-102.05-45.69-102.05-102.05,0-29.05,12.14-55.27,31.62-73.85-61.93,8.74-109.57,61.95-109.57,126.29,0,70.45,57.11,127.56,127.56,127.56,64.34,0,117.55-47.64,126.29-109.57-18.58,19.48-44.8,31.62-73.85,31.62Z"></path></svg>';
    var toggleButton = document.getElementById('mode-toggle-button-mob');
    toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 397.78 393.36" class="toggle-themes"><path d="m252.78,244.58c-56.36,0-102.05-45.69-102.05-102.05,0-29.05,12.14-55.27,31.62-73.85-61.93,8.74-109.57,61.95-109.57,126.29,0,70.45,57.11,127.56,127.56,127.56,64.34,0,117.55-47.64,126.29-109.57-18.58,19.48-44.8,31.62-73.85,31.62Z"></path></svg>';
  }
}

var storedMode = localStorage.getItem('mode');
if (storedMode === 'dark-mode') {
  document.body.classList.add('dark-mode');
  var toggleButton = document.getElementById('mode-toggle-button');
  toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="30 0 397.78 393.36" class="toggle-themes"><path d="m198,68.4c4.48,9.28,11.51,24.05,19.84,42.52,12.92,28.61,14.76,34.6,22.68,42.52s13.91,9.76,42.52,22.68c18.47,8.34,33.24,15.36,42.52,19.84-9.28,4.48-24.05,11.51-42.52,19.84-28.61,12.92-34.6,14.76-42.52,22.68s-9.76,13.91-22.68,42.52c-8.34,18.47-15.36,33.24-19.84,42.52-4.48-9.28-11.51-24.05-19.84-42.52-12.92-28.61-14.76-34.6-22.68-42.52s-13.91-9.76-42.52-22.68c-18.47-8.34-33.24-15.36-42.52-19.84,9.28-4.48,24.05-11.51,42.52-19.84,28.61-12.92,34.6-14.76,42.52-22.68s9.76-13.91,22.68-42.52c8.34-18.47,15.36-33.24,19.84-42.52h0Z"></path></svg>';
  var toggleButton = document.getElementById('mode-toggle-button-mob');
  toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="30 0 397.78 393.36" class="toggle-themes"><path d="m198,68.4c4.48,9.28,11.51,24.05,19.84,42.52,12.92,28.61,14.76,34.6,22.68,42.52s13.91,9.76,42.52,22.68c18.47,8.34,33.24,15.36,42.52,19.84-9.28,4.48-24.05,11.51-42.52,19.84-28.61,12.92-34.6,14.76-42.52,22.68s-9.76,13.91-22.68,42.52c-8.34,18.47-15.36,33.24-19.84,42.52-4.48-9.28-11.51-24.05-19.84-42.52-12.92-28.61-14.76-34.6-22.68-42.52s-13.91-9.76-42.52-22.68c-18.47-8.34-33.24-15.36-42.52-19.84,9.28-4.48,24.05-11.51,42.52-19.84,28.61-12.92,34.6-14.76,42.52-22.68s9.76-13.91,22.68-42.52c8.34-18.47,15.36-33.24,19.84-42.52h0Z"></path></svg>';
} else if (storedMode === 'light-mode') {
  document.body.classList.add('light-mode');
  var toggleButton = document.getElementById('mode-toggle-button');
  toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 397.78 393.36" class="toggle-themes"><path d="m252.78,244.58c-56.36,0-102.05-45.69-102.05-102.05,0-29.05,12.14-55.27,31.62-73.85-61.93,8.74-109.57,61.95-109.57,126.29,0,70.45,57.11,127.56,127.56,127.56,64.34,0,117.55-47.64,126.29-109.57-18.58,19.48-44.8,31.62-73.85,31.62Z"></path></svg>';
  var toggleButton = document.getElementById('mode-toggle-button-mob');
  toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 397.78 393.36" class="toggle-themes"><path d="m252.78,244.58c-56.36,0-102.05-45.69-102.05-102.05,0-29.05,12.14-55.27,31.62-73.85-61.93,8.74-109.57,61.95-109.57,126.29,0,70.45,57.11,127.56,127.56,127.56,64.34,0,117.55-47.64,126.29-109.57-18.58,19.48-44.8,31.62-73.85,31.62Z"></path></svg>';
} else {
  var systemMode = getSystemMode();
  if (systemMode === 'dark-mode') {
    document.body.classList.add('dark-mode');
    var toggleButton = document.getElementById('mode-toggle-button');
    toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="30 0 397.78 393.36" class="toggle-themes"><path d="m198,68.4c4.48,9.28,11.51,24.05,19.84,42.52,12.92,28.61,14.76,34.6,22.68,42.52s13.91,9.76,42.52,22.68c18.47,8.34,33.24,15.36,42.52,19.84-9.28,4.48-24.05,11.51-42.52,19.84-28.61,12.92-34.6,14.76-42.52,22.68s-9.76,13.91-22.68,42.52c-8.34,18.47-15.36,33.24-19.84,42.52-4.48-9.28-11.51-24.05-19.84-42.52-12.92-28.61-14.76-34.6-22.68-42.52s-13.91-9.76-42.52-22.68c-18.47-8.34-33.24-15.36-42.52-19.84,9.28-4.48,24.05-11.51,42.52-19.84,28.61-12.92,34.6-14.76,42.52-22.68s9.76-13.91,22.68-42.52c8.34-18.47,15.36-33.24,19.84-42.52h0Z"></path></svg>';
    var toggleButton = document.getElementById('mode-toggle-button-mob');
    toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="30 0 397.78 393.36" class="toggle-themes"><path d="m198,68.4c4.48,9.28,11.51,24.05,19.84,42.52,12.92,28.61,14.76,34.6,22.68,42.52s13.91,9.76,42.52,22.68c18.47,8.34,33.24,15.36,42.52,19.84-9.28,4.48-24.05,11.51-42.52,19.84-28.61,12.92-34.6,14.76-42.52,22.68s-9.76,13.91-22.68,42.52c-8.34,18.47-15.36,33.24-19.84,42.52-4.48-9.28-11.51-24.05-19.84-42.52-12.92-28.61-14.76-34.6-22.68-42.52s-13.91-9.76-42.52-22.68c-18.47-8.34-33.24-15.36-42.52-19.84,9.28-4.48,24.05-11.51,42.52-19.84,28.61-12.92,34.6-14.76,42.52-22.68s9.76-13.91,22.68-42.52c8.34-18.47,15.36-33.24,19.84-42.52h0Z"></path></svg>';
  } else {
    document.body.classList.add('light-mode');
    var toggleButton = document.getElementById('mode-toggle-button');
    toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 397.78 393.36" class="toggle-themes"><path d="m252.78,244.58c-56.36,0-102.05-45.69-102.05-102.05,0-29.05,12.14-55.27,31.62-73.85-61.93,8.74-109.57,61.95-109.57,126.29,0,70.45,57.11,127.56,127.56,127.56,64.34,0,117.55-47.64,126.29-109.57-18.58,19.48-44.8,31.62-73.85,31.62Z"></path></svg>';
    var toggleButton = document.getElementById('mode-toggle-button-mob');
    toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 397.78 393.36" class="toggle-themes"><path d="m252.78,244.58c-56.36,0-102.05-45.69-102.05-102.05,0-29.05,12.14-55.27,31.62-73.85-61.93,8.74-109.57,61.95-109.57,126.29,0,70.45,57.11,127.56,127.56,127.56,64.34,0,117.55-47.64,126.29-109.57-18.58,19.48-44.8,31.62-73.85,31.62Z"></path></svg>';
  }
}

var toggleButton = document.getElementById('mode-toggle-button');
toggleButton.addEventListener('click', toggleMode);

var toggleButton = document.getElementById('mode-toggle-button-mob');
toggleButton.addEventListener('click', toggleMode);
