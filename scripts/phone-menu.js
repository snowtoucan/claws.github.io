// Adjustable global variables
const MIN_RADIUS = 40;
const MAX_SPEED = 0.001;
const SPEED_NOISE_STRENGTH = 0.005;
const RADIUS_NOISE_STRENGTH = 0.1;
const COLLISION_THRESHOLD = 200;
const SPAWN_MARGIN = 150;
const ATTRACT_FORCE_STRENGTH = 0.01; // Strength of attraction for closest item
const REPEL_FORCE_STRENGTH = 0.01;  // Strength of repulsion for other items
const CURSOR_DISTANCE_THRESHOLD = 2000;
const MAX_TEXT_SCALE = 2; // Maximum scaling factor for text size
const TEXT_DISTANCE_THRESHOLD = 200; // Distance within which scaling occurs

let itemsData = [];
let cursorX = null;
let cursorY = null;

// Function to calculate the dynamic minimum font size
function calculateMinFontSize() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Calculate 2% of viewport width and height
    const vw = viewportWidth * 0.02; // 2% of viewport width
    const vh = viewportHeight * 0.02; // 2% of viewport height

    // Calculate the min font size based on the formula
    const baseFontSize = 82.8; // base value in px
    return 0.283 * (baseFontSize + vh + vw);
}

// Convert polar coordinates to Cartesian
function polarToCartesian(centerX, centerY, radiusX, radiusY, angle) {
    const x = centerX + radiusX * Math.cos(angle);
    const y = centerY + radiusY * Math.sin(angle);
    return { x, y };
}

// Calculate distance between two points
function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// Initialize menu items
function initMenuItems() {
    const container = document.querySelector('.dropdown-container');
    const items = document.querySelectorAll('.dropdown-menu li');

    const centerX = container.offsetWidth / 2;
    const centerY = container.offsetHeight / 2;
    const maxRadiusX = container.offsetWidth / 2 - MIN_RADIUS;
    const maxRadiusY = container.offsetHeight / 2 - MIN_RADIUS;

    let placedItems = [];

    items.forEach((item, index) => {
        let radiusX = Math.random() * (maxRadiusX - MIN_RADIUS) + MIN_RADIUS;
        let radiusY = Math.random() * (maxRadiusY - MIN_RADIUS) + MIN_RADIUS;
        let angle = Math.random() * Math.PI * 2;

        const position = polarToCartesian(centerX, centerY, radiusX, radiusY, angle);
        let newItem = {
            x: position.x,
            y: position.y,
            radius: item.offsetWidth / 2,
        };

        let attempts = 0;
        while (resolveSpawnCollisions(newItem, placedItems) && attempts < 100) {
            attempts++;
        }

        placedItems.push(newItem);

        itemsData.push({
            radiusX: radiusX,
            radiusY: radiusY,
            angle: angle,
            speed: 0.01,
            currentX: position.x,
            currentY: position.y,
            cursorForce: { x: 0, y: 0 },
        });

        item.style.left = `${newItem.x - item.offsetWidth / 2}px`;
        item.style.top = `${newItem.y - item.offsetHeight / 2}px`;
    });

    moveMenuItems();
}

// Resolve collisions during spawn
// Resolve collisions during spawn with stronger adjustments
function resolveSpawnCollisions(newItem, existingItems) {
    for (let other of existingItems) {
        const distance = calculateDistance(newItem.x, newItem.y, other.x, other.y);
        const minAllowedDistance = newItem.radius + other.radius + SPAWN_MARGIN;

        if (distance < minAllowedDistance) {
            const overlap = minAllowedDistance - distance;
            const angle = Math.atan2(newItem.y - other.y, newItem.x - other.x);

            // Increase overlap adjustment strength
            const adjustmentStrength = 0.2; // Increase this for stronger collision prevention
            newItem.x += Math.cos(angle) * overlap * adjustmentStrength;
            newItem.y += Math.sin(angle) * overlap * adjustmentStrength;

            return true; // Mark collision as resolved for this pass
        }
    }
    return false;
}

// Cursor interaction logic
function handleCursorInteraction(event) {
    const container = document.querySelector('.dropdown-container');
    const rect = container.getBoundingClientRect();

    cursorX = event.type.includes("touch") ? event.touches[0].clientX - rect.left : event.clientX - rect.left;
    cursorY = event.type.includes("touch") ? event.touches[0].clientY - rect.top : event.clientY - rect.top;
}

