/**
 * 2C = two of Clubs 
 * 2D = two of Diamons
 * 2H = two of Hearts 
 * 2S = two of Spades
 */

let deck         = [];
const tipos      = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

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
    console.log(deck);
    return deck;
}


crearDeck();