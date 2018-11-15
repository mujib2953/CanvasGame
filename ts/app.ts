import Game from './Game';

class App {
    private _game: Game;

    constructor(game: Game) {
        this._game = game;
    }

    public setUp(): void {

        // -- Any setup that game require before boot-up the game
        this._game.setUpGame();
        // this.gameLoop();
    }

    private gameLoop(): void {
        window.requestAnimationFrame(this.gameLoop.bind(this));

        this._game.render();
    }
}

window.onload = () => {
    let app = new App(new Game());
    app.setUp();
}