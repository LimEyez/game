import React from 'react';
import { useControls } from 'leva'

function DirectionalLight(props) {

    const directionalCtl = useControls('Directional Light', {
        visible: true,
        position: {
            x: 5,
            y: 5,
            z: 5
        },
        castShadow: true,
        ...props
    })


    return (
        <directionalLight
            visible={directionalCtl.visible}
            position={[directionalCtl.position.x, directionalCtl.position.y, directionalCtl.position.z]}
            castShadow={directionalCtl.castShadow}
        />
    );
}

export default DirectionalLight;