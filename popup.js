// popup.js

document.addEventListener("DOMContentLoaded", function () {

  const popupDelay = 15000; // ⏳ change this to increase delay (ms)

  setTimeout(() => {

    const scene = document.querySelector("a-scene");
    const camera = document.querySelector("[camera]");

    if (!scene || !camera) {
      console.error("❌ Scene or camera not found.");
      return;
    }

    console.log("👁️ Criando monstro...");

    // Update world matrix
    camera.object3D.updateMatrixWorld(true);

    // Get camera world position
    const cameraPos = new THREE.Vector3();
    camera.object3D.getWorldPosition(cameraPos);

    // Get forward direction
    const forward = new THREE.Vector3();
    camera.object3D.getWorldDirection(forward);

    // Invert (A-Frame forward correction)
    forward.multiplyScalar(-1);

    // Remove vertical tilt
    forward.y = 0;
    forward.normalize();

    const distance = 2.5;

    const ratPos = {
      x: cameraPos.x + forward.x * distance,
      y: 0,
      z: cameraPos.z + forward.z * distance
    };

    console.log("📍 rat position:", ratPos);

    // =========================
    // CONTAINER (controls facing)
    // =========================

    const ratContainer = document.createElement("a-entity");

    ratContainer.setAttribute("position",
      `${ratPos.x} ${ratPos.y} ${ratPos.z}`);

    ratContainer.setAttribute("id", "rat-popup");

    scene.appendChild(ratContainer);

    // =========================
    // MODEL (controls model orientation)
    // =========================

    const ratModel = document.createElement("a-entity");

    ratModel.setAttribute("gltf-model", "#rat");
    ratModel.setAttribute("scale", "0.1 0.1 0.1");

    // ✅ You said correct orientation was 0 0 0
    ratModel.setAttribute("rotation", "0 0 0");

    ratContainer.appendChild(ratModel);

    // =========================
    // Face player (Y only)
    // =========================

    const dx = cameraPos.x - ratPos.x;
    const dz = cameraPos.z - ratPos.z;

    const angleY = Math.atan2(dx, dz) * (180 / Math.PI);

    ratContainer.setAttribute("rotation", `0 ${angleY} 0`);

    console.log("✅ monstro aparece corretamente!");

    // =========================
    // 🔊 JUMPSCARE
    // =========================

    setTimeout(() => {

      const jumpscareAudio = document.querySelector("#jumpscare-audio");

      if (!jumpscareAudio || !jumpscareAudio.components.sound) {
        console.warn("⚠️ Jumpscare audio not found.");
        return;
      }

      const soundComponent = jumpscareAudio.components.sound;

      // If already loaded → play
      if (soundComponent.loaded) {

        soundComponent.playSound();
        console.log("🔊 Jumpscare played");

      } else {

        // Wait until loaded
        jumpscareAudio.addEventListener("sound-loaded", () => {

          soundComponent.playSound();
          console.log("🔊 Jumpscare played (after load)");

        }, { once: true });

      }

    }, 300); // small delay ensures audio context + loading ready

  }, popupDelay);

});
