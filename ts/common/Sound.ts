import GAME_CONFIG from './constanats';
import utilFunc from '../common';

class Sound {

    private path: string;
    private maxStream: number;
    private volume: number;

    private streamNum: number = 0;
    private streams: Array<HTMLAudioElement> = [];

    constructor(path: string, maxStream: number = 1, volume: number = 1.0) {
        this.path = path;
        this.maxStream = maxStream;
        this.volume = volume;

        this.addSound(path, maxStream, volume);
    }

    public play(): void {
        if(GAME_CONFIG.SOUND_ON) {
            this.streamNum = (this.streamNum + 1) % this.maxStream;
            utilFunc.soundPromise(this.streams[this.streamNum]);
        }
    }

    public stop(): void {
        this.streams[this.streamNum].pause();
        this.streams[this.streamNum].currentTime = 0;
    }


    private addSound(path: string, maxStream: number, volume: number ): void {
        for(let i = 0; i < maxStream; i++) {
            let soundAudio: HTMLAudioElement = new Audio(path);
            this.streams.push(soundAudio);
            this.streams[i].volume = volume;
        }
    }
}

export default Sound;