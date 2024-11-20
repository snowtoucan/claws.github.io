import {iconList} from "./assets.js";
import {artistPreview} from "./artists.js";

const sideBarContainer = document.getElementById('sidebar');

const replacebgList = document.createElement('div');
replacebgList.className = 'replacebglist';
replacebgList.id = 'replacebglist';
sideBarContainer.appendChild(replacebgList);

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
    const target = event.target;

    // Add hover effect
    target.classList.add('hovered');

    // Handle artist preview (from friend's code)
    if (target.classList.contains("artistIcon")) {
        const index = target.getAttribute("data-index");
        const container = document.getElementById("artistbody");

        // Hide existing content
        const content = document.getElementById("artistContent");
        content.style.display = "none";

        // Add preview
        let preview = document.createElement("div");
        preview.id = "artistPreview";
        preview.innerHTML = artistPreview[index];
        container.appendChild(preview);
    }
}

function handleMouseLeave(event) {
    const target = event.target;

    // Remove hover effect
    target.classList.remove('hovered');

    // Handle artist preview cleanup
    if (target.classList.contains("artistIcon")) {
        const preview = document.getElementById("artistPreview");
        if (preview) preview.remove();

        // Restore artist content
        const content = document.getElementById("artistContent");
        content.style.display = "block";
    }
}

// Event Listeners for Scroll Margin and Artist List
document.addEventListener('mouseenter', (event) => {
    if (event.target.id === 'artistlist') {
        event.target.classList.add('hovered');
    }
}, true);

document.addEventListener('mouseleave', (event) => {
    if (event.target.id === 'artistlist') {
        event.target.classList.remove('hovered');
    }
}, true);