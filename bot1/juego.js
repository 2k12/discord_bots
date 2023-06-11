const piedra = "piedra";
const papel = "papel";
const tijera = "tijera";


function generadoropcion() {
    let op = "";
    let rndInt = Math.floor(Math.random() * 3) + 1;
    if (rndInt == 1) {
        op = "piedra"
    }
    else if (rndInt == 2) {
        op = "papel"
    }
    else {
        op = "tijera"
    }
    return op;
}

function main(opciondeljugador) {
    let lista = [];
    let res = "";
    const op = generadoropcion();
    lista.push(op);
    if (opciondeljugador == "piedra" && op == "piedra" || opciondeljugador == "papel" && op == "papel" || opciondeljugador == "tijera" && op == "tijera") {
        res = "Empate !";
    }
    else if (opciondeljugador == "tijera" && op == "papel" || opciondeljugador == "piedra" && op == "tijera" || opciondeljugador == "papel" && op == "piedra") {
        res = "Ganaste !";
    }
    else {
        res = "Perdiste !";
    }
    lista.push(res);
    return lista;
}

module.exports = {
    main: main
};
