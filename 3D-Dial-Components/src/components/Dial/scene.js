import React, { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Box, Sphere, Cone, Text } from '@react-three/drei';

function Scene({opacity, coneRadius}) {
  const { camera } = useThree(); 
  const cubeRef = useRef();

  useFrame(() => {
    if (cubeRef.current) {
     // cubeRef.current.rotation.x += 0.01;  // Küpü x ekseni etrafında döndür
      cubeRef.current.rotation.y += 0.01;  // Küpü y ekseni etrafında döndür
    }
  });

  useEffect(() => {
    camera.position.y = -5;  
    camera.lookAt(0, 0, 0); 
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.5} /> 
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1}/>
      <pointLight position={[-10, -10, -10]} />
      
      <Box position={[0, -1, 0]} args={[2.3, 0.01, 2.3]} ref={cubeRef}>
        <meshStandardMaterial color="darkgray" />
      </Box>

      <Sphere position={[0, -0.5, 0]} args={[1.26]}>
        <meshStandardMaterial color={coneRadius <= 1.63 ? "darkgray" : "lime"} transparent opacity={opacity} />
      </Sphere>
      <Text
        position={[0, -2, 0]}
        fontSize={0.2}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {Math.round(opacity * 100)}%
      </Text>

      <Cone position={[0, 0.5, 0]} args={[coneRadius, 3, 32]}>
        <meshStandardMaterial color={coneRadius <= 1.63 ? "darkgray" : "cyan"} />
      </Cone>
    </>
  );
}

export default Scene;
