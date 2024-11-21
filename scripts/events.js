// Adjustable variables for HSB ranges and timing
const hsbRanges = {
    hueMin: 0,         // Minimum hue (0º)
    hueMax: 360,       // Maximum hue (360º)
    saturationMin: 20, // Minimum saturation (30%)
    saturationMax: 40, // Maximum saturation (70%)
    brightnessMin: 90, // Minimum brightness (70%)
    brightnessMax: 100 // Maximum brightness (100%)
};

const timeRanges = {
    minInterval: 0, // Minimum interval (1 second) in milliseconds
    maxInterval: 10000  // Maximum interval (10 seconds) in milliseconds
};

// Utility function to generate a random number between min and max
function getRandomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

// Utility function to convert HSB to RGB
function hsbToRgb(h, s, b) {
    s /= 100;
    b /= 100;

    const k = (n) => (n + h / 60) % 6;
    const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));

    const r = Math.round(f(5) * 255);
    const g = Math.round(f(3) * 255);
    const bOut = Math.round(f(1) * 255);

    return `rgb(${r}, ${g}, ${bOut})`;
}

// Function to generate a random HSB color within the ranges
function getRandomColor() {
    const h = getRandomInRange(hsbRanges.hueMin, hsbRanges.hueMax);
    const s = getRandomInRange(hsbRanges.saturationMin, hsbRanges.saturationMax);
    const b = getRandomInRange(hsbRanges.brightnessMin, hsbRanges.brightnessMax);
    return hsbToRgb(h, s, b);
}

// Function to initialize colors randomly
function initializeColors() {
    document.querySelectorAll("svg rect").forEach((rect) => {
        // Initialize each rect with a random color
        rect.style.fill = getRandomColor();

        // Apply a random transition duration for each rect on initialization
        const randomTransitionDuration = getRandomInRange(1, 10) + 's'; // Between 1 and 10 seconds
        rect.style.transition = `fill ${randomTransitionDuration} ease-in-out`;

        // Adding event listeners
        rect.addEventListener("mouseenter", () => {
            rect.style.transition = "fill 1s ease-in-out"; // 1-second transition on hover
            rect.style.fill = getRandomColor(); // Change color on hover
        });

        // For touch devices: 'touchstart' event
        rect.addEventListener("touchstart", () => {
            rect.style.transition = "fill 1s ease-in-out"; // 1-second transition on touch
            rect.style.fill = getRandomColor(); // Change color on touch
        });

        // For click: 'click' event
        rect.addEventListener("click", () => {
            rect.style.transition = "fill 1s ease-in-out"; // 1-second transition on click
            rect.style.fill = getRandomColor(); // Change color on click
        });
    });
}

// Function to apply a random color to all rects with a fixed transition duration of 0.3 seconds
function applyRandomizedColors() {
    document.querySelectorAll("svg rect").forEach((rect) => {
        // Set transition duration to 0.3 seconds for toggle mode
        rect.style.transition = "fill 0.3s ease-in-out"; // Fixed 0.3s transition
        rect.style.fill = getRandomColor(); // Update color
    });
}

// Global variable to track if the color update is paused
let isUpdatePaused = false;

// Function to update colors randomly at random intervals
function updateColors() {
    // If updates are paused, return early
    if (isUpdatePaused) return;

    document.querySelectorAll("svg rect").forEach((rect) => {
        const randomDelay = getRandomInRange(timeRanges.minInterval, timeRanges.maxInterval);
        setTimeout(() => {
            const randomTransitionDuration = getRandomInRange(1, 10) + 's'; // Between 1 and 10 seconds
            rect.style.transition = `fill ${randomTransitionDuration} ease-in-out`; // Set random transition duration
            rect.style.fill = getRandomColor();
        }, randomDelay);
    });

    // Keep calling updateColors indefinitely, if not paused
    const nextUpdate = getRandomInRange(timeRanges.minInterval, timeRanges.maxInterval);
    setTimeout(updateColors, nextUpdate);
}

// Function to gradually increase the maxInterval after toggle
function graduallyIncreaseInterval() {
    let currentInterval = 1000; // Start at 1 second (1000 milliseconds)

    // Gradually increase maxInterval by 1000 milliseconds every second until it reaches 10 seconds
    const intervalIncrease = setInterval(() => {
        if (currentInterval >= 10000) {
            clearInterval(intervalIncrease); // Stop once it reaches 10 seconds (10000 ms)
            return;
        }

        timeRanges.maxInterval = currentInterval; // Set maxInterval to the current value
        currentInterval += 1000; // Increase by 1000 milliseconds (1 second)
    }, 1000); // Increase every second (1000 ms)
}

