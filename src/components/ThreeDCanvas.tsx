import { useEffect } from "react";
import * as THREE from "three";

export default function ThreeDCanvas() {
  useEffect(() => {
    const container = document.getElementById("three-container");
    if (!container) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Glow Grid (homelab vibes)
    const gridHelper = new THREE.GridHelper(40, 40, 0x00ffcc, 0x003333);
    gridHelper.position.y = -2;
    scene.add(gridHelper);

    // Floating Crystal (WoW arcane vibes)
    const crystalGeo = new THREE.OctahedronGeometry(1, 0);
    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0x9370db, // ungu arcane
      emissive: 0x4b0082, // glow
      metalness: 0.8,
      roughness: 0.2,
    });
    const crystal = new THREE.Mesh(crystalGeo, crystalMat);
    scene.add(crystal);

    // Floating Rune Ring (WoW theme)
    const torusGeo = new THREE.TorusGeometry(2.5, 0.1, 16, 100);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0xffd700, // emas
      emissive: 0x8b7500,
      emissiveIntensity: 0.5,
      metalness: 1,
      roughness: 0.3,
    });
    const runeRing = new THREE.Mesh(torusGeo, torusMat);
    scene.add(runeRing);

    // Lights
    const pointLight = new THREE.PointLight(0x00ffff, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    camera.position.z = 6;

    // Animate
    function animate() {
      requestAnimationFrame(animate);

      crystal.rotation.x += 0.01;
      crystal.rotation.y += 0.015;

      runeRing.rotation.x += 0.005;
      runeRing.rotation.z += 0.01;

      renderer.render(scene, camera);
    }
    animate();

    // Resize
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    return () => {
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div id="three-container" className="absolute inset-0 z-0"></div>;
}
