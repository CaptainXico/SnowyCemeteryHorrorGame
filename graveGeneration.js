// treeGeneration.js

document.addEventListener("DOMContentLoaded", function() {
  const scene = document.querySelector("a-scene");

  // Define the camera's initial position as the center
  const cameraPosition = { x: 0, y: 0, z: 0 };
  const radius = 45; // Radius around the camera to spread the entities
  const treeHeight = 1; // Set specific height for trees

  for (let i = 0; i < 20; i++) {
    const tree = document.createElement("a-entity");

    // Randomize positions within the defined radius around the camera's X and Z coordinates
    const angle = Math.random() * Math.PI * 2; // Random angle in radians
    const distance = Math.random() * radius;
    const x = cameraPosition.x + distance * Math.cos(angle);
    const z = cameraPosition.z + distance * Math.sin(angle);

    // Set tree model attributes with specific height
    tree.setAttribute("gltf-model", "#treemodel");
    tree.setAttribute("position", `${x} ${treeHeight} ${z}`);
    tree.setAttribute("scale", "2 2 2");

    scene.appendChild(tree);
  }
});
