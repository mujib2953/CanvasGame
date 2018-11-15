import GAME_CONFIG from './common/constanats';
import Sound from './common/Sound';
import Music from './common/Music';

// -- interfaces
import iSounds from './interfaces/iSounds';
import iShip from './interfaces/iShip';
import iAsteroid from './interfaces/iAsteroid';

import utilFunc from './common';

export default class  Game {

    private can: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private sounds: Array<iSounds> = [];
    private music: Music;

    private scoreHigh: number;
    private displayLevel: number;
    private displayLives: number;
    private displayScore: number;
    private displayText: string;
    private displayTextAlpha: number;

    private ship: iShip;

    private asteroids: Array<iAsteroid>;
    private asteroidTotal: number;
    private asteroidLeft: number;

    private gameInterval: any;

    constructor() {
        this.can = <HTMLCanvasElement>document.getElementById("gameCanvas");
        this.ctx = <CanvasRenderingContext2D>this.can.getContext("2d");

        this.loadSounds();
        this.loadMusics();

        this.newGame();

        this.addEvents();

        this.gameInterval = setInterval(this.update.bind(this), 1000 / GAME_CONFIG.FPS);

    }

    public setUpGame() {

    }

    public render() {
        console.log("inside render");
    }

    private loadSounds(): void {

        for (let i = 0; i < GAME_CONFIG.SOUND_PATHS.length; i++) {
            let temp = GAME_CONFIG.SOUND_PATHS[i];

            let is: iSounds = {
                name: temp.key,
                sound: new Sound(temp.path)
            }

            this.sounds[i] = is;
        }
        console.log(this.sounds);
    }

    private loadMusics(): void {
        this.music = new Music(GAME_CONFIG.MUSIC_LOW_PATH, GAME_CONFIG.MUSIC_HIGH_PATH);
    }

    private newGame(): void {

        let scoreStr: string;

        this.displayLevel = 0;
        this.displayLives = GAME_CONFIG.GAME_LIVES;
        this.displayScore = 0;
        this.ship = this.getShip();

        scoreStr = localStorage.getItem(GAME_CONFIG.SAVE_KEY_SCORE);
        if (scoreStr === null) {
            this.scoreHigh = 0;
        } else {
            this.scoreHigh = parseInt(scoreStr);
        }

        this.newLevel();
    }

    private getShip(): iShip {

        let ship: iShip = {
            x: this.getCanvasWidth() / 2,
            y: this.getCanvasHeight() / 2,
            a: 90 / 180 * Math.PI,
            r: GAME_CONFIG.SHIP_SIZE / 2,
            blinkNum: Math.ceil(GAME_CONFIG.SHIP_INV_DUR / GAME_CONFIG.SHIP_BLINK_DUR),
            blinkTime: Math.ceil(GAME_CONFIG.SHIP_BLINK_DUR * GAME_CONFIG.FPS),
            canShoot: true,
            isDead: false,
            explodeTime: 0,
            laser: [],
            rot: 0,
            isThrusting: false,
            thrust: {
                x: 0,
                y: 0
            }
        }

        return ship;
    }

    private getCanvasWidth(): number {
        return this.can.width;
    }

    private getCanvasHeight(): number {
        return this.can.height;
    }

    private newLevel(): void {

        this.music.setAsteriodRatio(1);
        this.displayText = "Level: " + (this.displayLevel + 1);
        this.displayTextAlpha = 1.0;

        this.createAsteroidBelt();

    }

    private createAsteroidBelt(): void {

        this.asteroids = [];
        this.asteroidTotal = (GAME_CONFIG.ROID_NUM + this.displayLevel) * 7;
        this.asteroidLeft = this.asteroidTotal;

        let x: number,
            y: number;

        for (let i: number = 0; i < GAME_CONFIG.ROID_NUM; i++) {

            // --- random asteroid position not touching spaceship
            do {

                x = Math.floor(utilFunc.getRandom() * this.getCanvasWidth());
                y = Math.floor(utilFunc.getRandom() * this.getCanvasHeight());

            } while (utilFunc.distanceBetweenPoints(this.ship.x, this.ship.y, x, y) < (GAME_CONFIG.ROID_SIZE * 2 + this.ship.r));

            this.asteroids.push(this.newAsteroid(x, y, Math.ceil(GAME_CONFIG.ROID_SIZE) / 2));
            console.log("Aestroid:: " , this.asteroids);
        }

    }

