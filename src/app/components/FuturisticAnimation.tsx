"use client"
import { useEffect, useRef } from "react"
import * as THREE from "three"

export function FuturisticAnimation() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current!
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    mount.appendChild(renderer.domElement)

    // Lights
    const light = new THREE.PointLight(0x8b5cf6, 2, 50)
    light.position.set(5, 5, 5)
    scene.add(light)

    // Torus Rings
    const geometry = new THREE.TorusGeometry(2, 0.05, 16, 100)
    const material = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x8b5cf6,
      emissiveIntensity: 0.6,
    })

    const rings: THREE.Mesh[] = []
    for (let i = 0; i < 4; i++) {
      const ring = new THREE.Mesh(geometry, material)
      ring.rotation.x = i * 0.4
      ring.rotation.y = i * 0.2
      scene.add(ring)
      rings.push(ring)
    }

    // Camera
    camera.position.z = 6

    // Animation Loop
    const animate = () => {
      rings.forEach((ring, idx) => {
        ring.rotation.x += 0.002 + idx * 0.001
        ring.rotation.y += 0.003 + idx * 0.001
      })
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      renderer.setSize(mount.clientWidth, mount.clientHeight)
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="w-full h-[400px] lg:h-[500px]" />
}
