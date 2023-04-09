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


const btnNuevo   = document.querySelector('#btnNuevo');
const btnPedir   = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');

const divCartasJugador     = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

const puntosHTML = document.querySelectorAll('small');

//esta funcion crea un nuevo deck
const crearDeck = () =>{

    for( let i = 2; i <= 10; i++){
        for (let tipo of tipos) { 
            deck.push( i + tipo);
        }
    }

    for (let tipo of tipos) {
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

// Turno de la computadora
const turnoComputadora = (puntosMinimo) =>{

    do{
    const carta = pedirCarta();

    puntosComputadora = puntosComputadora + valorCarta( carta );
    puntosHTML[1].innerText = puntosComputadora;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('cartas');
    divCartasComputadora.append(imgCarta);

    if( puntosMinimo > 21){
        break;
    }

    }while( (puntosComputadora < puntosMinimo) && (puntosMinimo <= 21) );


    setTimeout( () =>{
        
        if( puntosComputadora === puntosMinimo ){
            alert('Nadie Gana :c');
        }else if( puntosMinimo > 21){
            alert('Computadora Gana');
        }else if( puntosComputadora > 21){
            alert('Jugador Gana!!');
        }else{
            alert('Computadora Ganaaaa');
        }
    }, 300 );

}


// Eventos

btnPedir.addEventListener('click', () =>{

    const carta = pedirCarta();
    console.log(deck);
    puntosJugador = puntosJugador + valorCarta( carta );
    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('cartas');
    divCartasJugador.append(imgCarta);

    if( puntosJugador > 21 ){
        console.warn('Lo siento mucho, perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }else if( puntosJugador === 21 ){
        console.warn('21, Genial!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    }

});

btnDetener.addEventListener('click', () =>{

    btnDetener.disabled = true;
    btnPedir.disabled   = true;

    turnoComputadora( puntosJugador );

});

btnNuevo.addEventListener( 'click', () =>{

    console.clear();
    deck = [];
    deck = crearDeck();

    puntosJugador     = 0;
    puntosComputadora = 0;
    
    btnDetener.disabled = false;
    btnPedir.disabled   = false;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML      = '';

});