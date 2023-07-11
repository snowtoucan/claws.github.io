const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight - 82.8), 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

let model; // Variable to hold the loaded GLTF model

const loader = new THREE.GLTFLoader();
loader.load(
  'blade.gltf',
  function (gltf) {
    model = gltf.scene;
    scene.add(model);

    // Center the object vertically
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.y -= center.y;

    // Render the scene
    animate();
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);

let isDragging = false;
let previousMousePosition = {
  x: 0,
  y: 0
};
let lastMouseMovementX = 0;
let isMouseMovingLeft = false;

function handleMouseDown(event) {
  isDragging = true;
  previousMousePosition = {
    x: event.clientX,
    y: event.clientY
  };
  lastMouseMovementX = 0; // Reset the overall movement
  isMouseMovingLeft = false; // Reset the movement direction
}

function handleMouseMove(event) {
  if (!isDragging) {
    return;
  }

  const { clientX, clientY } = event;
  const movementX = clientX - previousMousePosition.x;
  const movementY = clientY - previousMousePosition.y;

  if (movementX !== 0) {
    model.rotation.y += movementX * 0.003;
    lastMouseMovementX = movementX; // Update the overall movement
    isMouseMovingLeft = movementX < 0; // Update the movement direction
  }

  if (movementY !== 0) {
    const maxVerticalRotation = Math.PI / 6; // 10 degrees in radians
    const minVerticalRotation = -Math.PI / 18; // 30 degrees in radians

    model.rotation.x = Math.max(minVerticalRotation, Math.min(maxVerticalRotation, model.rotation.x + movementY * 0.003));
  }

  previousMousePosition = {
    x: clientX,
    y: clientY
  };
}

function handleMouseUp(event) {
  isDragging = false;

  const rotationSpeed = 0.006;
  let momentumX = lastMouseMovementX * 0.003; // Calculate momentum based on the overall movement
  let momentumSign = Math.sign(momentumX); // Get the sign of the momentum

  // Apply deceleration until momentum reaches zero
  const deceleration = 0.003;
  const stopThreshold = 0.001;

  function updateMomentum() {
    if (Math.abs(momentumX) > stopThreshold) {
      model.rotation.y += momentumX;
      momentumX -= momentumSign * deceleration;
      requestAnimationFrame(updateMomentum);
    } else {
      // If momentum reaches zero, set rotation speed based on the last known movement direction
      model.rotation.y += isMouseMovingLeft ? -rotationSpeed : rotationSpeed;
    }
  }

  updateMomentum();
}

function isMouseWithinWindow() {
  const { clientX, clientY } = previousMousePosition;
  return (
    clientX >= 0 &&
    clientX <= window.innerWidth &&
    clientY >= 0 &&
    clientY <= window.innerHeight
  );
}

document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);

function handleMouseLeave(event) {
  if (isDragging) {
    // Keep the last movement direction even when the cursor leaves the canvas
    isMouseMovingLeft = event.clientX < 0 || event.clientX > window.innerWidth;
  }
}

document.addEventListener('mouseleave', handleMouseLeave);
window.addEventListener('mouseout', handleMouseLeave);

function animate() {
  requestAnimationFrame(animate);

  if (!isDragging) {
    model.rotation.y += isMouseMovingLeft ? -0.006 : 0.006; // Change the natural rotation direction based on the last mouse movement
  }

  renderer.render(scene, camera);
}

function updateCanvasSize() {
  const height = window.innerHeight - 82.8;
  const width = window.innerWidth;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

window.addEventListener('resize', updateCanvasSize);
updateCanvasSize();

document.getElementById('scene-container').appendChild(renderer.domElement);
