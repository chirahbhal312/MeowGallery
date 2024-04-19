import * as THREE  from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

let scene;

function initThreeScene(){
  //Scene
  scene = new  THREE.Scene();



//Camera
const camera = new THREE.PerspectiveCamera(50, 1920/1080);
scene.add(camera);
camera.position.y=10;
camera.position.z=300;

//Renderer
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const backgroundTexture = textureLoader.load('/Public/image.avif');
const walltextureLoader = new THREE.TextureLoader();
const wallTexture = walltextureLoader.load('/Public/wall_texture.webp');
const ceilingtextureLoader = new THREE.TextureLoader();
const ceilingTexture = ceilingtextureLoader.load('/Public/ceiling_texture.jpg');

const paintingTextureLoader = new THREE.TextureLoader(); // Create a new texture loader for the painting
const paintingGeometry = new THREE.PlaneGeometry(50, 50); 
const paintingMaterial = new THREE.MeshPhongMaterial({ map: paintingTextureLoader.load('/Public/painting1.jpg') }); // Use the new loader
const painting1 = new THREE.Mesh(paintingGeometry, paintingMaterial);
painting1.position.x = -30;
painting1.position.z = -120;
scene.add(painting1);
const painting2Geometry = new THREE.PlaneGeometry(50, 50); 
const painting2Material = new THREE.MeshPhongMaterial({ map: paintingTextureLoader.load('/Public/painting2.jpg') }); // Use the new loader
const painting2 = new THREE.Mesh(painting2Geometry, painting2Material);
scene.add(painting2);
painting2.position.x = -150;
painting2.position.z = -120;
const painting3Geometry = new THREE.PlaneGeometry(50, 50); 
const painting3Material = new THREE.MeshPhongMaterial({ map: paintingTextureLoader.load('/Public/painting3.jpg') }); // Use the new loader
const painting3 = new THREE.Mesh(painting3Geometry, painting3Material);
painting3.position.x = 150;
painting3.position.z = -120;
scene.add(painting3);
const painting4Geometry = new THREE.PlaneGeometry(50, 50); 
const painting4Material = new THREE.MeshPhongMaterial({ map: paintingTextureLoader.load('/Public/painting4.jpg') }); // Use the new loader
const painting4 = new THREE.Mesh(painting4Geometry, painting4Material);
painting4.position.x = 60;
painting4.position.z = -120;
scene.add(painting4);
const painting5Geometry = new THREE.PlaneGeometry(50, 50); 
const painting5Material = new THREE.MeshPhongMaterial({ map: paintingTextureLoader.load('/Public/painting5.jpg') }); // Use the new loader
const painting5 = new THREE.Mesh(painting5Geometry, painting5Material);
painting5.position.x = 249;
painting5.position.z = 80;
painting5.rotation.y = -Math.PI/2;
scene.add(painting5);
const painting6Geometry = new THREE.PlaneGeometry(50, 50); 
const painting6Material = new THREE.MeshPhongMaterial({ map: paintingTextureLoader.load('/Public/painting6.jpg') }); // Use the new loader
const painting6 = new THREE.Mesh(painting6Geometry, painting6Material);
painting6.position.x = -248.5;
painting6.position.z = 80;
painting6.rotation.y = Math.PI/2;
scene.add(painting6);
const painting7Geometry = new THREE.PlaneGeometry(50, 50); 
const painting7Material = new THREE.MeshPhongMaterial({ map: paintingTextureLoader.load('/Public/painting7.jpg') }); // Use the new loader
const painting7 = new THREE.Mesh(painting7Geometry, painting7Material);
painting7.position.x = 249;
painting7.position.z = -80;
painting7.rotation.y = -Math.PI/2;
scene.add(painting7);
const painting8Geometry = new THREE.PlaneGeometry(50, 50); 
const painting8Material = new THREE.MeshPhongMaterial({ map: paintingTextureLoader.load('/Public/painting8.jpg') }); // Use the new loader
const painting8 = new THREE.Mesh(painting8Geometry, painting8Material);
painting8.position.x = -249;
painting8.position.z = -80;
painting8.rotation.y = Math.PI/2
scene.add(painting8);


//Floor
const fgeometry = new THREE.PlaneGeometry( 500, 750 );
const fmaterial = new THREE.MeshBasicMaterial( {map: backgroundTexture, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( fgeometry, fmaterial );
plane.rotation.x = Math.PI/2;
plane.position.y = -Math.PI*2;
plane.position.y = -40;
plane.position.z = 250;
scene.add( plane );

//ceiling
const cgeometry = new THREE.PlaneGeometry( 500, 750 );
const cmaterial = new THREE.MeshBasicMaterial( {map : ceilingTexture, side: THREE.DoubleSide} );
const ceiling = new THREE.Mesh( cgeometry, cmaterial );
ceiling.rotation.x = Math.PI/2;
ceiling.position.y = -Math.PI*2;
ceiling.position.y = 40;
ceiling.position.z = 250;
scene.add(ceiling);


const frontwall = new THREE.Mesh(
   new  THREE.BoxGeometry(500,80, 0.1),
   new THREE.MeshPhongMaterial({map: wallTexture})
)
frontwall.position.set(0,0,-125)
// scene.add(frontwall);

const backwall = new THREE.Mesh(
  new  THREE.BoxGeometry(500,80, 0.1),
   new THREE.MeshPhongMaterial({map: wallTexture})
)
backwall.position.set(0,0,625)
scene.add(backwall);

const leftWall = new THREE.Mesh(
   new THREE.BoxGeometry(0.1, 80, 750), // Adjust width, height, depth
   new THREE.MeshPhongMaterial({map: wallTexture})
 );
 
 // Set the position of the left wall (assuming you want it to the left of the front wall)
 leftWall.position.set(-250, 0, 250); // Adjust X position based on your scene setup
//  scene.add(leftWall);

 const rightWall = new THREE.Mesh(
   new THREE.BoxGeometry(0.1, 80, 750), // Adjust width, height, depth
   new THREE.MeshPhongMaterial({map: wallTexture})
 );
 
 // Set the position of the left wall (assuming you want it to the left of the front wall)
 rightWall.position.set(250, 0, 250); // Adjust X position based on your scene setup
//  scene.add(rightWall);

// Create a new group named wallGroup
const wallGroup = new THREE.Group();

// Add frontwall, leftWall, and rightWall to the wallGroup
wallGroup.add(frontwall);
wallGroup.add(leftWall);
wallGroup.add(rightWall);

// Add the wallGroup to the scene
scene.add(wallGroup);


//loop for walls
for  (let i = 0; i < wallGroup.children.length; i++){
   wallGroup.children[i].BBox = new THREE.Box3();
   wallGroup.children[i].BBox.setFromObject(wallGroup.children[i]);
}



//Lights
const light = new THREE.AmbientLight(0xffffff);
light.position.set(camera.position.x,  camera.position.y, camera.position.z)
scene.add(light)

//Directional light
const dir_light = new THREE.DirectionalLight(0xffffff,1.75);
dir_light.position.set(2, 5, 3);
dir_light.castShadow = true;
scene.add(dir_light);

// //Geometry
// const geometry = new THREE.BoxGeometry(10,10,10);
// const material = new THREE.MeshPhongMaterial(
//     {color:"#4CBD74"}
// );
// const cube = new THREE.Mesh(geometry,material);
// scene.add(cube);


// Controls
document.addEventListener("keydown", onKeyDown, false);

function onKeyDown(event) {
    const movement = 5; // Adjust movement speed

    switch (event.keyCode) {
        case 37: // Left arrow
        case 65: // 'A'
            moveCamera(-movement, 0);
            break;
        case 39: // Right arrow
        case 68: // 'D'
            moveCamera(movement, 0);
            break;
        case 38: // Up arrow
        case 87: // 'W'
            moveCamera(0, -movement);
            break;
        case 40: // Down arrow
        case 83: // 'S'
            moveCamera(0, movement);
            break;
    }
}

function moveCamera(deltaX, deltaZ) {
  const movementVector = new THREE.Vector3(deltaX, 0, deltaZ);
  const rotationMatrix = new THREE.Matrix4();
  rotationMatrix.makeRotationY(camera.rotation.y);
  movementVector.applyMatrix4(rotationMatrix);

  const newPosition = camera.position.clone().add(movementVector);
  
  if (!checkCollision(newPosition)) {
      camera.position.copy(newPosition);
  } else {
      // If collision detected, reset camera position to previous position
      // This prevents the camera from moving through walls
      camera.position.copy(camera.position);
  }
}

function checkCollision(newPosition) {
  const cameraBoundingBox = new THREE.Box3().setFromObject(camera);

  for (let i = 0; i < wallGroup.children.length; i++) {
      const wall = wallGroup.children[i];
      wall.geometry.computeBoundingBox(); // Update bounding box if needed
      const wallBoundingBox = wall.geometry.boundingBox.clone().translate(wall.position);

      if (cameraBoundingBox.intersectsBox(wallBoundingBox)) {
          console.log("Collision detected with wall:", wall);
          return true; // Collision detected
      }
  }
  return false; // No collision
}

// Initialize PointerLockControls
const controls = new PointerLockControls(camera, renderer.domElement);
scene.add(controls.getObject());

// Event listener to toggle pointer lock on click
document.addEventListener('click', function () {
    controls.lock();
});

// Event listener to update controls when mouse moves
document.addEventListener('mousemove', function (event) {
    if (controls.isLocked) {
        const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
        controls.moveRight(-movementX * 0.002);
        controls.moveUp(movementY * 0.002);
    }
});

// Event listener to exit pointer lock on Escape key press
document.addEventListener('keydown', function (event) {
    if (event.code === 'Escape') {
        controls.unlock();
    }
});

// Optional: Event listener to reset pointer lock on window blur
window.addEventListener('blur', function () {
    controls.unlock();
});

scene.background = new THREE.Color(0xffffff)


scene.background = new THREE.Color(0xffffff);

const backButton = document.createElement('button');
backButton.textContent = 'Back';
backButton.style.position = 'absolute';
backButton.style.top = '20px';
backButton.style.left = '20px';
document.body.appendChild(backButton);

// Event listener for back button click
backButton.addEventListener('click', function () {
    // Remove Three.js canvas from the DOM
    renderer.domElement.remove();

    // Remove back button from the DOM
    backButton.remove();

    // Show the menu
    const menu = document.getElementById('menu');
    menu.style.display = 'block';
});


// Your rendering loop
function renderLoop() {
    renderer.render(scene, camera);
    requestAnimationFrame(renderLoop);
}

renderLoop();
}
// Function to handle button click event
function handleButtonClick() {
  const playButton = document.getElementById('play_button');
  playButton.addEventListener('click', function () {
      // Call the function to initialize the Three.js scene
      initThreeScene();

      // Hide the menu
      const menu = document.getElementById('menu');
      menu.style.display = 'none';
  });
}

// Function to set up event listeners
function setupEventListeners() {
  // Call function to handle button click
  handleButtonClick();
}

// Call function to set up event listeners
setupEventListeners();