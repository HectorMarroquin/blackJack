/**
 * 2C = two of Clubs 
 * 2D = two of Diamons
 * 2H = two of Hearts 
 * 2S = two of Spades
 */

let deck         = [];
const tipos      = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let puntosJugador = 0,
    puntosComputadora = 0;
//Referencias del HTML


const btnPedir = document.querySelector('#btnPedir');
const puntosHTML = document.querySelectorAll('small');

//esta funcion crea un nuevo deck
const crearDeck = () =>{

    for( let i = 2; i <= 10; i++){
        for (let tipo of tipos) { 
            deck.push( i + tipo);
        }
    }

    for (let tipo of especiales) {
        for (let esp of especiales) {
            deck.push(esp + tipo);
        }
    }

    deck = _.shuffle( deck );
    return deck;
}


crearDeck();

//Esta funcion me permite tomar una carta
const pedirCarta = () =>{

    if( deck.length === 0){
        throw 'No hay cartas en el deck';
    }

    const carta = deck.pop();
    return carta;
}

pedirCarta();

const valorCarta = (carta) =>{

    const valor = carta.substring(0, carta.length-1);
    return( isNaN( valor ) ) ?
            ( valor === 'A' ) ? 11 : 10
            : valor * 1;
}

// Eventos

btnPedir.addEventListener('click', () =>{

    console.log('prueba');
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta( carta );

    console.log(puntosJugador);

    puntosHTML[0].innerText = puntosJugador;

});