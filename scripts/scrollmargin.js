const scrollmargin = document.getElementById('scrollmargin');
const artistlist = document.getElementById('artistlist');

scrollmargin.addEventListener('mouseenter', handleMouseEnter);
scrollmargin.addEventListener('mouseleave', handleMouseLeave);
artistlist.addEventListener('mouseenter', handleMouseEnter);
artistlist.addEventListener('mouseleave', handleMouseLeave);

function handleMouseEnter() {
artistlist.classList.add('hovered');
}

function handleMouseLeave() {
artistlist.classList.remove('hovered');
}