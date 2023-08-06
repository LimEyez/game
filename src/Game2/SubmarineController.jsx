import { ArrowHelper, Euler, MathUtils, Matrix4, Vector3, Quaternion } from "three";
import { useEffect, useRef, useState } from "react";
import { useBox } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { useKeyboardSubmarine } from "./useKeyboardSubmarine";
import useFollowCam from "../Components/Cameras/useFollowCam";

export default function SubmarineController(props) {
  const arrowHelper = new ArrowHelper(new Vector3(0, 0, 1), new Vector3(0, 0, 0), 2);

  //  Общие сведения мира

  const linearDamping = 0.9;
  const angularDamping = 0.9;


  const [refPlayerBody, playerBody] = useBox(() => ({
    position: [0, 2, 0],
    args: [1, 1, 1],
    mass: 1,
    angularDamping,
    linearDamping
  }));

  const { pivot } = useFollowCam();

  const refGroupPlayer = useRef();
  const refPlayer = useRef();


  //  Параметры угловой скорости (вращения)
  const playerMaxAngularSpeedY = useRef(1);
  const playerAngularSpeedY = useRef(new Vector3(0, 0, 0));
  const playerAngularImpulseY = 1

  //  Параметры наклонов вверх и вниз

  const playerMaxAngularX = useRef(MathUtils.degToRad(45));
  const playerMaxAngularSpeedX = useRef(1);
  const playerAngularSpeedX = useRef(new Vector3(0, 0, 0));
  const playerAngularImpulseX = 1

  // Параметры скорости оъекта
  const acceleration = useRef(4);
  const playerVelocity = useRef(new Vector3());
  const playerVelocityZ = useRef(0);
  const maxVelocityZ = useRef(10);


  // Связи физики и графики
  const refPlayerPhysicBodyQuaternion = useRef(new Quaternion(0, 0, 0));
  const refPlayerPhysicBodyPosition = useRef(new Vector3(0, 0, 0));
  const refplayerPhysicBodyVelocity = useRef(new Vector3(0, 0, 0));
  const refPlayerPhysicBodyRotation = useRef(new Euler(0, 0, 0));

  const { forward, backward, left, right, rotateDown, rotateUp, up, down } = useKeyboardSubmarine();


  useEffect(() => {
    // Синхронизируем поворот графического представления с физическим телом
    playerBody.rotation.subscribe((rotation) => {
      refPlayerPhysicBodyRotation.current.set(rotation[0], rotation[1], rotation[2]);
    });

    playerBody.position.subscribe((position) => {
      refPlayerPhysicBodyPosition.current.set(position[0], position[1], position[2])
    })

    playerBody.velocity.subscribe((velocity) => {
      refplayerPhysicBodyVelocity.current.set(velocity[0], velocity[1], velocity[2]);
    })

    playerBody.quaternion.subscribe((quaternion) => {
      // console.log(quaternion)
      refPlayerPhysicBodyQuaternion.current.set(quaternion[0], quaternion[1], quaternion[2], quaternion[3]);
    })

  })

  useFrame((state, delta, frame) => {

    // Присвоение позиции объкета к точке, на которую смотрит камера

    pivot.position.copy(refPlayerPhysicBodyPosition.current)

    //Присваивание общих параметров графического к физическому объекту

    refGroupPlayer.current.position.copy(refPlayerPhysicBodyPosition.current);
    refGroupPlayer.current.quaternion.copy(refPlayerPhysicBodyQuaternion);
    refGroupPlayer.current.rotation.copy(refPlayerPhysicBodyRotation.current);

    // //=============================       Управление вращениями объекта по оси Y       ==================================

    const rotationControllerY = Number(left) - Number(right) // Проверяет нажатия клавиш для поворота

    {
      const { x, y, z } = playerAngularSpeedY.current;

      if (Math.abs(y) < 0.1) {  //Чтобы не добавлял слишком маленькие угловые импульсы
        playerAngularSpeedY.current.y = 0;
      }

      // Вычисление скорости вращения (для плавного и синхронного поворота)

      playerAngularSpeedY.current.set(
        x,
        Math.min(
          Math.max(y + rotationControllerY * (playerAngularImpulseY * delta), playerMaxAngularSpeedY.current * -1),
          playerMaxAngularSpeedY.current
        ),
        z
      );
    }

    const rotationControllerX = Number(rotateDown) - Number(rotateUp);

    {



      const { x, y, z } = playerAngularSpeedX.current;

      playerAngularSpeedX.current.set(
        Math.min(
          Math.max(x + rotationControllerX * (playerAngularImpulseX * delta), playerMaxAngularSpeedX.current * -1),
          playerMaxAngularSpeedY.current,
        ),
        y,
        z
      );




      const playerRotationEuler = new Euler(0, 0, 0).setFromQuaternion(refPlayerPhysicBodyQuaternion.current.clone().normalize())


      // console.log(refPlayerPhysicBodyRotation.current.z)


      // if (Math.abs(playerRotationEuler.x) >= playerMaxAngularX) {

        // playerAngularSpeedX.current.set(0, 0, 0);

        // playerBody.quaternion.set(
        //   0,
        //   refPlayerPhysicBodyQuaternion.current.y,
        //   refPlayerPhysicBodyQuaternion.current.z,
        //   refPlayerPhysicBodyQuaternion.current.w

        // )

      // }
    }

    playerAngularSpeedX.current.multiplyScalar(1 - angularDamping * delta) // Применение сопротивления на вращение X
    playerAngularSpeedY.current.multiplyScalar(1 - angularDamping * delta) // Применение сопротивления на вращение Y


    const playerAngularSpeed = new Vector3(
      playerAngularSpeedX.current.x,
      0,
      0
    );

    if (refPlayerPhysicBodyQuaternion.current) {
      playerAngularSpeed.applyQuaternion(refPlayerPhysicBodyQuaternion.current);
      playerAngularSpeed.setY(playerAngularSpeedY.current.y)
    }



    playerBody.angularVelocity.copy(playerAngularSpeed) // Присвоение угловой скорости физическому объекту


    //==========================================================================================================


    //=============================       Управление движением объекта       ==================================


    const speedController = Number(forward) - Number(backward);   // Проверяет нажатия клавиш для движения (вперед / назад)

    playerVelocityZ.current += speedController * (acceleration.current * delta);

    playerVelocityZ.current *= 1 - linearDamping * delta


    playerVelocity.current.set(
      0,
      0,
      Math.min(
        Math.max(playerVelocityZ.current, maxVelocityZ.current * -1),
        maxVelocityZ.current
      )
    );


    if (refPlayerPhysicBodyQuaternion.current) {
      playerVelocity.current.applyQuaternion(refPlayerPhysicBodyQuaternion.current);
    }

    playerBody.velocity.copy(playerVelocity.current)




  });

  useEffect(() => {
  })

  return (
    <group ref={refGroupPlayer}>
      <mesh ref={refPlayer}>
        <meshNormalMaterial />
        <boxGeometry />
      </mesh>
      <primitive object={arrowHelper} />
    </group>
  );
}
