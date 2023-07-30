import { useBox } from "@react-three/cannon"



export default function BoxCollider(props) {

    const [ref] = useBox(
        () => ({ ...props.physicInfo })
    )


    return (

        <mesh ref={ref} castShadow receiveShadow >
            {/* <boxGeometry {...props.bodyInfo} type/> */}
            {/* <meshNormalMaterial wireframe visible={false} /> */}


            {/* {props.playerSkin()} */}


        </mesh>
    )

}