// Toggle mode function (pause random color updates for 0.3 seconds)
function toggleMode() {
    // Pause the color updates temporarily
    isUpdatePaused = true;

    // Immediately apply new random colors to all rectangles with a 0.3s transition
    applyRandomizedColors();

    // Gradually increase the maxInterval
    graduallyIncreaseInterval();

    // Resume the normal behavior after 0.3 seconds
    setTimeout(() => {
        isUpdatePaused = false;
    }, 300); // Pause updates for 0.3 seconds, then resume
}

// Start the color animation
document.addEventListener("DOMContentLoaded", () => {
    initializeColors();
    updateColors();

    // Change the transition to 1 second after the initial load
    setTimeout(() => {
        document.querySelectorAll("svg rect").forEach((rect) => {
            rect.style.transition = "fill 1s ease-in-out";
        });
    }, 2000); // Change transition after 2 seconds
});



    // Select the elements
    const eventsDescription = document.querySelector('.events-description');
    const eventsInteractive = document.querySelector('.events-interactive');

    // Ensure elements are selected correctly
    if (!eventsDescription || !eventsInteractive) {
        console.log('Could not find elements');
    }

    // Listen for the scroll event on the window
    window.addEventListener('scroll', function() {
        // Get the position of events-description relative to the viewport
        const rect = eventsDescription.getBoundingClientRect();

        // Check if the bottom of events-description is in the viewport
        if (rect.bottom <= window.innerHeight) {
            // Add the 'continue' class if the bottom of the description is visible
            eventsInteractive.classList.add('continue');
        } else {
            // Remove the 'continue' class if it's not visible
            eventsInteractive.classList.remove('continue');
        }
    });



//  control stickiness of interactive element:

const interactiveElement = document.querySelector('.events-interactive');
const row4End = document.querySelector('.events-row-4-end');
const eventsContent = document.querySelector('.events-content');

let isFixed = false;

// Observer to check if the events-content is on the screen
const contentObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      // Hide the interactive element if events-content is not visible
      interactiveElement.classList.add('hidden');
    } else {
      // Show the interactive element if events-content is visible
      interactiveElement.classList.remove('hidden');
    }
  });
}, {
  root: null, // Viewport
  threshold: 0 // Partially visible is enough to trigger
});

contentObserver.observe(eventsContent);

// Observer to check the position of row4End
const row4EndObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (interactiveElement.classList.contains('hidden')) {
      // Skip logic if interactive element is hidden
      return;
    }

    if (entry.isIntersecting) {
      // Row4End is visible
      interactiveElement.classList.add('continue');
      isFixed = true;
    } else {
      // Row4End is not visible
      interactiveElement.classList.remove('continue');
      isFixed = false;
    }
  });
}, {
  root: null, // Viewport
  threshold: 1.0 // Fully visible
});

row4EndObserver.observe(row4End);


// live + chat + pastevents switching
const eventsTitle = document.querySelector('.events-title')
const eventsContainer = document.querySelector('.events-container')
const interactiveTitle = document.querySelector('.content-title.interactive')
const contentTitle = document.getElementById("content-title")
const contentDescription = document.querySelector('.content-description')

function eventType(type) { //replay, live, past
    if (type == 'replay') {
        interactiveElement.classList.add('chat');
        eventsTitle.classList.add('chat');
        eventsContainer.classList.add('chat');
        eventsDescription.classList.add('chat');
        interactiveTitle.textContent = 'Chat Replay:';
        contentTitle.textContent = '(Past Event Title)';
        contentDescription.textContent = '(Past Event Description)';
    } else if (type == 'live') {
        interactiveElement.classList.add('chat');
        eventsTitle.classList.add('chat');
        eventsContainer.classList.add('chat');
        eventsDescription.classList.add('chat');
        interactiveTitle.textContent = 'Live Chat:';
        contentTitle.textContent = '(Live Event Title)';
        contentDescription.textContent = '(Live Event Description)';
    }
    else {
        interactiveElement.classList.remove('chat');
        eventsTitle.classList.remove('chat');
        eventsContainer.classList.remove('chat');
        eventsDescription.classList.remove('chat');
        interactiveTitle.textContent = 'Past Events:';
    }
};

eventType('none')
// countdown functionality for live?
// need to think about backend. scheduling events and uploading old ones should be made easy as possible
