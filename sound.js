
/* ============================================================
   BIRTHDAY WEBSITE
   Sound Effects + Background Music 🎵
============================================================ */


/* ============================================================
   AUDIO FILES
============================================================ */

const sounds = {


    /* ========================================================
       CLICK SOUND

       A very short sound such as:
       pop.mp3
       click.mp3
       sparkle.mp3
    ======================================================== */

    click:
        new Audio("audio/click.mp3"),



    /* ========================================================
       HOME MUSIC
    ======================================================== */

    home:
        new Audio("audio/home.mp3"),



    /* ========================================================
       MENU MUSIC
    ======================================================== */

    menu:
        new Audio("audio/menu.mp3"),



    /* ========================================================
       MEMORY MUSIC
    ======================================================== */

    memory:
        new Audio("audio/memory.mp3"),



    /* ========================================================
       FINAL SURPRISE MUSIC
    ======================================================== */

    surprise:
        new Audio("audio/surprise.mp3")

};


/* ============================================================
   MUSIC SETTINGS
============================================================ */

const musicSettings = {


    home: {

        volume: 0.35

    },


    menu: {

        volume: 0.30

    },


    memory: {

        volume: 0.28

    },


    surprise: {

        volume: 0.40

    }

};


/* ============================================================
   CURRENT MUSIC
============================================================ */

let currentMusic = null;


/* ============================================================
   MUSIC STATE
============================================================ */

let audioUnlocked = false;

let musicMuted = false;


/* ============================================================
   PRELOAD AUDIO
============================================================ */

Object.values(sounds).forEach(
    audio => {

        audio.preload = "auto";

    }
);


/* ============================================================
   LOOP BACKGROUND MUSIC
============================================================ */

sounds.home.loop = true;

sounds.menu.loop = true;

sounds.memory.loop = true;

sounds.surprise.loop = true;


/* ============================================================
   CLICK SOUND
============================================================ */

function playClickSound() {


    const clickSound =
        sounds.click;


    /*
       Restart the sound every time.

       This means rapidly clicking things
       still produces a click sound.
    */

    clickSound.currentTime = 0;


    clickSound.volume = 0.45;


    clickSound.play().catch(
        () => {

            /*
               Browser blocked audio.

               This is normal before the
               user interacts with the site.
            */

        }
    );

}


/* ============================================================
   UNLOCK AUDIO
============================================================ */

function unlockAudio() {


    if (audioUnlocked) {

        return;

    }


    audioUnlocked = true;


    /*
       Start home music because this function
       is triggered by the visitor's click.
    */

    const homeMusic =
        sounds.home;


    homeMusic.volume =
        musicSettings.home.volume;


    homeMusic.play().catch(
        () => {}
    );


    currentMusic =
        homeMusic;

}


/* ============================================================
   STOP CURRENT MUSIC
============================================================ */

function stopCurrentMusic() {


    if (!currentMusic) {

        return;

    }


    currentMusic.pause();


    currentMusic.currentTime = 0;


    currentMusic = null;

}


/* ============================================================
   PLAY PAGE MUSIC
============================================================ */

function playPageMusic(pageName) {


    /*
       Get requested music.
    */

    const newMusic =
        sounds[pageName];


    if (!newMusic) {

        return;

    }


    /*
       If the visitor hasn't interacted
       with the website yet, don't force
       autoplay.
    */

    if (!audioUnlocked) {

        return;

    }


    /*
       If this song is already playing,
       don't restart it.
    */

    if (
        currentMusic === newMusic
    ) {


        if (
            currentMusic.paused &&
            !musicMuted
        ) {

            currentMusic.play().catch(
                () => {}
            );

        }


        return;

    }


    /*
       Stop previous music.
    */

    stopCurrentMusic();


    /*
       Set volume.
    */

    if (
        musicSettings[pageName]
    ) {

        newMusic.volume =
            musicSettings[pageName]
                .volume;

    }


    /*
       Respect mute setting.
    */

    newMusic.muted =
        musicMuted;


    /*
       Start new music.
    */

    newMusic.currentTime = 0;


    currentMusic =
        newMusic;


    newMusic.play().catch(
        () => {}
    );

}


/* ============================================================
   MUSIC TOGGLE
============================================================ */

function toggleMusic() {


    const button =
        document.getElementById(
            "musicToggle"
        );


    /*
       If music hasn't started yet,
       attempt to start the current page's
       music.
    */

    if (!currentMusic) {


        unlockAudio();


        if (currentMusic) {

            currentMusic.play().catch(
                () => {}
            );

        }


        return;

    }


    /*
       Turn music OFF.
    */

    if (!musicMuted) {


        currentMusic.muted =
            true;


        musicMuted = true;


        button.textContent =
            "🔇";


    }


    /*
       Turn music ON.
    */

    else {


        currentMusic.muted =
            false;


        musicMuted = false;


        button.textContent =
            "🔊";


        currentMusic.play().catch(
            () => {}
        );

    }

}


/* ============================================================
   GLOBAL CLICK SOUND
============================================================ */

document.addEventListener(
    "click",
    event => {


        /*
           Find out whether the visitor
           clicked an interactive element.
        */

        const clickable =
            event.target.closest(

                "button, a, .memory-card"

            );


        /*
           Ignore ordinary background clicks.
        */

        if (!clickable) {

            return;

        }


        /*
           Don't double-play the click sound
           for the cover button.

           startBirthdayExperience()
           already handles it.
        */

        if (
            clickable.classList.contains(
                "cover-photo-button"
            )
        ) {

            return;

        }


        /*
           Unlock audio.
        */

        unlockAudio();


        /*
           Play click.
        */

        playClickSound();


    }
);


/* ============================================================
   INITIAL PAGE
============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /*
           We intentionally DON'T start music here.

           Browsers commonly block audio that starts
           before the visitor interacts with the page.

           The first click starts the music.
        */

    }
);

