import GAME_CONFIG from './constanats';
import utilFunc from '../common';

class Music {

    readonly soundLow: HTMLAudioElement;
    readonly soundHigh: HTMLAudioElement;
    private isLow: boolean = true;
    private tempo: number = 1.0; // --- seconds per beats
    private beatTime: number = 0; // --- frames left until next beats

    constructor(srcLow: string, srcHigh: string) {
        this.soundLow = new Audio(srcLow);
        this.soundHigh = new Audio(srcHigh);

        this.soundLow.autoplay = true;
        this.soundHigh.autoplay = true;
    }

    public play(): void {
        if(GAME_CONFIG.SOUND_ON) {
            if(this.isLow) {
                utilFunc.soundPromise(this.soundLow);
            } else {
                utilFunc.soundPromise(this.soundHigh);
            }
            this.isLow = !this.isLow;
        }
    }

    public setAsteriodRatio(ratio: number): void {
        this.tempo = 1.0 - 0.75 * (1.0 - ratio);
    }

    public tick(): void {
        if(this.beatTime==0) {
            this.play();
            this.beatTime = Math.ceil(this.tempo * GAME_CONFIG.FPS);
        } else {
            this.beatTime--;
        }
    }
}
export default Music;