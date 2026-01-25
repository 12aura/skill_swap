import * as THREE from "three";
import { useEffect } from "react";

const SkillSwap3D = ({ close }) => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    // MAIN CUBE
    const mainCube = new THREE.Mesh(
      new THREE.BoxGeometry(2, 2, 2),
      new THREE.MeshStandardMaterial({ color: 0x00f2fe })
    );
    scene.add(mainCube);

    // FEATURE CUBES
    const items = ["Browse", "Matches", "Profile", "Settings", "Logout"];
    const cubes = [];
    const radius = 4;

    items.forEach((item, i) => {
      const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 1.2, 1.2),
        new THREE.MeshStandardMaterial({ color: 0x4facfe })
      );

      const angle = (i / items.length) * Math.PI * 2;
      cube.position.set(Math.cos(angle)*radius, Math.sin(angle)*radius, 0);
      cube.visible = false;
      cube.userData = item;
      scene.add(cube);
      cubes.push(cube);
    });

    let expanded = false;

    // CLICK HANDLER
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onClick = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects([mainCube, ...cubes]);

      if (!intersects.length) return;
      const obj = intersects[0].object;

      if (obj === mainCube && !expanded) {
        cubes.forEach(c => c.visible = true);
        expanded = true;
      } 
      else if (obj.userData) {
        document.getElementById("bubble").classList.add("active");
        setTimeout(() => {
          window.location.href = `/${obj.userData.toLowerCase()}`;
        }, 700);
      }
    };

    window.addEventListener("click", onClick);

    // ANIMATION
    function animate() {
      requestAnimationFrame(animate);
      mainCube.rotation.y += 0.01;
      cubes.forEach(c => c.rotation.x += 0.01);
      renderer.render(scene, camera);
    }

    animate();

    return () => {
      window.removeEventListener("click", onClick);
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="fixed inset-0 z-50 bg-black/60" />;
};

export default SkillSwap3D;
