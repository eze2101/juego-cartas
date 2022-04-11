import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

import { Carta } from '../../interfaces/carta.interface';

import { CartasService } from '../services/cartas.service';
import ListaCartas from 'src/assets/data-cartas/data-cartas.json';

@Component({
  selector: 'app-mano',
  templateUrl: './mano.component.html',
  styleUrls: ['./mano.component.css'],
})
export class ManoComponent implements OnInit {
  private cartas: Carta[] = ListaCartas;
  mazo: Carta[] = [...this.cartas];
  mazoMezclado: Carta[] = [];
  cementerio: Carta[] = [];

  cartasEnMano: Carta[] = [];

  constructor(private cartasServices: CartasService) {}
  ngOnInit(): void {
    this.cartasServices.cartaMia$.subscribe((resp) => {
      this.cartasEnMano.push(resp);
    });

    this.cartasServices.cementerioMio$.subscribe((resp) =>
      this.cementerio.push(resp)
    );

    this.cartasServices.levantar$.subscribe((resp) => this.levantar());
  }

  iniciarJuego() {
    this.mazoMezclado = this.cartasServices.mezclarCartas(this.mazo);
    this.cartasEnMano = this.mazoMezclado.splice(0, 7);
    this.cartasServices.juegoIniciado$.emit(true);
    this.cementerio = [];
  }

  JugarCarta(carta: Carta, mazo: Carta[]) {
    var comprobar;
    comprobar = this.cartasServices.jugarCartaMia(carta, mazo);

    if (comprobar !== null) {
      this.cartasEnMano = comprobar;
    }
    this.cartasServices.jugarCarta$.emit(true);
  }

  levantar() {
    console.log(this.mazoMezclado);
    console.log(this.mazoMezclado[0]);
    this.cartasEnMano.push(this.mazoMezclado.shift()!);
    console.log(this.mazoMezclado[0]);
  }
}
/*mazo: Carta[] = this.cartasServices.mazo;
  mazomezclado: Carta[] = [];
  cartasEnMano: Carta[] = [];
  cementerio: Carta[] = [];

  constructor(private cartasServices: CartasService) {}
  ngOnInit(): void {
    this.cartasServices.mazoMezclado$.subscribe((resp) => {
      this.mazomezclado = resp;
    });

    this.cartasServices.cartasEnMano$.subscribe((resp) => {
      this.cartasEnMano = resp;
    });

    this.cartasServices.cementerio$.subscribe((resp) => {
      this.cementerio = resp;
    });
  }

  iniciarJuego() {
    this.cartasServices.ComenzarJuego(this.mazo);
  }

  JugarCarta(carta: Carta) {
    this.cartasServices.jugarCarta(carta);
  }*/
