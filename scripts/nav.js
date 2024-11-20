console.log("booting harmOS...")

const header = document.getElementById("header");
let navContainer = document.createElement('div');
navContainer.classList.add('nav-container');

const currentPath = window.location.pathname;
const artistView = currentPath.includes('artists/');
const currentDepth = currentPath.split('/').length - 3;
const prefix = '../'.repeat(currentDepth);

navContainer.innerHTML = `
        <div class="head-left">
            <a id = "indexLink" href="${prefix}./index.html">
                <li class="li-head">
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 262.19 283.46' class="logo">
                        <path d='m102.05,95.24c4.19-1.16,8.72-2.62,13.5-4.46,5.03-1.93,9.57-4,13.62-6.04.37.24.75.49,1.12.73l-2.7,27.6c6.5-1.01,14.27-.77,23.06-.65,8.55.11,16.2,1.38,22.55,2.51-1.05-14.87-2.05-32.26-3.1-47.13,4.25-.92,9.1-2.25,14.33-4.22,4.91-1.84,9.19-3.88,12.83-5.86.4.19.79.38,1.19.57l-4.12,62.57c10.9,3.16,21.65,9.05,37.33,19.08,17.81,11.4,30.52,28.56,30.52,28.56,0,0-1.65.62-2.47.93-10.85-5.87-15.74-9.08-31.74-14.24-13.66-4.4-23.48-7.35-34.34-9.02-.35,23.63-.07,46.41.94,72.14.74,18.89,1.84,37.19,3.24,54.87-3.87,1.03-8.11,2.36-12.6,4.09-5.09,1.97-9.6,4.1-13.51,6.19l-1.16-.72c2.39-27.48,3.99-56.63,4.48-87.3.29-18.42.19-35.1-.29-52.35-7.4-.45-15.07-1.46-24-1.03-8.86.42-17.59,1.02-24.86,2.16-.23,15.55-.12,31.74.42,48.53.64,20.04,1.83,39.21,3.41,57.45-3.81.94-8.08,2.24-12.66,4.05-5.22,2.07-9.71,4.37-13.46,6.56-.4-.18-.79-.37-1.19-.55,2.55-19.97,4.36-42.02,4.8-65.88.3-16.36-.26-32.8-1.1-47.3-13.96,3.32-32.66,8.45-52.16,18.51-20.45,10.56-35.11,24.07-46.12,33.93h-2.64c-3.72-14.4-8.95-42.65-1.08-76.47,12.49-53.69,49.11-83.29,58.29-90.32C70.53,26.49,107.2-.31,160.4,0c23.99.14,43.24,5.75,55.36,10.3,3.58,4.2,8.36,10.78,12.02,19.8,3.83,9.45,4.93,17.88,5.22,23.51-.83.32-1.65.63-2.48.95-9.98-6.19-26.77-14.9-49.17-18.74-7.36-1.26-38.77-6.02-74.39,7.98C51.32,65.68,28.58,116.34,22.69,129.47c-11.73,26.13-14.53,49.79-15.2,64.34,6.45-11.61,17.65-28.44,36.01-44.24,23.11-19.87,46.62-28.15,60.53-32.2-.21-3.5-.45-7.67-.8-11.36-.34-3.7-.74-7.29-1.18-10.77Z'/>
                    </svg>
                </li>
                <li class="li-head title">
                    <h1 class="title">claws</h1>
                </li>
            </a>
        </div> 
        <div class="head-right"> 
            <div class="desktop-menu">
                <li id="menu-back" class="menu-back">
                    <a class="backbutton" href="#" onclick="goBack()">
                        <h2>></h2>
                    </a>
                </li>
                <div class="menu-container">
                    <div class="menu-wrapper">
                        <li class="li-head menu">
                            <a href="#" onclick="showSubMenu('about')">
                                <h2 class="noselect">about</h2>
                            </a>
                        </li>
                        <div class="submenu about-submenu">
                            <li>
                                <a id='artistsLink' href="${prefix}./artists/harmtails.html">
                                    <h2>artists</h2>
                                </a>
                            </li>
                            <li>
                                <a id='historyLink' href="#">
                                    <h2>history</h2>
                                </a>
                            </li>
                            <li>
                                <a id='newsLink' href="#">
                                    <h2>news</h2>
                                </a>
                            </li>
                            <li>
                                <a id='enquiriesLink' href="#" onclick="showSubMenu('enquiries')">
                                    <h2>enquiries</h2>
                                </a>
                            </li>
                        </div>
                        <div class="submenu enquiries-submenu">
                            <li>
                                <a id='licensingLink' href="#">
                                    <h2>licensing</h2>
                                </a>
                            </li>
                            <li>
                                <a id='bookingLink' href="#">
                                    <h2>booking</h2>
                                </a>
                            </li>
                            <li>
                                <a id='contactLink' href="#">
                                    <h2>contact us</h2>
                                </a>
                            </li>
                        </div>
                        <li class="li-head menu">
                            <a id='shopLink' href="#">
                                <h2 class="noselect">shop</h2>
                            </a>
                        </li>
                        <li class="li-head menu">
                            <a id = 'listenLink' href="#" onclick="showSubMenu('listen')">
                                <h2 class="noselect">listen</h2>
                            </a>
                        </li>
                        <div class="submenu listen-submenu">
                            <li><a id='releasesLink' href="#"><h2>releases</h2></a></li>
                            <li><a id='festivalLink' href="https://soundcloud.com/claws-world/sets/claws-festivals" target="_blank"><h2>claws festivals</h2></a></li>
                            <li><a id='familyLink' href="https://soundcloud.com/claws-world/sets/claws-family" target="_blank"><h2>claws family</h2></a></li>
                        </div>
                        <li class="li-head menu">
                            <a id='eventsLink' href="${prefix}./events.html">
                                <h2 class="noselect">events</h2>
                            </a>
                        </li>
                    </div>
                </div>
                <li class="li-head themes"> 
                    <a href="#" id="mode-toggle-button">
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000' class="toggle-themes">
                            <path d="M738.2,623.6c-199.8,0-361.8-162-361.8-361.8c0-103,43-196,112.1-261.8C268.9,31,100,219.6,100,447.8C100,697.5,302.5,900,552.2,900C780.4,900,969,731.1,1000,511.5C934.1,580.6,841.2,623.6,738.2,623.6L738.2,623.6L738.2,623.6z"/>
                        </svg>
                    </a>
                </li>   
            </div>
        </div>
`

header.appendChild(navContainer)

console.log(currentPath)