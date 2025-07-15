"use client"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { Mail, Database, Webhook, Filter, Send } from "lucide-react"
import { AiOutlineOpenAI } from "react-icons/ai";

// Custom ChatGPT Icon Component (removed dependency on react-icons)......;nklmkm
const ChatGPTIcon = () => (
  <AiOutlineOpenAI size={25}/>
)

// Custom WhatsApp Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
  </svg>
)

export function WorkflowAnimation() {
  const mountRef = useRef<HTMLDivElement>(null)
  const animationIdRef = useRef<number | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const isInitializedRef = useRef(false)
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 })
  const [isMobile, setIsMobile] = useState(false)

  // Track screen size changes with debouncing
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const updateScreenSize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        if (mountRef.current) {
          const rect = mountRef.current.getBoundingClientRect()
          setScreenSize({ width: rect.width, height: rect.height })
          setIsMobile(rect.width < 768)
        }
      }, 100) // Debounce to prevent too frequent updates
    }

    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', updateScreenSize)
    }
  }, [])

  useEffect(() => {
    if (!mountRef.current || screenSize.width === 0 || isInitializedRef.current) return

    // Set initialization flag
    isInitializedRef.current = true

    // Three.js background animation setup
    const scene = new THREE.Scene()
    sceneRef.current = scene
    
    const camera = new THREE.PerspectiveCamera(75, screenSize.width / screenSize.height, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    rendererRef.current = renderer

    renderer.setSize(screenSize.width, screenSize.height)
    renderer.setClearColor(0x000000, 0)

    // Create background canvas container
    const bgContainer = document.createElement("div")
    bgContainer.style.position = "absolute"
    bgContainer.style.top = "0"
    bgContainer.style.left = "0"
    bgContainer.style.width = "100%"
    bgContainer.style.height = "100%"
    bgContainer.style.zIndex = "1"
    bgContainer.style.pointerEvents = "none"
    
    bgContainer.appendChild(renderer.domElement)
    renderer.domElement.style.position = "absolute"
    renderer.domElement.style.zIndex = "2"

    // Only add to DOM if mount exists
    if (mountRef.current) {
      mountRef.current.appendChild(bgContainer)
    }

    // Create floating particles for background
    const particleGeometry = new THREE.BufferGeometry()
    const particleCount = isMobile ? 50 : 100
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20
      positions[i + 1] = (Math.random() - 0.5) * 20
      positions[i + 2] = (Math.random() - 0.5) * 20

      velocities[i] = (Math.random() - 0.5) * 0.008
      velocities[i + 1] = (Math.random() - 0.5) * 0.008
      velocities[i + 2] = (Math.random() - 0.5) * 0.008
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xff2222,
      size: 0.02,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    })

    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    camera.position.z = 13

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let time = 0
    const animate = () => {
      time += 0.003 //made

      // Animate background particles
      const positions = particles.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] += velocities[i]
        positions[i + 1] += velocities[i + 1]
        positions[i + 2] += velocities[i + 2]

        // Wrap around
        if (Math.abs(positions[i]) > 10) velocities[i] *= -1
        if (Math.abs(positions[i + 1]) > 10) velocities[i + 1] *= -1
        if (Math.abs(positions[i + 2]) > 10) velocities[i + 2] *= -1
      }
      particles.geometry.attributes.position.needsUpdate = true

      // Rotate particles
      particles.rotation.y += 0.0003
      particles.rotation.x += 0.0002

      renderer.render(scene, camera)
      animationIdRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      // Cleanup Three.js resources
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
        animationIdRef.current = null
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose()
        rendererRef.current = null
      }
      
      if (sceneRef.current) {
        sceneRef.current.clear()
        sceneRef.current = null
      }
      
      // Reset initialization flag
      isInitializedRef.current = false
      
      // Clean up DOM elements safely
      if (mountRef.current && bgContainer && mountRef.current.contains(bgContainer)) {
        mountRef.current.removeChild(bgContainer)
      }
    }
  }, [screenSize, isMobile])

  // Handle renderer resize separately
  useEffect(() => {
    if (rendererRef.current && screenSize.width > 0 && screenSize.height > 0) {
      rendererRef.current.setSize(screenSize.width, screenSize.height)
    }
  }, [screenSize])

  const getIcon = (iconName: string) => {
    const iconSize = isMobile ? "w-4 h-4" : "w-6 h-6"
    const iconMap = {
      webhook: () => <Webhook className={iconSize} />,
      filter: () => <Filter className={iconSize} />,
      chatgpt: () => <ChatGPTIcon className={iconSize} />,
      database: () => <Database className={iconSize} />,
      mail: () => <Mail className={iconSize} />,
      whatsapp: () => <WhatsAppIcon className={iconSize} />,
      send: () => <Send className={iconSize} />,
    }
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || iconMap.webhook
    return IconComponent()
  }

  // Responsive node configurations
  const getNodeConfig = () => {
    if (screenSize.width < 640) {
      // Mobile layout - compact 2-column grid
      return {
        nodeWidth: 65,
        nodeHeight: 45,
        nodes: [
          { id: "webhook", position: { x: 20, y: 80 }, type: "trigger" as const, label: "Webhook", icon: "webhook", color: "#ef4444", description: "Incoming request" },
          { id: "filter", position: { x: 120, y: 80 }, type: "condition" as const, label: "Filter", icon: "filter", color: "#f59e0b", description: "Data validation" },
          { id: "chatgpt", position: { x: 220, y: 80 }, type: "action" as const, label: "ChatGPT", icon: "chatgpt", color: "#10b981", description: "AI Processing" },
          { id: "database", position: { x: 70, y: 150 }, type: "action" as const, label: "Database", icon: "database", color: "#3b82f6", description: "Store data" },
          { id: "email", position: { x: 170, y: 150 }, type: "action" as const, label: "Email", icon: "mail", color: "#8b5cf6", description: "Send notification" },
          { id: "response", position: { x: 120, y: 220 }, type: "output" as const, label: "Response", icon: "send", color: "#84cc16", description: "Final output" },
        ],
        connections: [
          { from: "webhook", to: "filter" },
          { from: "filter", to: "chatgpt" },
          { from: "filter", to: "database" },
          { from: "filter", to: "email" },
          { from: "database", to: "response" },
          { from: "email", to: "response" },
        ]
      }
    } else if (screenSize.width < 768) {
      // Tablet layout - compact
      return {
        nodeWidth: 100,
        nodeHeight: 55,
        nodes: [
          { id: "webhook", position: { x: 40, y: 140 }, type: "trigger" as const, label: "Webhook", icon: "webhook", color: "#ef4444", description: "Incoming request" },
          { id: "filter", position: { x: 170, y: 140 }, type: "condition" as const, label: "Filter", icon: "filter", color: "#f59e0b", description: "Data validation" },
          { id: "chatgpt", position: { x: 300, y: 80 }, type: "action" as const, label: "ChatGPT", icon: "chatgpt", color: "#10b981", description: "AI Processing" },
          { id: "database", position: { x: 300, y: 140 }, type: "action" as const, label: "Database", icon: "database", color: "#3b82f6", description: "Store data" },
          { id: "response", position: { x: 300, y: 200 }, type: "output" as const, label: "Response", icon: "send", color: "#84cc16", description: "Final output" },
        ],
        connections: [
          { from: "webhook", to: "filter" },
          { from: "filter", to: "chatgpt" },
          { from: "filter", to: "database" },
          { from: "database", to: "response" },
        ]
      }
    } else {
      // Desktop layout - original
      return {
        nodeWidth: 120,
        nodeHeight: 60,
        nodes: [
          { id: "webhook", position: { x: 80, y: 200 }, type: "trigger" as const, label: "Webhook", icon: "webhook", color: "#ef4444", description: "Incoming request" },
          { id: "filter", position: { x: 240, y: 200 }, type: "condition" as const, label: "Filter", icon: "filter", color: "#f59e0b", description: "Data validation" },
          { id: "chatgpt", position: { x: 400, y: 120 }, type: "action" as const, label: "ChatGPT", icon: "chatgpt", color: "#10b981", description: "AI Processing" },
          { id: "database", position: { x: 400, y: 200 }, type: "action" as const, label: "Database", icon: "database", color: "#3b82f6", description: "Store data" },
          { id: "email", position: { x: 400, y: 280 }, type: "action" as const, label: "Email", icon: "mail", color: "#8b5cf6", description: "Send notification" },
          { id: "whatsapp", position: { x: 560, y: 160 }, type: "action" as const, label: "WhatsApp", icon: "whatsapp", color: "#25d366", description: "Send message" },
          { id: "response", position: { x: 560, y: 240 }, type: "output" as const, label: "Response", icon: "send", color: "#84cc16", description: "Final output" },
        ],
        connections: [
          { from: "webhook", to: "filter" },
          { from: "filter", to: "chatgpt" },
          { from: "filter", to: "database" },
          { from: "filter", to: "email" },
          { from: "chatgpt", to: "whatsapp" },
          { from: "database", to: "response" },
          { from: "email", to: "response" },
        ]
      }
    }
  }

  const { nodeWidth, nodeHeight, nodes, connections } = getNodeConfig()

  return (
    <div ref={mountRef} className="w-full h-full relative overflow-hidden">
      {/* Workflow Canvas */}
      <div className="absolute inset-0 z-10 p-2 sm:p-4">
        <svg className="w-full h-full">
          {/* Connection lines with proper node connections */}
          {connections.map((conn, index) => {
            const fromNode = nodes.find((n) => n.id === conn.from)
            const toNode = nodes.find((n) => n.id === conn.to)
            if (!fromNode || !toNode) return null

            const startX = fromNode.position.x + nodeWidth
            const startY = fromNode.position.y + nodeHeight / 2
            const endX = toNode.position.x
            const endY = toNode.position.y + nodeHeight / 2

            // Create curved path - adjust control points based on screen size
            const controlOffset = isMobile ? 20 : 40
            const controlX1 = startX + controlOffset
            const controlX2 = endX - controlOffset

            return (
              <g key={index}>
                <defs>
                  <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#ff6666" stopOpacity="0.4" />
                  </linearGradient>
                </defs>

                <path
                  d={`M ${startX} ${startY} C ${controlX1} ${startY}, ${controlX2} ${endY}, ${endX} ${endY}`}
                  stroke={`url(#gradient-${index})`}
                  strokeWidth={isMobile ? "1.5" : "2"}
                  fill="none"
                  className="drop-shadow-sm"
                />

                {/* Animated flowing particle - smaller on mobile */}
                <circle r={isMobile ? "2" : "4"} fill="#ff4444" opacity="0.9" className="drop-shadow-lg">
                  <animateMotion
                    dur={`${2.5 + Math.random() * 1.5}s`}
                    repeatCount="indefinite"
                    path={`M ${startX} ${startY} C ${controlX1} ${startY}, ${controlX2} ${endY}, ${endX} ${endY}`}
                  />
                  <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
                </circle>
              </g>
            )
          })}
        </svg>

        {/* Workflow Nodes - responsive sizing */}
        {nodes.map((node) => (
          <div
            key={node.id}
            className="absolute group cursor-pointer"
            style={{
              left: node.position.x,
              top: node.position.y,
              width: `${nodeWidth}px`,
              height: `${nodeHeight}px`,
            }}
          >
            {/* Node container */}
            <div className="relative w-full h-full">
              {/* Glow effect */}
              <div
                className="absolute inset-0 rounded-xl blur-md opacity-20 group-hover:opacity-40 transition-all duration-300"
                style={{ backgroundColor: node.color }}
              />

              {/* Main node */}
              <div
                className="relative bg-gray-900/95 border-2 rounded-xl p-2 sm:p-3 w-full h-full flex flex-col items-center justify-center hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                style={{ borderColor: node.color }}
              >
                {/* Icon */}
                <div className="flex justify-center mb-1" style={{ color: node.color }}>
                  {getIcon(node.icon)}
                </div>

                {/* Label */}
                <div className={`text-white font-semibold text-center leading-tight ${isMobile ? 'text-xs' : 'text-xs'}`}>
                  {node.label}
                </div>

                {/* Status indicator */}
                <div
                  className={`absolute -top-1 -right-1 rounded-full animate-pulse border border-gray-900 ${isMobile ? 'w-2 h-2' : 'w-3 h-3'}`}
                  style={{ backgroundColor: node.color }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Overlay UI - responsive */}
      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-20">
        <div className="bg-red-900/40 border border-red-500/50 rounded-lg px-2 sm:px-3 py-1 sm:py-2 text-red-400 text-xs backdrop-blur-md">
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="hidden sm:inline">Live Workflow • {nodes.length} nodes</span>
            <span className="sm:hidden">Live • {nodes.length}</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 z-20">
        <div className="bg-black/60 border border-gray-600 rounded-lg px-2 sm:px-3 py-1 sm:py-2 backdrop-blur-md">
          <div className="flex items-center gap-1 sm:gap-2 text-xs text-gray-300">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Active</span>
            </div>
            <div className="text-gray-500">|</div>
            <span className="text-green-400 font-mono text-xs">1.2k/min</span>
          </div>
        </div>
      </div>

      {/* Subtle grid background - responsive */}
      <div className="absolute inset-0 opacity-3 z-0">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
            linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: isMobile ? "20px 20px" : "30px 30px",
          }}
        />
      </div>
    </div>
  )
}