
const utilFunc = {

    soundPromise: (audio: HTMLAudioElement): void => {
        console.info("Sound :: " + audio.src + " is playing.");

        let playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                })
                .catch((e: ExceptionInformation) => {
                    console.error(e);
                    console.warn("unable to play Audio " + audio.src);
                })
        }
    },
    getRandom: (): number => {
        return Math.random();
    },
    distanceBetweenPoints: (startX: number, startY: number, endX: number, endY: number): number => {
        return Math.sqrt( Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2) );
    }
}

export default utilFunc;