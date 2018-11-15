const GAME_CONFIG ={

    // --- Game related constants
    FPS: 60, // --- Frames per seconds
    GAME_LIVES: 3,
    SHOW_BOUNDING: true,

    // --- ship related
    SHIP_SIZE: 30,
    SHIP_INV_DUR: 3, // duration of the ship's invisibility in seconds
    SHIP_BLINK_DUR: 0.1, // duration in seconds of a single blink during ship's invisibility,

    // ---- Local storage
    SAVE_KEY_SCORE: "GAME|HighScore",

    // --- asteroids related
    ROID_NUM: 3,
    ROID_SIZE: 100, // starting size of asteroids in pixels
    ROID_SPD: 50, // max starting speed of asteroids in pixels per second
    ROID_VERT: 10, // average number of vertices on each asteroid
    ROID_JAG: 0.4, // jaggedness of the asteroids (0 = none, 1 = lots)

    // --- colors
    COLOR_BLACK: '#000',
    COLOR_WHITE: '#FFF',
    COLOR_SLATE_GRAY: '#708090',
    COLOR_LIME: '#BFFF00',

    // --- sound related
    SOUND_ON: true,
    SOUND_PATHS: [
        {
            "key": "FX_EXPLODE_PATH",
            "path": "./sounds/explode.m4a",
        }, {
            "key": "FX_HIT_PATH",
            "path": "./sounds/hit.m4a",
        }, {
            "key": "FX_LASER_PATH",
            "path": "./sounds/laser.m4a",
        }, {
            "key": "FX_THRUST_PATH",
            "path": "./sounds/thrust.m4a",
        }
    ],
    MUSIC_LOW_PATH: "sounds/music-low.m4a",
    MUSIC_HIGH_PATH: "sounds/music-high.m4a"

};

export default GAME_CONFIG;