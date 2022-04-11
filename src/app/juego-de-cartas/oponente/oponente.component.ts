import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

import { Carta } from '../../interfaces/carta.interface';

import { CartasService } from '../services/cartas.service';
import ListaCartas from 'src/assets/data-cartas/data-cartas.json';
@Component({
  selector: 'app-oponente',
  templateUrl: './oponente.component.html',
  styleUrls: ['./oponente.component.css'],
})
export class OponenteComponent implements OnInit {
  private cartas: Carta[] = ListaCartas;
  mazo: Carta[] = [...this.cartas];

  juegoIniciado = false;
  comprobar: Carta[] | null = null;

  mazoMezclado: Carta[] = [];
  cementerio: Carta[] = [];

  cartasEnMano: Carta[] = [];

  constructor(private cartasServices: CartasService) {}

  ngOnInit(): void {
    this.cartasServices.juegoIniciado$.subscribe(
      (resp) => (
        (this.mazoMezclado = this.cartasServices.mezclarCartas(this.mazo)),
        (this.cartasEnMano = this.mazoMezclado.splice(0, 7)),
        (this.cementerio = [])
      )
    );

    this.cartasServices.jugarCarta$.subscribe(
      (resp) => (
        (this.comprobar = this.cartasServices.jugarCartaOponente(
          this.cartasEnMano
        )),
        this.Comprobar(this.comprobar)
      )
    );

    this.cartasServices.cartaOponente$.subscribe((resp) =>
      this.cartasEnMano.push(resp)
    );

    this.cartasServices.cementerioOponente$.subscribe((resp) =>
      this.cementerio.push(resp)
    );

    this.cartasServices.levantarOponente$.subscribe((resp) =>
      this.cartasEnMano.push(this.mazoMezclado.shift()!)
    );
  }

  Comprobar(comprobar: Carta[] | null) {
    if (comprobar !== null) {
      this.cartasEnMano = comprobar;
    }
  }
}
