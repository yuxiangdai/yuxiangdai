import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import * as THREE from 'three'

const FluidCanvas = styled.canvas`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
`

// GPU implementation of Jos Stam's "Stable Fluids" solver:
// advect -> vorticity confinement -> pressure projection, ping-ponged
// between half-float render targets, with a separate high-res dye field.
const config = {
  SIM_RESOLUTION: 128,
  DYE_RESOLUTION: 768,
  DENSITY_DISSIPATION: 1.4,
  VELOCITY_DISSIPATION: 0.6,
  PRESSURE: 0.8,
  PRESSURE_ITERATIONS: 20,
  CURL: 24,
  SPLAT_RADIUS: 0.22,
  SPLAT_FORCE: 6000,
  AMBIENT_INTERVAL: [2.5, 5.5],
  IDLE_DELAY: 2,
}

const baseVertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const copyShader = /* glsl */ `
  uniform sampler2D uTexture;
  varying vec2 vUv;

  void main() {
    gl_FragColor = texture2D(uTexture, vUv);
  }
`

const clearShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform float uValue;
  varying vec2 vUv;

  void main() {
    gl_FragColor = uValue * texture2D(uTexture, vUv);
  }
`

const splatShader = /* glsl */ `
  uniform sampler2D uTarget;
  uniform float uAspectRatio;
  uniform vec3 uColor;
  uniform vec2 uPoint;
  uniform float uRadius;
  varying vec2 vUv;

  void main() {
    vec2 p = vUv - uPoint;
    p.x *= uAspectRatio;
    vec3 splat = exp(-dot(p, p) / uRadius) * uColor;
    vec3 base = texture2D(uTarget, vUv).xyz;
    gl_FragColor = vec4(base + splat, 1.0);
  }
`

const advectionShader = /* glsl */ `
  uniform sampler2D uVelocity;
  uniform sampler2D uSource;
  uniform vec2 uTexelSize;
  uniform float uDt;
  uniform float uDissipation;
  varying vec2 vUv;

  void main() {
    vec2 coord = vUv - uDt * texture2D(uVelocity, vUv).xy * uTexelSize;
    vec4 result = texture2D(uSource, coord);
    float decay = 1.0 + uDissipation * uDt;
    gl_FragColor = result / decay;
  }
`

const divergenceShader = /* glsl */ `
  uniform sampler2D uVelocity;
  uniform vec2 uTexelSize;
  varying vec2 vUv;

  void main() {
    float L = texture2D(uVelocity, vUv - vec2(uTexelSize.x, 0.0)).x;
    float R = texture2D(uVelocity, vUv + vec2(uTexelSize.x, 0.0)).x;
    float B = texture2D(uVelocity, vUv - vec2(0.0, uTexelSize.y)).y;
    float T = texture2D(uVelocity, vUv + vec2(0.0, uTexelSize.y)).y;
    vec2 C = texture2D(uVelocity, vUv).xy;

    if (vUv.x - uTexelSize.x < 0.0) { L = -C.x; }
    if (vUv.x + uTexelSize.x > 1.0) { R = -C.x; }
    if (vUv.y - uTexelSize.y < 0.0) { B = -C.y; }
    if (vUv.y + uTexelSize.y > 1.0) { T = -C.y; }

    float div = 0.5 * (R - L + T - B);
    gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
  }
`

const curlShader = /* glsl */ `
  uniform sampler2D uVelocity;
  uniform vec2 uTexelSize;
  varying vec2 vUv;

  void main() {
    float L = texture2D(uVelocity, vUv - vec2(uTexelSize.x, 0.0)).y;
    float R = texture2D(uVelocity, vUv + vec2(uTexelSize.x, 0.0)).y;
    float B = texture2D(uVelocity, vUv - vec2(0.0, uTexelSize.y)).x;
    float T = texture2D(uVelocity, vUv + vec2(0.0, uTexelSize.y)).x;
    float vorticity = R - L - T + B;
    gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
  }
