const toggleMenuButton = document.getElementById('togglemenu-button');
const svgElement = document.getElementById('mobilemenu');
const dropdownMenu = document.getElementById('dropdown-container');

const svgOriginal = `
    <path class="cls-1" d="M1.07,0L0,1.5c2.47,3.9,5.02,8.51,7.34,13.84,3.96,9.1,6.01,17.49,7.11,24.22,27.85-3.42,58.42-5.83,91.35-6.46,49.07-.93,93.46,2.29,132.07,7.33.43-.55.85-1.1,1.28-1.65-2.31-4.29-4.63-9.06-6.81-14.3-3.59-8.63-6.04-16.71-7.74-23.86-33.12,3.27-69.64,5.36-109.06,5.35C74,5.97,35.66,3.61,1.07,0Z"/>
    <path class="cls-1" d="M1.07,97.27l-1.07,1.5c2.47,3.9,5.02,8.51,7.34,13.84,3.96,9.1,6.01,17.49,7.11,24.22,27.85-3.42,58.42-5.83,91.35-6.46,49.07-.93,93.46,2.29,132.07,7.33.43-.55.85-1.1,1.28-1.65-2.31-4.29-4.63-9.06-6.81-14.3-3.59-8.63-6.04-16.71-7.74-23.86-33.12,3.27-69.64,5.36-109.06,5.35-41.55-.02-79.89-2.37-114.48-5.99Z"/>
    <path class="cls-1" d="M1.07,194.53l-1.07,1.5c2.47,3.9,5.02,8.51,7.34,13.84,3.96,9.1,6.01,17.49,7.11,24.22,27.85-3.42,58.42-5.83,91.35-6.46,49.07-.93,93.46,2.29,132.07,7.33.43-.55.85-1.1,1.28-1.65-2.31-4.29-4.63-9.06-6.81-14.3-3.59-8.63-6.04-16.71-7.74-23.86-33.12,3.27-69.64,5.36-109.06,5.35-41.55-.02-79.89-2.37-114.48-5.99Z"/>`;

const svgNew = `
    <path class="cls-1" d="M102.15,127.05c33.44,37.18,62.65,73.6,87.96,107.92,7.51-5.14,16.44-10.45,26.8-15.21,6.29-2.89,12.31-5.2,17.9-7.07.1-.92.21-1.84.31-2.76-37.02-31.67-77.4-70.5-118.23-117.67C89.51,60.61,65.62,29.5,44.9,0c-6.64,5.31-15.5,11.29-26.57,16.14-6.49,2.84-12.56,4.78-17.96,6.13l-.36,2.42c32.4,29.22,66.92,63.16,102.15,102.35Z"/>
    <path class="cls-1" d="M202.99,0h3.06c3.36,3.36,8.29,7.56,15.11,11.46,5.09,2.91,9.94,4.9,13.99,6.27-12.39,9.52-29.32,23.09-48.36,40.27-24.84,22.4-41.52,40.34-62.87,63.29-17.38,18.68-32.39,34.82-50.95,57.92-17.54,21.82-31.15,41.04-41.03,55.77h-2.4c-3.33-2.83-7.39-5.9-12.26-8.95-6.2-3.87-12.14-6.72-17.25-8.81,29.36-24.28,52.92-46.14,70.6-63.42,43.87-42.87,73.47-78.91,91.27-100.71,17.32-21.22,31.16-39.51,41.12-53.08Z"/>`;

let isToggled = false;

toggleMenuButton.addEventListener('click', (e) => {
    e.preventDefault();
    svgElement.innerHTML = isToggled ? svgOriginal : svgNew;

    if (isToggled) {
        dropdownMenu.classList.remove('show'); // Trigger fade-out
    } else {
        dropdownMenu.classList.add('show'); // Trigger fade-in
    }

    isToggled = !isToggled;
});