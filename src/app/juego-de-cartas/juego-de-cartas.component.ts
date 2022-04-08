import { Component, OnInit } from '@angular/core';

import { Carta } from '../interfaces/carta.interface';

import ListaCartas from 'src/assets/data-cartas/data-cartas.json';
import { CartasService } from './services/cartas.service';
import { timeStamp } from 'console';

@Component({
  selector: 'app-juego-de-cartas',
  templateUrl: './juego-de-cartas.component.html',
  styles: [],
})
export class JuegoDeCartasComponent implements OnInit {
  private cartas: Carta[] = ListaCartas;
  mazo: Carta[] = [...this.cartas];
  mazoMezclado: Carta[] = [];
  cartasEnMano: Carta[] = [];

  cartasEnCampo: Carta[] = [];
  cartaDevuelta: Carta[] = [];

  cementerio: Carta[] = [];

  constructor(private CartasService: CartasService) {}

  ngOnInit(): void {}

  ComenzarJuego() {
    this.mazoMezclado = this.CartasService.mezclarCartas(this.mazo);

    // this.mazoMezclado.forEach((carta, index) => {
    //   if(index<7){
    //     this.cartasEnMano.push(this.mazoMezclado.shift()!);
    //   }});

    this.cartasEnMano = this.mazoMezclado.splice(0, 7);
  }

  getMazo() {
    return this.mazoMezclado;
  }

  levantar() {
    if (this.mazoMezclado.length) {
      this.cartasEnMano.push(this.mazoMezclado.shift()!);
    }
  }

  jugarCartas(carta: Carta) {
    this.cartasEnMano = this.cartasEnMano.filter((item) => {
      item.nombre !== carta.nombre;
    });
    this.cartasEnCampo.push(carta);
  }

  recuperarCarta(carta: Carta) {
    this.cartasEnCampo = this.cartasEnCampo.filter((item) => {
      item.nombre !== carta.nombre;
    });
    this.cartasEnMano.push(carta);
  }
}