    private newAsteroid(x: number, y: number, r: number): iAsteroid {

        let lvlMult: number = 1 + 1.0 * this.displayLevel;

        let asteroid: iAsteroid = {
            x: x,
            y: y,
            xv: utilFunc.getRandom() * GAME_CONFIG.ROID_SPD * lvlMult / GAME_CONFIG.FPS * (utilFunc.getRandom() < 0.5 ? 1 : -1),
            yv: utilFunc.getRandom() * GAME_CONFIG.ROID_SPD * lvlMult / GAME_CONFIG.FPS * (utilFunc.getRandom() < 0.5 ? 1 : -1),
            a: utilFunc.getRandom() * Math.PI * 2, // --- into radians
            r: r,
            offset: [],
            vert: Math.floor(utilFunc.getRandom() * (GAME_CONFIG.ROID_VERT + 1) + GAME_CONFIG.ROID_VERT / 2)
        };

        // --- populating the offset Array
        for (let i = 0; i < asteroid.vert; i++) {
            asteroid.offset.push(utilFunc.getRandom() * GAME_CONFIG.ROID_JAG * 2 + 1 - GAME_CONFIG.ROID_JAG);
        }

        return asteroid;
    }

    private addEvents(): void {

        this.onKeyDown.bind(this);

        document.addEventListener("keydown", (event: KeyboardEvent) => this.onKeyDown(event.code.toLowerCase()));
        document.addEventListener("keyup", (event: KeyboardEvent) => this.onKeyUp(event.code.toLowerCase()));

    }

    private onKeyDown(code: string): void {
        if (this.ship.isDead)
            return;

        switch (code) {
            case 'space':
                // --- space bar -->>> Shoot Laser
                this.shootLaser();
                break;
            case 'arrowleft':
                // --- Left Arrow -->>> Rotate Ship Left
                this.rotateShip(false);
                break;
            case 'arrowup':
                // --- Up Arrow -->>> Thrust the Ship Forward
                this.ship.isThrusting = true;
                break;
            case 'arrowright':
                // --- Right Arrow -->>> Rotate Ship Right
                this.rotateShip(true);
                break;
            default:
                console.log(code);
                break;
        }
    }

    private onKeyUp(code: string): void {

        if (this.ship.isDead)
            return;

        switch (code) {
            case 'space':
                // --- space bar -->>> Allow Shooting again
                this.ship.canShoot = true;
                break;
            case 'arrowleft':
                // --- Left Arrow -->>> stop rotating left
                this.ship.rot = 0;
                break;
            case 'arrowup':
                // --- Up Arrow -->>> Stop thrusting
                this.ship.isThrusting = false;
                break;
            case 'arrowright':
                // --- Right Arrow -->>> Stop rotating right
                this.ship.rot = 0;
                break;
            default:
                console.log(code);
                break;
        }
    }

    private shootLaser(): void {
    }

    private rotateShip(isClockwise: boolean): void {
    }

    private update(): void {

        let isBlinkOn: boolean = this.ship.blinkNum % 2 === 0,
            isExploding: boolean = this.ship.explodeTime > 0;

        this.music.tick();

        this.drawSpace();

        // --- drawing asteroid
        let x: number,
            y: number,
            a: number,
            r: number,
            offs: Array<number>,
            vert: number;

        for(let i = 0; i < this.asteroids.length; i++) {

            this.ctx.strokeStyle = GAME_CONFIG.COLOR_SLATE_GRAY;
            this.ctx.lineWidth = GAME_CONFIG.SHIP_SIZE / 20;

            // --- asteroids properties
            let tempAsteroid: iAsteroid = this.asteroids[i];
            a = tempAsteroid.a;
            x = tempAsteroid.x;
            y = tempAsteroid.y;
            r = tempAsteroid.r;
            offs = tempAsteroid.offset;
            vert = tempAsteroid.vert;

            // --- drawing path
            this.ctx.beginPath();
            this.ctx.moveTo(
                x + r * offs[0] + Math.cos(a),
                y + r * offs[0] + Math.sin(a)
            );

            // --- drawing polygon
            for(let j = 1; j < vert; j++) {
                this.ctx.lineTo(
                    x + r * offs[j] + Math.cos(a + j * Math.PI * 2 / vert),
                    y + r * offs[j] + Math.sin(a + j * Math.PI * 2 / vert)
                );
            }

            this.ctx.closePath();
            this.ctx.stroke();

            if(GAME_CONFIG.SHOW_BOUNDING) {
                this.ctx.strokeStyle = GAME_CONFIG.COLOR_LIME;
                this.ctx.beginPath();
                this.ctx.arc(x, y, r, 0, Math.PI * 2, false);
                this.ctx.closePath();
            }

        }
    }

    private drawSpace(): void {

        this.ctx.fillStyle = GAME_CONFIG.COLOR_BLACK;
        this.ctx.fillRect(0, 0, this.getCanvasWidth(), this.getCanvasHeight());
    }
}

