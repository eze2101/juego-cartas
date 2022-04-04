import { Injectable } from '@angular/core';

import { Carta } from 'src/app/interfaces/carta.interface';

import ListaCartas from 'src/assets/data-cartas/data-cartas.json';

@Injectable({
  providedIn: 'root',
})
export class CartasService {
  iniciojuego = false;
  cartas: Carta[] = ListaCartas;
  cartasEnMano: Carta[] = [];

  cartasEnCampo: Carta[] = [];
  cartaDevuelta: Carta[] = [];

  constructor() {}

  ngOnInit(): void {}

  mezclarCartas() {
    var i, j, temp;
    for (i = this.cartas.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = this.cartas[i];
      this.cartas[i] = this.cartas[j];
      this.cartas[j] = temp;
    }

    return this.cartas;
  }

  ComenzarJuego() {
    if (this.iniciojuego === false) {
      this.mezclarCartas();
      for (let index = 0; index < 7; index++) {
        this.cartasEnMano.push(this.cartas.shift()!);
      }
      this.iniciojuego = true;
      return this.cartasEnMano;
    } else return;
  }

  jugarCarta(carta: Carta) {
    var index = this.cartasEnMano
      .map((card) => card.nombre)
      .indexOf(carta.nombre);
    if (this.cartasEnCampo.length < 2) {
      this.cartasEnMano.splice(index, 1);
      this.cartasEnCampo.push(carta);
      console.log(this.cartasEnMano);
      console.log(this.cartasEnCampo);
    } else {
      return;
    }
  }

  recuperarCarta(carta: Carta) {
    var index = this.cartasEnCampo
      .map((card) => card.nombre)
      .indexOf(carta.nombre);
    this.cartasEnMano.push(carta);
    this.cartasEnCampo.splice(index, 1);
    console.log(carta);
  }
}