// Move menu items (updated)
function moveMenuItems() {
    const container = document.querySelector('.dropdown-container');
    const items = document.querySelectorAll('.dropdown-menu li');
    const centerX = container.offsetWidth / 2;
    const centerY = container.offsetHeight / 2;

    items.forEach((item, index) => {
        const data = itemsData[index];

        // Apply orbital movement
        const radiusNoiseX = (Math.random() - 0.5) * RADIUS_NOISE_STRENGTH;
        const radiusNoiseY = (Math.random() - 0.5) * RADIUS_NOISE_STRENGTH;
        data.radiusX = Math.max(MIN_RADIUS, data.radiusX + radiusNoiseX);
        data.radiusY = Math.max(MIN_RADIUS, data.radiusY + radiusNoiseY);

        const speedNoise = (Math.random() - 0.5) * SPEED_NOISE_STRENGTH;
        data.speed = Math.min(MAX_SPEED, Math.max(0.005, data.speed + speedNoise));

        data.angle += data.speed;

        // Calculate orbital position
        const orbitalPosition = polarToCartesian(centerX, centerY, data.radiusX, data.radiusY, data.angle);

        // Combine with cursor interaction
        if (cursorX !== null && cursorY !== null) {
            const distance = calculateDistance(cursorX, cursorY, data.currentX, data.currentY);
            if (distance < CURSOR_DISTANCE_THRESHOLD) {
                const angle = Math.atan2(cursorY - data.currentY, cursorX - data.currentX);

                // Closest item is attracted, others are repelled
                const isClosest = distance === Math.min(...itemsData.map(d =>
                    calculateDistance(cursorX, cursorY, d.currentX, d.currentY)
                ));

                const repulsionFactor = Math.max(0, (CURSOR_DISTANCE_THRESHOLD - distance) / CURSOR_DISTANCE_THRESHOLD);
                const forceStrength = isClosest
                    ? ATTRACT_FORCE_STRENGTH
                    : -REPEL_FORCE_STRENGTH * repulsionFactor;

                data.cursorForce.x += Math.cos(angle) * forceStrength;
                data.cursorForce.y += Math.sin(angle) * forceStrength;
            }
        }

        // Update position with combined forces
        data.currentX = orbitalPosition.x + data.cursorForce.x * 50;
        data.currentY = orbitalPosition.y + data.cursorForce.y * 50;

        item.style.left = `${data.currentX - item.offsetWidth / 2}px`;
        item.style.top = `${data.currentY - item.offsetHeight / 2}px`;

        // Decay cursor forces gradually
        data.cursorForce.x *= 0.9;
        data.cursorForce.y *= 0.9;
    });

    // Update text scaling based on proximity to cursor
    const texts = document.querySelectorAll('hm');
    texts.forEach(text => {
        const rect = text.getBoundingClientRect();
        const textX = rect.left + rect.width / 2;
        const textY = rect.top + rect.height / 2;

        const distance = calculateDistance(cursorX, cursorY, textX, textY);

        // Calculate font size based on distance
        let fontSize = calculateMinFontSize(); // Use dynamic font size calculation
        if (distance < TEXT_DISTANCE_THRESHOLD) {
            fontSize = fontSize + (MAX_TEXT_SCALE - 1) * (1 - distance / TEXT_DISTANCE_THRESHOLD) * 10;  // Adjust factor as needed
        }

        // Apply the new font size
        text.style.fontSize = `${fontSize}px`;
    });

    // Schedule the next animation frame
    requestAnimationFrame(moveMenuItems);
}

// Cursor interaction logic
function handleCursorInteraction(event) {
    const container = document.querySelector('.dropdown-container');
    const rect = container.getBoundingClientRect();

    cursorX = event.type.includes("touch") ? event.touches[0].clientX - rect.left : event.clientX - rect.left;
    cursorY = event.type.includes("touch") ? event.touches[0].clientY - rect.top : event.clientY - rect.top;
}

// Initialize and bind events
document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector('.dropdown-container');
    initMenuItems();
    container.addEventListener("mousemove", handleCursorInteraction);
    container.addEventListener("touchmove", handleCursorInteraction);
});