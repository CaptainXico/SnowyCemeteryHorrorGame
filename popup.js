document.addEventListener("DOMContentLoaded", function () {

  setTimeout(() => {

    const scene = document.querySelector("a-scene");
    const camera = document.querySelector("[camera]");

    if (!scene || !camera) {
      console.error("❌ Cena ou câmera não encontrada.");
      return;
    }

    console.log("Criando monstro...");

    // Update camera world matrix
    camera.object3D.updateMatrixWorld(true);

    // Camera world position
    const cameraPos = new THREE.Vector3();
    camera.object3D.getWorldPosition(cameraPos);

    // Camera forward direction
    const forward = new THREE.Vector3();
    camera.object3D.getWorldDirection(forward);

    // Invert so it's in front
    forward.multiplyScalar(-1);

    // Remove vertical tilt
    forward.y = 0;
    forward.normalize();

    const distance = 3;

    const santaPos = {
      x: cameraPos.x + forward.x * distance,
      y: 0,
      z: cameraPos.z + forward.z * distance
    };

    console.log("📍 rat position:", santaPos);

    // ✅ CONTAINER (controls position and facing)
    const santaContainer = document.createElement("a-entity");

    santaContainer.setAttribute("position",
      `${santaPos.x} ${santaPos.y} ${santaPos.z}`);

    santaContainer.setAttribute("id", "santa-popup");

    scene.appendChild(santaContainer);

    // ✅ MODEL (controls only model orientation)
    const santaModel = document.createElement("a-entity");

    santaModel.setAttribute("gltf-model", "#rat");

    santaModel.setAttribute("scale", "0.1 0.1 0.1");

    // 🔥 THIS fixes belly-up problem
    // Try this first:
    santaModel.setAttribute("rotation", "0 0 0");

    santaContainer.appendChild(santaModel);

    // Make container face camera (only Y axis)
    const dx = cameraPos.x - santaPos.x;
    const dz = cameraPos.z - santaPos.z;

    const angleY = Math.atan2(dx, dz) * (180 / Math.PI);

    santaContainer.setAttribute("rotation", `0 ${angleY} 0`);

    console.log("✅ monstro aparece corretamente!");

  }, 20000);

});
