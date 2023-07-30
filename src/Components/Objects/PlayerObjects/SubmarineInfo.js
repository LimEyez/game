
import PirateOfficer from "./PirateOfficer"

const SubmarineInfo = {
    bodyInfo: {
        position: [0, -0.5, 0]
    },
    physicInfo: {
        position: [0, 1+10, 0],
        mass: 1,
        // args:[0.5, 1.2, 0.25],
        args:[0.5]
        // fixedRotation: true,
    },
    playerSkin: (props) => {
        return (<PirateOfficer {...props}/>)
    }

}
export default SubmarineInfo