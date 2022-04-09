import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

import { Carta } from '../../interfaces/carta.interface';

import { CartasService } from '../services/cartas.service';

@Component({
  selector: 'app-mano',
  templateUrl: './mano.component.html',
  styleUrls: ['./mano.component.css'],
})
export class ManoComponent implements OnInit {
  mazo: Carta[] = this.cartasServices.mazo;
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
  }
}
