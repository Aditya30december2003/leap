"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function SubtleBg3D() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current!;
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8);

    // Soft lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    const point = new THREE.PointLight(0xffffff, 0.5, 30);
    point.position.set(2, 3, 5);
    scene.add(ambient, point);

    const group = new THREE.Group();
    scene.add(group);

    // Main ring - only parts visible during rotation
    const ringGeo = new THREE.TorusGeometry(3.5, 0.05, 12, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xffffff),
      wireframe: true,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.set(0.8, 0, 0); // Start tilted to hide part
    group.add(ring);

    // Secondary ring
    const ring2Geo = new THREE.TorusGeometry(4.8, 0.03, 8, 80);
    const ring2Mat = ringMat.clone();
    ring2Mat.opacity = 0.25;
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.set(-0.5, 0.3, 0);
    group.add(ring2);

    // Minimal particles
    const particles = 150;
    const pGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particles * 3);
    
    for (let i = 0; i < particles; i++) {
      const r = 5 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.015,
      color: new THREE.Color(0xffffff),
      transparent: true,
      opacity: 0.2,
      depthWrite: false,
    });

    const points = new THREE.Points(pGeo, pMat);
    group.add(points);

    // Resize handler
    const onResize = () => {
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    // Animation - Earth-like rotation revealing parts
    let raf = 0;
    const tick = () => {
      const time = Date.now() * 0.001;
      
      // Earth-like rotation - only parts become visible as it rotates
      ring.rotation.y += 0.002;
      ring.rotation.x = 0.8 + Math.sin(time * 0.3) * 0.1; // Subtle wobble
      
      ring2.rotation.y -= 0.0015;
      ring2.rotation.x = -0.5 + Math.cos(time * 0.2) * 0.08;

      // Points slowly rotate
      points.rotation.y += 0.0003;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    // Cleanup
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none"
      style={{ 
        mixBlendMode: "overlay",
        opacity: 0.8
      }}
    />
  );
}