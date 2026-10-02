
/* ============================================================
   BIRTHDAY WEBSITE
   Main Interaction System 🎂
============================================================ */


/* ============================================================
   ✏️ CUSTOMIZE YOUR THREE MESSAGES HERE
============================================================ */

const memories = {


    /* ========================================================
       MEMORY 1
    ======================================================== */

    1: {

        number: "01",

        title: "A little something for you 🌿",

        message: `
Happy birthday! 🎂

I wanted to make something a little different
for your birthday this year.

So here's the first little surprise. 💚

Hope it makes you smile!
        `,

        qr: "qr/qr1.png"

    },


    /* ========================================================
       MEMORY 2
    ======================================================== */

    2: {

        number: "02",

        title: "Here's another one 🌱",

        message: `
Okay, you found the second one.

Here's another little message just for you.

I hope you know how much the people around
you appreciate having you around. ♡
        `,

        qr: "qr/qr2.png"

    },


    /* ========================================================
       MEMORY 3
    ======================================================== */

    3: {

        number: "03",

        title: "And finally... 🍃",

        message: `
You made it to the last one!

I hope your birthday is filled with good
memories, good food, lots of laughter,
and people who genuinely care about you.

Happy birthday again! 🎉
        `,

        qr: "qr/qr3.png"

    }

};


/* ============================================================
   TRACK OPENED MEMORIES
============================================================ */

let openedMemories = new Set();


/* ============================================================
   START EXPERIENCE
============================================================ */

function startBirthdayExperience() {


    /*
       Tell the sound system that the visitor
       has interacted with the website.

       This allows the browser to start audio.
    */

    if (typeof unlockAudio === "function") {

        unlockAudio();

    }


    /*
       Play click sound.
    */

    if (typeof playClickSound === "function") {

        playClickSound();

    }


    /*
       Go to the three-photo menu.
    */

    goToPage("menu");

}


/* ============================================================
   PAGE NAVIGATION
============================================================ */

function goToPage(pageId) {


    const pages =
        document.querySelectorAll(".page");


    pages.forEach(page => {

        page.classList.remove("active");

    });


    const targetPage =
        document.getElementById(pageId);


    if (!targetPage) {

        return;

    }


    targetPage.classList.add("active");


    /*
       Change background music.
    */

    if (typeof playPageMusic === "function") {


        switch (pageId) {


            case "home":

                playPageMusic("home");

                break;


            case "menu":

                playPageMusic("menu");

                break;


            case "memory":

                playPageMusic("memory");

                break;


            case "surprise":

                playPageMusic("surprise");

                break;


        }

    }

}


/* ============================================================
   OPEN MEMORY
============================================================ */

function openMemory(memoryNumber) {


    const memory =
        memories[memoryNumber];


    if (!memory) {

        return;

    }


    /*
       Play click sound.
    */

    if (typeof playClickSound === "function") {

        playClickSound();

    }


    /*
       Remember that this memory was opened.
    */

    openedMemories.add(memoryNumber);


    /*
       Update the message number.
    */

    document.getElementById(
        "messageNumber"
    ).textContent =
        memory.number;


    /*
       Update title.
    */

    document.getElementById(
        "messageTitle"
    ).textContent =
        memory.title;


    /*
       Update message.
    */

    document.getElementById(
        "messageText"
    ).textContent =
        memory.message.trim();


    /*
       Update QR code.
    */

    document.getElementById(
        "qrImage"
    ).src =
        memory.qr;


    /*
       Update progress.
    */

    updateProgress();


    /*
       Open message page.
    */

    goToPage("memory");

}


/* ============================================================
   UPDATE PROGRESS
============================================================ */

function updateProgress() {


    const count =
        openedMemories.size;


    const progressText =
        document.getElementById(
            "progressText"
        );


    const progressFill =
        document.getElementById(
            "progressFill"
        );


    /*
       Update text.
    */

    progressText.textContent =
        `${count} / 3 discovered`;


    /*
       Update progress bar.
    */

    progressFill.style.width =
        `${(count / 3) * 100}%`;


    /*
       Mark opened cards.
    */

    document
        .querySelectorAll(".memory-card")
        .forEach((card, index) => {


            const memoryNumber =
                index + 1;


            if (
                openedMemories.has(
                    memoryNumber
                )
            ) {

                card.classList.add(
                    "opened"
                );

            }

        });


    /*
       Unlock final button after
       all three memories.
    */

    if (count === 3) {

        unlockFinalButton();

    }

}


/* ============================================================
   UNLOCK FINAL BUTTON
============================================================ */

function unlockFinalButton() {


    const finalButton =
        document.getElementById(
            "finalButton"
        );


    const lockedMessage =
        document.getElementById(
            "lockedMessage"
        );


    lockedMessage.textContent =
        "🎁 You found everything!";


    finalButton.style.display =
        "block";

}


