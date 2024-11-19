// Initialize history with the 'main' menu as the first item
let menuHistory = ['main'];

// Get back button element
const backButton = document.getElementById('menu-back');

// Function to show a submenu and add it to the history stack
function showSubMenu(menu) {
    // Hide all top-level menu items
    const allHeadRightElements = document.querySelectorAll('.li-head.menu');
    allHeadRightElements.forEach(element => {
        element.classList.add('hidden');
    });

    // Hide all submenus (including nested ones)
    const allSubMenus = document.querySelectorAll('.submenu');
    allSubMenus.forEach(submenu => {
        submenu.classList.remove('show');
    });

    // Show the selected submenu
    const selectedSubMenu = document.querySelector(`.${menu}-submenu`);
    if (selectedSubMenu) {
        selectedSubMenu.classList.add('show');
    }

    // Add the current submenu to the history stack only if it's a new menu (not already in the history)
    if (menuHistory[menuHistory.length - 1] !== menu) {
        menuHistory.push(menu);
    }

    // Trigger the back button animation
    if (menuHistory.length > 1) {
        backButton.classList.remove('show'); // Remove the class temporarily
        void backButton.offsetWidth; // Trigger reflow, forces the browser to recalculate
        backButton.classList.add('show'); // Re-add the class to start the animation
    }
}

// Function to go back to the previous level of the menu
function goBack() {
    // Pop the current submenu from the history stack (do not push anything back into the history)
    menuHistory.pop();

    // If there is still history (we're not at the root menu), go to the previous submenu
    if (menuHistory.length > 1) {  // We're not at the main menu level
        const previousMenu = menuHistory[menuHistory.length - 1];
        showSubMenu(previousMenu);
    } else {
        // If we're at the main menu level, show the main menu and hide the back button
        const allHeadRightElements = document.querySelectorAll('.li-head.menu');
        allHeadRightElements.forEach(element => {
            element.classList.remove('hidden');
        });

        // Hide all submenus
        const allSubMenus = document.querySelectorAll('.submenu');
        allSubMenus.forEach(submenu => {
            submenu.classList.remove('show');
        });

        // Hide the back button when at the main menu
        backButton.classList.remove('show');
    }
}

// Event listeners for showing/hiding scrollbar on hover
const menuContainer = document.querySelector('.menu-container');

menuContainer.addEventListener('mouseenter', () => {
    menuContainer.style.setProperty('--scrollbar-opacity', 0.5); // Make scrollbar visible
});

menuContainer.addEventListener('mouseleave', () => {
    menuContainer.style.setProperty('--scrollbar-opacity', 0); // Make scrollbar invisible
});