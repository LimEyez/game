import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useBox } from "@react-three/cannon";

export default function Box(props) {
    const [ref] = useBox(() => ({
        // position: [0, 5, 0],
        // mass: 1,
        // ...props
    }));
    // const [crate, stone, wood] = useLoader(TextureLoader, [
    //      "name img crate",
    //      "name img stone",
    //      "name img wood",
    // ])

    // useFrame(() => {
    //     ref.current.rotation.x += 0.01;
    // })

    return (
        <mesh ref={ref} castShadow receiveShadow>
            <boxGeometry />
            <meshStandardMaterial color={'blue'} wireframe={false} />
            {/* <meshStandardMaterial map={crate} /> */}
        </mesh>
    )
}