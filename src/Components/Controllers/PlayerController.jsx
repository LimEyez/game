// import BoxCollider from "../Objects/Colliders/BoxCollider";
import { useEffect, useMemo, useRef } from "react";
import PirateOfficerInfo from "../Objects/PlayerObjects/PirateOfficerInfo";
import { useKeyboard } from "./useKeyboard";
import { Vector3, Quaternion, Matrix4, Euler } from 'three'
import { useFrame, useThree } from "@react-three/fiber";
import { useTrimesh, useSphere } from "@react-three/cannon";
import { Vec3 } from "cannon-es"
import useFollowCam from "../Cameras/useFollowCam";


export default function PlayerController(props) {

  // console.log()
  // const p2 = useTrimesh(() => ({args: }))

  const group = useRef();

  // ROTATE

  const worldPosition = useMemo(() => new Vector3(0, 0, 0), []);
  const targetQuaternion = useMemo(() => new Quaternion(), []);
  const quat = useMemo(() => new Quaternion(), [])
  const euler = useMemo(() => new Euler(), [])

  // VELOCITY
  const contactNormal = useMemo(() => new Vec3(0, 0, 0), []);

  const velocityBody = new Vector3();

  const vecX = new Vector3();
  // const vecY = new Vector3();
  const vecZ = new Vector3();

  const SPEED = 0.5;

  // FOLLOW CAMERA

  const { pivot, followCam} = useFollowCam();

  const velocitySet = () => {
    if (document.pointerLockElement) {
      vecX.set(Number(right) - Number(left), 0, 0);
      vecZ.set(0, 0, Number(forward) - Number(backward));
      velocityBody.subVectors(vecX, vecZ)
      velocityBody.normalize().multiplyScalar(SPEED);
      euler.y = pivot.rotation.y
      euler.order = 'XYZ'
      quat.setFromEuler(euler)
      velocityBody.applyQuaternion(quat)
      // body.velocity.set(velocityBody.x, velocityBody.y, velocityBody.z)
      body.applyImpulse([velocityBody.x, velocityBody.y, velocityBody.z], [0, 0, 0])
    }

    // console.log(quat)
  }

  const rotateBody = (delta) => {
    body.angularFactor.set(0, 0, 0);
    refBody.current.getWorldPosition(worldPosition);

    const rotationMatrix = new Matrix4()
    rotationMatrix.lookAt(worldPosition, group.current.position, group.current.up)
    targetQuaternion.setFromRotationMatrix(rotationMatrix)

    if (!group.current.quaternion.equals(targetQuaternion)) {
      targetQuaternion.z = 0
      targetQuaternion.x = 0
      targetQuaternion.normalize()
      group.current.quaternion.rotateTowards(targetQuaternion, delta * 10)
    }

    euler.y = pivot.rotation.y
    euler.order = 'XYZ'
    quat.setFromEuler(euler)
    velocityBody.applyQuaternion(quat)


  }



  const [refBody, body] = useSphere(() => ({
    ...PirateOfficerInfo.physicInfo,
    onCollide: (e) => {
      if (e.contact.bi.id === e.body.id) {
        e.contact.ni = contactNormal
      } else {
        contactNormal.set(...e.contact.ni)
      }
    },
  }), useRef())


  const { forward, backward, left, right } = useKeyboard();

  useFrame((_, delta) => {
    rotateBody(delta);
    velocitySet();
    group.current.position.lerp(worldPosition, 0.1);
    pivot.position.lerp(worldPosition, 0.2);

  })

  useEffect(() => {

  })

  return (
    <group ref={group} dispose={null}>

      {PirateOfficerInfo.playerSkin(PirateOfficerInfo.bodyInfo)}

    </group>

  )
}