import iThrust from './iThrust';

interface iShip {
    x: number,
    y: number,
    a: number,
    r: number,
    blinkNum: number,
    blinkTime: number,
    canShoot: boolean,
    isDead: boolean,
    explodeTime: number,
    laser: Array<any>,
    rot: number,
    isThrusting: boolean,
    thrust: iThrust
}

export default iShip;