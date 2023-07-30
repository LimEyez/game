import { Debug, useContactMaterial } from '@react-three/cannon'
import Arena from './Maps/Arena'
import PlayerController from './Controllers/PlayerController'
import Aquarium from '../Game2/Aquarium'
import SubmarineController from '../Game2/SubmarineController'
import { Basic } from './Physics/Materials/Basic'

export default function Game(props) {

    useContactMaterial('Basic', {
        ...Basic
    })

    return (

        <Debug>
            <PlayerController material={"slippery"} linearDamping={0.95}/>
            <Arena material={'ground'}/>

        </Debug>

    )
}