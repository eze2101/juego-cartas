import { Injectable } from '@angular/core';

import { Carta } from 'src/app/interfaces/carta.interface';

import ListaCartas from 'src/assets/data-cartas/data-cartas.json';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class CartasService {
  iniciojuego = false;
  cartas: Carta[] = ListaCartas;
  cartasEnMano: Carta[] = [];

  cartasEnCampo: Carta[] = [];
  cartaDevuelta: Carta[] = [];

  mazoDeDescarte: Carta[] = [];

  constructor(private MessageService: MessageService) {}

  ngOnInit(): void {}

  indexCarta(carta: Carta) {
    var index = this.cartasEnMano
      .map((card) => card.nombre)
      .indexOf(carta.nombre);
    return index;
  }

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

  levantar() {
    if (this.cartas.length >= 1) {
      this.cartasEnMano.push(this.cartas.shift()!);
    }
  }

  jugarCarta(carta: Carta) {
    var index = this.indexCarta(carta);
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
    var index = this.indexCarta(carta);
    this.cartasEnMano.push(carta);
    this.cartasEnCampo.splice(index, 1);
    console.log(carta);
    console.log(this.cartasEnCampo);
  }

  Combate() {
    if (this.cartasEnCampo.length === 2) {
      if (
        this.cartasEnCampo[0].dano >= this.cartasEnCampo[1].defensa &&
        this.cartasEnCampo[1].dano >= this.cartasEnCampo[0].defensa
      ) {
        this.cartaDerrotada(this.cartasEnCampo[1]);
        this.cartaDerrotada(this.cartasEnCampo[0]);
        this.levantar();
        this.levantar();

        return;
      } else if (this.cartasEnCampo[0].dano >= this.cartasEnCampo[1].defensa) {
        this.cartaDerrotada(this.cartasEnCampo[1]);
        this.levantar();

        return;
      } else if (this.cartasEnCampo[1].dano >= this.cartasEnCampo[0].defensa) {
        this.cartaDerrotada(this.cartasEnCampo[0]);
        this.levantar();
        return;
      } else return this.Empate();
    }
  }

  Empate() {
    this.MessageService.add({
      severity: 'success',
      summary: 'Empate',
      detail: 'Ninguna puede vencer',
      life: 3000,
      //sticky: true,
    });
  }

  cartaDerrotada(carta: Carta) {
    var index = this.indexCarta(carta);
    this.mazoDeDescarte.push(carta);
    this.cartasEnCampo.splice(index, 1);
    console.log(this.mazoDeDescarte);
  }
}