`

const vorticityShader = /* glsl */ `
  uniform sampler2D uVelocity;
  uniform sampler2D uCurl;
  uniform vec2 uTexelSize;
  uniform float uCurlStrength;
  uniform float uDt;
  varying vec2 vUv;

  void main() {
    float L = texture2D(uCurl, vUv - vec2(uTexelSize.x, 0.0)).x;
    float R = texture2D(uCurl, vUv + vec2(uTexelSize.x, 0.0)).x;
    float B = texture2D(uCurl, vUv - vec2(0.0, uTexelSize.y)).x;
    float T = texture2D(uCurl, vUv + vec2(0.0, uTexelSize.y)).x;
    float C = texture2D(uCurl, vUv).x;

    vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
    force /= length(force) + 0.0001;
    force *= uCurlStrength * C;
    force.y *= -1.0;

    vec2 velocity = texture2D(uVelocity, vUv).xy;
    velocity += force * uDt;
    velocity = clamp(velocity, vec2(-1000.0), vec2(1000.0));
    gl_FragColor = vec4(velocity, 0.0, 1.0);
  }
`

const pressureShader = /* glsl */ `
  uniform sampler2D uPressure;
  uniform sampler2D uDivergence;
  uniform vec2 uTexelSize;
  varying vec2 vUv;

  void main() {
    float L = texture2D(uPressure, vUv - vec2(uTexelSize.x, 0.0)).x;
    float R = texture2D(uPressure, vUv + vec2(uTexelSize.x, 0.0)).x;
    float B = texture2D(uPressure, vUv - vec2(0.0, uTexelSize.y)).x;
    float T = texture2D(uPressure, vUv + vec2(0.0, uTexelSize.y)).x;
    float divergence = texture2D(uDivergence, vUv).x;
    float pressure = (L + R + B + T - divergence) * 0.25;
    gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
  }
`

const gradientSubtractShader = /* glsl */ `
  uniform sampler2D uPressure;
  uniform sampler2D uVelocity;
  uniform vec2 uTexelSize;
  varying vec2 vUv;

  void main() {
    float L = texture2D(uPressure, vUv - vec2(uTexelSize.x, 0.0)).x;
    float R = texture2D(uPressure, vUv + vec2(uTexelSize.x, 0.0)).x;
    float B = texture2D(uPressure, vUv - vec2(0.0, uTexelSize.y)).x;
    float T = texture2D(uPressure, vUv + vec2(0.0, uTexelSize.y)).x;
    vec2 velocity = texture2D(uVelocity, vUv).xy;
    velocity.xy -= vec2(R - L, T - B);
    gl_FragColor = vec4(velocity, 0.0, 1.0);
  }
`

const displayShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform vec2 uTexelSize;
  varying vec2 vUv;

  void main() {
    vec3 c = texture2D(uTexture, vUv).rgb;

    vec3 lc = texture2D(uTexture, vUv - vec2(uTexelSize.x, 0.0)).rgb;
    vec3 rc = texture2D(uTexture, vUv + vec2(uTexelSize.x, 0.0)).rgb;
    vec3 bc = texture2D(uTexture, vUv - vec2(0.0, uTexelSize.y)).rgb;
    vec3 tc = texture2D(uTexture, vUv + vec2(0.0, uTexelSize.y)).rgb;

    float dx = length(rc) - length(lc);
    float dy = length(tc) - length(bc);
    vec3 n = normalize(vec3(dx, dy, length(uTexelSize)));
    float diffuse = clamp(dot(n, vec3(0.0, 0.0, 1.0)) + 0.7, 0.7, 1.0);
    c *= diffuse;

    float a = max(c.r, max(c.g, c.b));
    gl_FragColor = vec4(c, a);
  }
`

function hsvToRgb(h, s, v) {
  const i = Math.floor(h * 6)
  const f = h * 6 - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)
  switch (i % 6) {
    case 0:
      return { r: v, g: t, b: p }
    case 1:
      return { r: q, g: v, b: p }
    case 2:
      return { r: p, g: v, b: t }
    case 3:
      return { r: p, g: q, b: v }
    case 4:
      return { r: t, g: p, b: v }
    default:
      return { r: v, g: p, b: q }
  }
}

