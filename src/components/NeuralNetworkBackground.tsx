import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Node {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  connections: number[];
}

function NeuralNetwork({ mousePosition, isSubmitting }: { mousePosition: { x: number; y: number }; isSubmitting: boolean }) {
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const nodeCount = 80;
  const maxDistance = 3;

  const nodes = useMemo(() => {
    const nodeArray: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodeArray.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.005
        ),
        connections: [],
      });
    }
    return nodeArray;
  }, []);

  const particleCount = 100;
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities: THREE.Vector3[] = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      velocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.01
      ));
    }

    return { positions, velocities };
  }, []);

  useFrame((state) => {
    if (!nodesRef.current || !linesRef.current || !particlesRef.current) return;

    const time = state.clock.getElapsedTime();
    const dummy = new THREE.Object3D();
    const linePositions: number[] = [];
    const lineColors: number[] = [];

    const mouseInfluence = new THREE.Vector3(
      mousePosition.x * 5,
      -mousePosition.y * 5,
      0
    );

    nodes.forEach((node, i) => {
      if (isSubmitting) {
        const direction = new THREE.Vector3(0, 0, 2).sub(node.position).normalize();
        node.position.addScaledVector(direction, 0.1);
      } else {
        node.position.add(node.velocity);

        const distanceToMouse = node.position.distanceTo(mouseInfluence);
        if (distanceToMouse < 3) {
          const repulsion = node.position.clone().sub(mouseInfluence).normalize().multiplyScalar(0.05);
          node.position.add(repulsion);
        }

        if (Math.abs(node.position.x) > 10) node.velocity.x *= -1;
        if (Math.abs(node.position.y) > 10) node.velocity.y *= -1;
        if (Math.abs(node.position.z) > 5) node.velocity.z *= -1;
      }

      dummy.position.copy(node.position);
      dummy.scale.setScalar(1 + Math.sin(time * 0.5 + i) * 0.1);
      dummy.updateMatrix();
      nodesRef.current!.setMatrixAt(i, dummy.matrix);

      const greyColor = new THREE.Color(0x808080);
      const whiteColor = new THREE.Color(0xFFFFFF);
      const color = i % 2 === 0 ? greyColor : whiteColor;
      nodesRef.current!.setColorAt(i, color);
    });

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].position.distanceTo(nodes[j].position);
        if (distance < maxDistance) {
          linePositions.push(
            nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
            nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
          );

          const opacity = 1 - distance / maxDistance;
          const color = i % 2 === 0 ? new THREE.Color(0x808080) : new THREE.Color(0xFFFFFF);
          lineColors.push(color.r * opacity, color.g * opacity, color.b * opacity);
          lineColors.push(color.r * opacity, color.g * opacity, color.b * opacity);
        }
      }
    }

    const geometry = linesRef.current.geometry;
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

    const particleGeometry = particlesRef.current.geometry;
    const positions = particleGeometry.attributes.position.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      if (isSubmitting) {
        const px = positions[i * 3];
        const py = positions[i * 3 + 1];
        const direction = new THREE.Vector3(-px, -py, 2).normalize();
        positions[i * 3] += direction.x * 0.15;
        positions[i * 3 + 1] += direction.y * 0.15;
        positions[i * 3 + 2] += direction.z * 0.15;
      } else {
        positions[i * 3] += particles.velocities[i].x;
        positions[i * 3 + 1] += particles.velocities[i].y;
        positions[i * 3 + 2] += particles.velocities[i].z;

        if (Math.abs(positions[i * 3]) > 10) particles.velocities[i].x *= -1;
        if (Math.abs(positions[i * 3 + 1]) > 10) particles.velocities[i].y *= -1;
        if (Math.abs(positions[i * 3 + 2]) > 5) particles.velocities[i].z *= -1;
      }
    }

    particleGeometry.attributes.position.needsUpdate = true;

    nodesRef.current.instanceMatrix.needsUpdate = true;
    if (nodesRef.current.instanceColor) {
      nodesRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <>
      <instancedMesh ref={nodesRef} args={[undefined, undefined, nodeCount]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>

      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial vertexColors transparent opacity={0.3} />
      </lineSegments>

      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particles.positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color={0xCCCCCC}
          transparent
          opacity={0.4}
          sizeAttenuation
        />
      </points>
    </>
  );
}

export default function NeuralNetworkBackground({ isSubmitting = false }: { isSubmitting?: boolean }) {
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 opacity-20">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
      >
        <color attach="background" args={['#050505']} />
        <NeuralNetwork mousePosition={mousePosition.current} isSubmitting={isSubmitting} />
      </Canvas>
    </div>
  );
}
