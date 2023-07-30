import React from 'react';
import Plane from '../Objects/Plane';

export default function Arena(props) {

    return (
        <>
            <Plane rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} args={[50, 50]} {...props} />
            {/* <Plane rotation={[0, -Math.PI / 2, 0]} position={[25, 5, 0]} args={[50, 10]} />
            <Plane rotation={[0, Math.PI / 2, 0]} position={[-25, 5, 0]} args={[50, 10]} />
            <Plane rotation={[0, 0, 0]} position={[0, 5, -25]} args={[50, 10]} />
            <Plane rotation={[0, -Math.PI, 0]} position={[0, 5, 25]} args={[50, 10]} /> */}
        </>
    );
}