function createFluidSimulation(canvas) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: 'high-performance',
  })
  renderer.autoClear = false
  renderer.setClearColor(0x000000, 0)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
  renderer.setSize(window.innerWidth, window.innerHeight, false)

  const camera = new THREE.Camera()
  const geometry = new THREE.PlaneGeometry(2, 2)
  const mesh = new THREE.Mesh(geometry)
  mesh.frustumCulled = false
  const scene = new THREE.Scene()
  scene.add(mesh)

  const makeMaterial = (fragmentShader, uniforms) =>
    new THREE.ShaderMaterial({
      uniforms,
      vertexShader: baseVertexShader,
      fragmentShader,
      depthTest: false,
      depthWrite: false,
      blending: THREE.NoBlending,
    })

  const materials = {
    copy: makeMaterial(copyShader, {
      uTexture: { value: null },
    }),
    clear: makeMaterial(clearShader, {
      uTexture: { value: null },
      uValue: { value: config.PRESSURE },
    }),
    splat: makeMaterial(splatShader, {
      uTarget: { value: null },
      uAspectRatio: { value: 1 },
      uColor: { value: new THREE.Vector3() },
      uPoint: { value: new THREE.Vector2() },
      uRadius: { value: 1 },
    }),
    advection: makeMaterial(advectionShader, {
      uVelocity: { value: null },
      uSource: { value: null },
      uTexelSize: { value: new THREE.Vector2() },
      uDt: { value: 0 },
      uDissipation: { value: 0 },
    }),
    divergence: makeMaterial(divergenceShader, {
      uVelocity: { value: null },
      uTexelSize: { value: new THREE.Vector2() },
    }),
    curl: makeMaterial(curlShader, {
      uVelocity: { value: null },
      uTexelSize: { value: new THREE.Vector2() },
    }),
    vorticity: makeMaterial(vorticityShader, {
      uVelocity: { value: null },
      uCurl: { value: null },
      uTexelSize: { value: new THREE.Vector2() },
      uCurlStrength: { value: config.CURL },
      uDt: { value: 0 },
    }),
    pressure: makeMaterial(pressureShader, {
      uPressure: { value: null },
      uDivergence: { value: null },
      uTexelSize: { value: new THREE.Vector2() },
    }),
    gradientSubtract: makeMaterial(gradientSubtractShader, {
      uPressure: { value: null },
      uVelocity: { value: null },
      uTexelSize: { value: new THREE.Vector2() },
    }),
    display: makeMaterial(displayShader, {
      uTexture: { value: null },
      uTexelSize: { value: new THREE.Vector2() },
    }),
  }

  const blit = (material, target) => {
    mesh.material = material
    renderer.setRenderTarget(target)
    renderer.render(scene, camera)
  }

  const createFBO = ({ width, height }) => {
    const target = new THREE.WebGLRenderTarget(width, height, {
      type: THREE.HalfFloatType,
      format: THREE.RGBAFormat,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
      depthBuffer: false,
      generateMipmaps: false,
    })
    renderer.setRenderTarget(target)
    renderer.clear(true, false, false)
    return target
  }

  const createDoubleFBO = (resolution) => {
    let read = createFBO(resolution)
    let write = createFBO(resolution)
    return {
      texelSize: new THREE.Vector2(1 / resolution.width, 1 / resolution.height),
      get read() {
        return read
      },
      get write() {
        return write
      },
      swap() {
        const tmp = read
        read = write
        write = tmp
      },
      dispose() {
        read.dispose()
        write.dispose()
      },
    }
  }

  const getResolution = (base) => {
    let aspect = canvas.width / canvas.height
    if (aspect < 1) aspect = 1 / aspect
    const min = Math.round(base)
    const max = Math.round(base * aspect)
    return canvas.width > canvas.height
      ? { width: max, height: min }
      : { width: min, height: max }
  }

  let velocity = createDoubleFBO(getResolution(config.SIM_RESOLUTION))
  let dye = createDoubleFBO(getResolution(config.DYE_RESOLUTION))
  let pressure = createDoubleFBO(getResolution(config.SIM_RESOLUTION))
  let divergence = createFBO(getResolution(config.SIM_RESOLUTION))
  let curl = createFBO(getResolution(config.SIM_RESOLUTION))

  const correctRadius = (radius) => {
    const aspect = canvas.width / canvas.height
    return aspect > 1 ? radius * aspect : radius
  }

  const splat = (x, y, dx, dy, color) => {
    const { uniforms } = materials.splat
    uniforms.uAspectRatio.value = canvas.width / canvas.height
    uniforms.uPoint.value.set(x, y)
    uniforms.uRadius.value = correctRadius(config.SPLAT_RADIUS / 100)

    uniforms.uTarget.value = velocity.read.texture
    uniforms.uColor.value.set(dx, dy, 0)
    blit(materials.splat, velocity.write)
    velocity.swap()

    uniforms.uTarget.value = dye.read.texture
    uniforms.uColor.value.set(color.r, color.g, color.b)
    blit(materials.splat, dye.write)
    dye.swap()
  }

  const step = (dt) => {
    materials.curl.uniforms.uVelocity.value = velocity.read.texture
    materials.curl.uniforms.uTexelSize.value.copy(velocity.texelSize)
    blit(materials.curl, curl)

    materials.vorticity.uniforms.uVelocity.value = velocity.read.texture
    materials.vorticity.uniforms.uCurl.value = curl.texture
    materials.vorticity.uniforms.uTexelSize.value.copy(velocity.texelSize)
    materials.vorticity.uniforms.uDt.value = dt
    blit(materials.vorticity, velocity.write)
    velocity.swap()

    materials.divergence.uniforms.uVelocity.value = velocity.read.texture
    materials.divergence.uniforms.uTexelSize.value.copy(velocity.texelSize)
    blit(materials.divergence, divergence)

    materials.clear.uniforms.uTexture.value = pressure.read.texture
    blit(materials.clear, pressure.write)
    pressure.swap()

    materials.pressure.uniforms.uDivergence.value = divergence.texture
    materials.pressure.uniforms.uTexelSize.value.copy(velocity.texelSize)
    for (let i = 0; i < config.PRESSURE_ITERATIONS; i += 1) {
      materials.pressure.uniforms.uPressure.value = pressure.read.texture
      blit(materials.pressure, pressure.write)
      pressure.swap()
    }

    materials.gradientSubtract.uniforms.uPressure.value = pressure.read.texture
    materials.gradientSubtract.uniforms.uVelocity.value = velocity.read.texture
    materials.gradientSubtract.uniforms.uTexelSize.value.copy(
      velocity.texelSize
    )
    blit(materials.gradientSubtract, velocity.write)
    velocity.swap()

    materials.advection.uniforms.uTexelSize.value.copy(velocity.texelSize)
    materials.advection.uniforms.uDt.value = dt
    materials.advection.uniforms.uVelocity.value = velocity.read.texture
    materials.advection.uniforms.uSource.value = velocity.read.texture
    materials.advection.uniforms.uDissipation.value =
      config.VELOCITY_DISSIPATION
    blit(materials.advection, velocity.write)
    velocity.swap()

    materials.advection.uniforms.uVelocity.value = velocity.read.texture
    materials.advection.uniforms.uSource.value = dye.read.texture
    materials.advection.uniforms.uDissipation.value = config.DENSITY_DISSIPATION
    blit(materials.advection, dye.write)
    dye.swap()
  }

  const render = () => {
    materials.display.uniforms.uTexture.value = dye.read.texture
    materials.display.uniforms.uTexelSize.value.copy(dye.texelSize)
    renderer.setRenderTarget(null)
    renderer.clear(true, false, false)
    mesh.material = materials.display
    renderer.render(scene, camera)
  }

  let hue = Math.random()
  const strokeColor = (intensity) => {
    const { r, g, b } = hsvToRgb(hue % 1, 0.85, 1)
    return { r: r * intensity, g: g * intensity, b: b * intensity }
  }

  const pointer = {
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    moved: false,
    down: false,
    initialized: false,
  }
  let lastInteraction = -Infinity
  let elapsed = 0
  let ambientCountdown = 1.2

  const randomBetween = (a, b) => a + Math.random() * (b - a)

  const ambientSplat = () => {
    const angle = Math.random() * Math.PI * 2
    const force = randomBetween(600, 1400)
    splat(
      randomBetween(0.15, 0.85),
      randomBetween(0.2, 0.9),
      Math.cos(angle) * force,
      Math.sin(angle) * force,
      strokeColor(0.12)
    )
  }

  const initialBurst = () => {
    const count = 6 + Math.floor(Math.random() * 4)
    for (let i = 0; i < count; i += 1) {
      hue = Math.random()
      ambientSplat()
    }
  }

  const onPointerMove = (event) => {
    const x = event.clientX / window.innerWidth
    const y = 1 - event.clientY / window.innerHeight
    if (!pointer.initialized) {
      pointer.x = x
      pointer.y = y
      pointer.initialized = true
      return
    }
    pointer.dx += (x - pointer.x) * config.SPLAT_FORCE
    pointer.dy += (y - pointer.y) * config.SPLAT_FORCE
    pointer.x = x
    pointer.y = y
    pointer.moved = true
  }

  const onPointerDown = (event) => {
    onPointerMove(event)
    const burst = strokeColor(0.5)
    splat(pointer.x, pointer.y, 0, 0, burst)
    lastInteraction = elapsed
  }

  const applyInputs = (dt) => {
    hue = (hue + dt * 0.08) % 1

    if (pointer.moved) {
      const dx = THREE.MathUtils.clamp(pointer.dx, -1500, 1500)
      const dy = THREE.MathUtils.clamp(pointer.dy, -1500, 1500)
      splat(pointer.x, pointer.y, dx, dy, strokeColor(0.16))
      pointer.dx = 0
      pointer.dy = 0
      pointer.moved = false
      lastInteraction = elapsed
    }

    ambientCountdown -= dt
    if (ambientCountdown <= 0) {
      ambientCountdown = randomBetween(...config.AMBIENT_INTERVAL)
      if (elapsed - lastInteraction > config.IDLE_DELAY) {
        hue = (hue + randomBetween(0.1, 0.4)) % 1
        ambientSplat()
      }
    }
  }

  const resize = () => {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    renderer.setSize(window.innerWidth, window.innerHeight, false)

    const resizeDoubleFBO = (fbo, resolution) => {
      const next = createDoubleFBO(resolution)
      materials.copy.uniforms.uTexture.value = fbo.read.texture
      blit(materials.copy, next.read)
      fbo.dispose()
      return next
    }

    velocity = resizeDoubleFBO(velocity, getResolution(config.SIM_RESOLUTION))
    dye = resizeDoubleFBO(dye, getResolution(config.DYE_RESOLUTION))
    pressure.dispose()
    divergence.dispose()
    curl.dispose()
    pressure = createDoubleFBO(getResolution(config.SIM_RESOLUTION))
    divergence = createFBO(getResolution(config.SIM_RESOLUTION))
    curl = createFBO(getResolution(config.SIM_RESOLUTION))
  }

  let resizeTimeout
  const onResize = () => {
    window.clearTimeout(resizeTimeout)
    resizeTimeout = window.setTimeout(resize, 200)
  }

  let rafId
  let lastTime = performance.now()
  const frame = (now) => {
    rafId = window.requestAnimationFrame(frame)
    const dt = Math.min((now - lastTime) / 1000, 1 / 30)
    lastTime = now
    elapsed += dt
    applyInputs(dt)
    step(dt)
    render()
  }

  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('pointerdown', onPointerDown, { passive: true })
  window.addEventListener('resize', onResize)

  initialBurst()
  rafId = window.requestAnimationFrame(frame)

  return () => {
    window.cancelAnimationFrame(rafId)
    window.clearTimeout(resizeTimeout)
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerdown', onPointerDown)
    window.removeEventListener('resize', onResize)
    velocity.dispose()
    dye.dispose()
    pressure.dispose()
    divergence.dispose()
    curl.dispose()
    Object.values(materials).forEach((material) => material.dispose())
    geometry.dispose()
    renderer.dispose()
  }
}

const FluidBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !canvasRef.current) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    try {
      return createFluidSimulation(canvasRef.current)
    } catch (error) {
      // WebGL unavailable; the page works fine without the effect.
      return undefined
    }
  }, [])

  return <FluidCanvas ref={canvasRef} aria-hidden="true" />
}

export default FluidBackground
