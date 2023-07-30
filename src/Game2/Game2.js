import { Debug} from '@react-three/cannon'
import SubmarineController from './SubmarineController'
import Aquarium from './Aquarium'

export default function Game2(props) {


    return (

        <Debug>

            <SubmarineController />
            <Aquarium material={'Basic'}/>


        </Debug>

    )
}