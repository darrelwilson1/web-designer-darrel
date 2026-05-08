'use client';

/* ============================================================
   HeroScene — Three.js, no postproc. A high-poly icosahedron
   with a custom ShaderMaterial:
     • vertex displacement from 3D simplex noise (animated)
     • mouse position warps the noise field
     • fragment uses fresnel rim + emissive red core
   Mouse also rotates the mesh subtly.
   ============================================================ */

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const VERT = /* glsl */ `
  uniform float uTime;
  uniform vec2  uMouse;
  varying vec3  vNormal;
  varying vec3  vViewDir;
  varying float vDisp;

  // -- 3D simplex noise (Ashima) --
  vec3 mod289(vec3 x){return x - floor(x * (1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x - floor(x * (1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute( permute( permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x  = x_ * ns.x + ns.yyyy;
    vec4 y  = y_ * ns.x + ns.yyyy;
    vec4 h  = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m*m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec3 pos = position;
    float t  = uTime * 0.45;
    vec3 mouseInfluence = vec3(uMouse * 1.6, 0.0);
    float n = snoise(pos * 1.4 + mouseInfluence + vec3(t));
    float n2 = snoise(pos * 3.2 - vec3(t * 0.6));
    float disp = n * 0.42 + n2 * 0.12;
    pos += normal * disp;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    vViewDir = normalize(-mv.xyz);
    vNormal  = normalize(normalMatrix * normal);
    vDisp    = disp;

    gl_Position = projectionMatrix * mv;
  }
`;

const FRAG = /* glsl */ `
  uniform float uTime;
  varying vec3  vNormal;
  varying vec3  vViewDir;
  varying float vDisp;

  void main() {
    float fres = pow(1.0 - clamp(dot(vNormal, vViewDir), 0.0, 1.0), 2.2);

    // Teal gradient palette
    vec3 deepTeal = vec3(0.02, 0.18, 0.24);   // ~#0A2E3D core
    vec3 midTeal  = vec3(0.04, 0.55, 0.62);   // ~#0A8C9E mid-rim
    vec3 hotTeal  = vec3(0.20, 0.96, 0.92);   // ~#33F5EB bright tip
    vec3 white    = vec3(1.0);

    float pulse = 0.5 + 0.5 * sin(uTime * 1.4);

    // Two-stop gradient: deep -> mid based on fresnel, then push
    // toward hot teal at the silhouette edge.
    vec3 base  = mix(deepTeal, midTeal, fres);
    base       = mix(base, hotTeal, smoothstep(0.55, 1.0, fres));
    base      += white * fres * fres * 0.55;
    base      += hotTeal * (vDisp * 1.2 + 0.12) * (0.55 + pulse * 0.4);

    float a = clamp(0.55 + fres * 0.6, 0.0, 1.0);
    gl_FragColor = vec4(base, a);
  }
`;

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const geo = new THREE.IcosahedronGeometry(1.25, 64);
    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // inner glow shell — a slightly larger transparent blob to bloom the rim
    const haloGeo = new THREE.IcosahedronGeometry(1.55, 32);
    const haloMat = new THREE.ShaderMaterial({
      vertexShader: /* glsl */ `
        varying vec3 vN; varying vec3 vV;
        void main(){
          vec4 mv = modelViewMatrix * vec4(position,1.0);
          vV = normalize(-mv.xyz);
          vN = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: /* glsl */ `
        varying vec3 vN; varying vec3 vV;
        void main(){
          float f = pow(1.0 - clamp(dot(vN,vV),0.0,1.0), 3.0);
          // Bright teal halo to match the main shader rim
          gl_FragColor = vec4(0.22, 0.95, 0.90, f * 0.55);
        }`,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.BackSide,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    scene.add(halo);

    // -- mouse + parallax --
    const mouse = new THREE.Vector2(0, 0);
    const target = new THREE.Vector2(0, 0);
    const onMove = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      target.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove);

    // -- resize --
    const resize = () => {
      const r = mount.getBoundingClientRect();
      const w = r.width;
      const h = r.height;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      const t = clock.getElapsedTime();
      mouse.lerp(target, 0.08);
      mat.uniforms.uTime.value = t;
      mat.uniforms.uMouse.value.copy(mouse);

      // gentle auto-rotate plus mouse-driven tilt
      mesh.rotation.x = mouse.y * 0.6 + t * 0.05;
      mesh.rotation.y = mouse.x * 0.6 + t * 0.12;
      halo.rotation.copy(mesh.rotation);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      geo.dispose(); mat.dispose();
      haloGeo.dispose(); haloMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
      aria-hidden
    />
  );
}
