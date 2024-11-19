import {iconList} from "./assets.js";
import {artistPreview} from "./artists.js";

const sideBarContainer = document.getElementById('sidebar');

const scrollMargin = document.createElement('div');
scrollMargin.className = 'scrollmargin';
scrollMargin.id = 'scrollmargin';

const artistList = document.createElement('div');
artistList.className = 'artistlist';
artistList.id = 'artistlist';

const scrollWrapper = document.createElement('div');
scrollWrapper.className = 'scroll-wrapper';
scrollWrapper.id = 'scroll-wrapper';

artistList.appendChild(scrollWrapper);
scrollMargin.appendChild(artistList);
sideBarContainer.appendChild(scrollMargin);

var count = 0; 
for (const [icon, path] of iconList) {
    let link = document.createElement('a');
    link.href = path;
    link.classList = "artistIcon";
    link.innerHTML = icon;
    link.setAttribute('data-index', count);

    link.addEventListener("mouseenter", (event) => {
        handleMouseEnter(event)
    })
    
    link.addEventListener("mouseleave", (event) => {
        handleMouseLeave(event)
    })
    
    scrollWrapper.appendChild(link);
    count++;
}

function handleMouseEnter(event) {
    event.target.classList.add('hovered');

    const index = event.target.getAttribute("data-index");
    const container = document.getElementById("artistbody");

    // hide content 
    const content = document.getElementById("artistContent");
    content.style.display = "none";

    // add preview
    let preview = document.createElement("div");
    preview.id = "artistPreview"
    preview.innerHTML = artistPreview[index];
    container.appendChild(preview);
}

function handleMouseLeave(event) {
    event.target.classList.remove('hovered');

    // remove preview
    const preview = document.getElementById("artistPreview");
    preview.remove();

    // show artist content
    const content = document.getElementById("artistContent");
    content.style.display = "block";
}