const backButton = document.getElementById('menu-back');

function showSubMenu(menu) {
    const allHeadRightElements = document.querySelectorAll('.head-right');

    allHeadRightElements.forEach(element => {
        element.classList.add('hidden');
    });

    // Hide all submenus
    const allSubMenus = document.querySelectorAll('.submenu');
    allSubMenus.forEach(submenu => {
        submenu.classList.remove('show');
    });

    // Show the selected submenu
    const selectedSubMenu = document.querySelector(`.${menu}-submenu`);
    if (selectedSubMenu) {
        selectedSubMenu.classList.add('show');
    }

    // Show the back button
    backButton.classList.add('show');
}

function goBack() {
    const allHeadRightElements = document.querySelectorAll('.head-right');

    // Restore visibility of all .head-right elements
    allHeadRightElements.forEach(element => {
        element.classList.remove('hidden');
    });

    // Hide all submenus
    const allSubMenus = document.querySelectorAll('.submenu');
    allSubMenus.forEach(submenu => {
        submenu.classList.remove('show');
    });

    // Hide the back button
    backButton.classList.remove('show');
}