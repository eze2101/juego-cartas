import { Injectable } from '@angular/core';

import { Carta } from 'src/app/interfaces/carta.interface';

import ListaCartas from 'src/assets/data-cartas/data-cartas.json';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class CartasService {
  iniciojuego = false;
  private cartas: Carta[] = ListaCartas;
  mazo: Carta[] = [...this.cartas];
  mazoMezclado: Carta[] = [];
  cartasEnMano: Carta[] = [];

  cartasEnCampo: Carta[] = [];
  cartaDevuelta: Carta[] = [];

  mazoDeDescarte: Carta[] = [];

  constructor(private MessageService: MessageService) {}

  ngOnInit(): void {}

  mezclarCartas() {
    for (let index = 0; index < this.mazo.length; index++) {
      this.mazoMezclado.push(this.mazo[index]);
    }

    var i, j, temp;
    for (i = this.mazoMezclado.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = this.mazoMezclado[i];
      this.mazoMezclado[i] = this.mazoMezclado[j];
      this.mazoMezclado[j] = temp;
    }
  }

  ComenzarJuego() {
    if (this.iniciojuego === false) {
      this.mezclarCartas();
      for (let index = 0; index < 7; index++) {
        this.cartasEnMano.push(this.mazoMezclado.shift()!);
      }
      this.iniciojuego = true;
    } else {
      this.iniciojuego = false;
      for (let index = 0; index < 30; index++) {
        this.cartasEnMano.shift();
        this.cartasEnCampo.shift();
        this.mazoDeDescarte.shift();
        this.mazoMezclado.shift();
      }

      this.ComenzarJuego();
    }
  }

  levantar() {
    if (this.mazoMezclado.length >= 1) {
      this.cartasEnMano.push(this.mazoMezclado.shift()!);
    }
  }

  jugarCarta(carta: Carta) {
    var index = this.cartasEnMano
      .map((card) => card.nombre)
      .indexOf(carta.nombre);
    if (this.cartasEnCampo.length < 2) {
      this.cartasEnMano.splice(index, 1);
      this.cartasEnCampo.push(carta);
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
    var index = this.cartasEnCampo
      .map((card) => card.nombre)
      .indexOf(carta.nombre);
    this.mazoDeDescarte.push(carta);
    this.cartasEnCampo.splice(index, 1);
    console.log(this.mazoDeDescarte);
  }
}