/* ============================================================
   FINAL SURPRISE
============================================================ */

function showSurprise() {


    /*
       Play click.
    */

    if (typeof playClickSound === "function") {

        playClickSound();

    }


    /*
       Go to surprise.
    */

    goToPage("surprise");


    /*
       Create celebration.
    */

    createConfetti();

    createBalloons();


    /*
       Make sure surprise music starts.
    */

    if (typeof playPageMusic === "function") {

        playPageMusic("surprise");

    }

}


/* ============================================================
   CREATE CONFETTI
============================================================ */

function createConfetti() {


    const container =
        document.getElementById(
            "confettiContainer"
        );


    /*
       Clear old confetti.
    */

    container.innerHTML = "";


    const confettiColors = [

        "#78B892",

        "#A8D5BA",

        "#F6D77A",

        "#F6C8C8",

        "#FFFFFF",

        "#4F916D"

    ];


    /*
       Create 100 pieces.
    */

    for (
        let i = 0;
        i < 100;
        i++
    ) {


        const piece =
            document.createElement(
                "div"
            );


        piece.classList.add(
            "confetti"
        );


        /*
           Random horizontal position.
        */

        piece.style.left =
            Math.random() * 100 + "%";


        /*
           Random color.
        */

        piece.style.backgroundColor =
            confettiColors[
                Math.floor(
                    Math.random() *
                    confettiColors.length
                )
            ];


        /*
           Random size.
        */

        const width =
            Math.random() * 8 + 5;


        const height =
            Math.random() * 12 + 8;


        piece.style.width =
            width + "px";


        piece.style.height =
            height + "px";


        /*
           Random animation duration.
        */

        const duration =
            Math.random() * 4 + 4;


        const delay =
            Math.random() * 4;


        piece.style.animationDuration =
            duration + "s";


        piece.style.animationDelay =
            delay + "s";


        /*
           Random shape.
        */

        piece.style.borderRadius =

            Math.random() > 0.5

                ? "50%"

                : "2px";


        container.appendChild(
            piece
        );

    }

}


/* ============================================================
   CREATE BALLOONS
============================================================ */

function createBalloons() {


    const container =
        document.getElementById(
            "balloonContainer"
        );


    container.innerHTML = "";


    const balloonColors = [

        "#78B892",

        "#A8D5BA",

        "#F6C8C8",

        "#F6D77A",

        "#FFFFFF",

        "#4F916D"

    ];


    /*
       Create 12 balloons.
    */

    for (
        let i = 0;
        i < 12;
        i++
    ) {


        const balloon =
            document.createElement(
                "div"
            );


        balloon.classList.add(
            "balloon"
        );


        /*
           Random position.
        */

        balloon.style.left =
            Math.random() * 100 + "%";


        /*
           Random color.
        */

        balloon.style.backgroundColor =
            balloonColors[
                Math.floor(
                    Math.random() *
                    balloonColors.length
                )
            ];


        /*
           Random size.
        */

        const size =
            Math.random() * 25 + 45;


        balloon.style.width =
            size + "px";


        balloon.style.height =
            size * 1.25 + "px";


        /*
           Random animation.
        */

        balloon.style.animationDuration =

            Math.random() * 8 + 8

            + "s";


        balloon.style.animationDelay =

            Math.random() * 6

            + "s";


        container.appendChild(
            balloon
        );

    }

}


/* ============================================================
   RESTART EXPERIENCE
============================================================ */

function restartExperience() {


    /*
       Play click.
    */

    if (typeof playClickSound === "function") {

        playClickSound();

    }


    /*
       Clear memories.
    */

    openedMemories.clear();


    /*
       Remove opened styling.
    */

    document
        .querySelectorAll(".memory-card")
        .forEach(card => {

            card.classList.remove(
                "opened"
            );

        });


    /*
       Reset progress.
    */

    document.getElementById(
        "progressText"
    ).textContent =
        "0 / 3 discovered";


    document.getElementById(
        "progressFill"
    ).style.width =
        "0%";


    /*
       Hide final button.
    */

    document.getElementById(
        "finalButton"
    ).style.display =
        "none";


    /*
       Reset locked text.
    */

    document.getElementById(
        "lockedMessage"
    ).textContent =
        "🔒 There might be something else...";


    /*
       Remove decorations.
    */

    document.getElementById(
        "confettiContainer"
    ).innerHTML = "";


    document.getElementById(
        "balloonContainer"
    ).innerHTML = "";


    /*
       Return to home.
    */

    goToPage("home");

}


/* ============================================================
   INITIALIZE
============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /*
           Initialize progress.
        */

        updateProgress();


    }
);

