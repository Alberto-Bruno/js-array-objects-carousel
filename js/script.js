/*
Consegna:
Dato un array di oggetti letterali con:
 - url dell’immagine
 - titolo
 - descrizione
Creare un carosello come ispirandovi alla foto allegata. Se volete cambiare la grafica siete liberi di farlo.

Milestone 0:
Come nel primo carosello realizzato, focalizziamoci prima sulla creazione del markup statico: costruiamo il container e inseriamo l'immagine grande in modo da poter stilare lo slider.

Milestone 1:
Ora rimuoviamo i contenuti statici e usiamo l’array di oggetti letterali per popolare dinamicamente il carosello.
Al click dell'utente sulle frecce verso sinistra o destra, l'immagine attiva diventerà visibile assieme al suo titolo e testo.

Milestone 2:
Aggiungere il "ciclo infinito" del carosello. Ovvero se la miniatura attiva è la prima e l'utente clicca la freccia verso destra, la miniatura che deve attivarsi sarà l'ultima e viceversa per l'ultima miniatura se l'utente clicca la freccia verso sinistra.

BONUS 1:
Aggiungere le thumbnails (sotto forma di miniatura) ed al click attivare l’immagine corrispondente.

BONUS 2:
Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l’immagine attiva dovrà cambiare alla successiva.

BONUS 3:
Aggiungere bottoni di start/stop  del meccanismo di autoplay.
Buon lavoro e buon divertimento!
*/


// Funzioni
const createCards = (array) => {
    let cardsArray = '';

    for (let item of array) {
        cardsArray += `
        <div class="card text-bg-dark d-none">
            <img src="${item.image}" class="card-img fit-image" alt="${item.title}">
            <div class="card-img-overlay">
                <h1 class="card-title">${item.title}</h1>
                <p class="card-text fs-5">${item.text}</p>
            </div>
        </div> 
        `
    }

    return cardsArray;
}

// Creare un set di thumbs
const createThumbs = (array) => {
    let thumbsArray = '';

    for (let item of array) {
        thumbsArray += `
        <div class="thumb-card">
            <img class="rounded-3 img-fluid fit-image" src="${item.image}" alt="${item.title}">
        </div> 
        `
    }

    return thumbsArray;
}

// Funzione per cambiare immagine
const changePic = (target) => {
    // aggiungo classe d-none / rimuovo la classe active dalla thumb
    cards[currentIndex].classList.add('d-none');
    thumbs[currentIndex].classList.remove('active');


    if (target === 'next') {
        currentIndex++;

        //se l'index supera la lunghezza massima delle cards lo riporto a 0
        if (currentIndex === cards.length) currentIndex = 0;
    }
    else if (target === 'prev') {
        currentIndex--;

        //se l'index supera la lunghezza minima delle cards lo riporto all'ultima card
        if (currentIndex < 0) currentIndex = cards.length - 1;
    }
    else {
        //l'index sarà proprio quello passato
        currentIndex = target;
    }

    //rimuovo la classe d-none per mostrare la nuova card/aggiungo classe active per mostrare la thumb
    cards[currentIndex].classList.remove('d-none');
    thumbs[currentIndex].classList.add('active');
}

// Funzione dell'autoplay
const startAndStop = () => {
    isStarted = !isStarted;

    // Fermo l'autoplay e automaticamente cambia in play
    if (!isStarted) {
        play.classList.remove('d-none');
        pause.classList.add('d-none');

        clearInterval(motion);
    }
    // oppure riparte l'autoplay e cambia in play 
    else {
        play.classList.add('d-none');
        pause.classList.remove('d-none');

        motion = setInterval(() => {
            changePic('next');
        }, 3000);
    }
}

// Funzione di stop autoplay se cliccati i bottoni di next, prev o un thumb
const stopMotion = () => {
    isStarted = !isStarted;

    //si ferma l'autoplay
    clearInterval(motion);

    // il button autoplay a play
    play.clearList.add('d-none');
    pause.clearList.remove('d-none');
}


//recupero elementi dal DOM
const gallery = document.getElementById('gallery');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const play = document.getElementById('play');
const pause = document.getElementById('pause');
const thumbsGallery = document.getElementById('thumbnails');

//butto in pagina il set di cards e di thumbs con la funzione creata
gallery.innerHTML = createCards(data);
thumbsGallery.innerHTML = createThumbs(data);

//metto in variabile l'array di cards e thumbs create
const cards = document.querySelectorAll('#gallery .card');
const thumbs = document.querySelectorAll('#thumbnails .thumb-card');


// Avvio pagina
let currentIndex = 0;
cards[currentIndex].classList.remove('d-none');
thumbs[currentIndex].classList.add('active');

//Ogni 3 secondi la card ed il thumb cambiano automaticamente
let motion = setInterval(() => {
    changePic('next');
}, 3000);

//variabile d'appoggio per l'autoplay
let isStarted = true;

// Eventi dinamici

// al click del button next
next.addEventListener('click', () => {
    //cambio immagine verso destra
    changePic('next');

    //fermo l'autoplay
    stopMotion();
});

// al click del button prev
prev.addEventListener('click', () => {
    //cambio immagine verso sinistra
    changePic('prev');

    //fermo l'autoplay
    stopMotion();
});

// ciclando all'interno dei thumbs, ad ogni click di singolo thumb
thumbs.forEach((thumb, i) => {
    //viene mostrato il thumb cliccato
    thumb.addEventListener('click', () => {
        changePic(i);

        //fermo l'autoplay
        stopMotion();
    });
});

// Al click si ferma l'autoplay
pause.addEventListener('click', () => {
    startAndStop();
});

//Al click riparte l'autoplay
play.addEventListener('click', () => {
    startAndStop();
});




