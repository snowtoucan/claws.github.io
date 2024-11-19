import { iconList  } from "./assets.js";

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

for (const [icon, path] of iconList) {
    let link = document.createElement('a');
    link.href = path;
    link.innerHTML = icon;
    scrollWrapper.appendChild(link);
}
