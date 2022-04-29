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
  mazo: Carta[] = this.cartas.map((carta) => {
    return { ...carta };
  });

  juegoIniciado = false;
  comprobar: Carta[] | null = null;

  mazoMezclado: Carta[] = [];
  cementerio: Carta[] = [];
  cartasEnMano: Carta[] = [];

  constructor(private cartasServices: CartasService) {}

  ngOnInit(): void {
    console.log(this.mazo);
    //mezclar y asignar mano al oponente
    this.cartasServices.juegoIniciado$.subscribe(
      (resp) => (
        (this.mazoMezclado = this.cartasServices.mezclarCartas(this.mazo)),
        (this.mazoMezclado = this.asignarJugador(
          this.mazoMezclado,
          'oponente'
        )),
        (this.cartasEnMano = this.mazoMezclado.splice(0, 7)),
        (this.cementerio = [])
      )
    );

    //jugar una carta al campo
    this.cartasServices.jugarCarta$.subscribe(
      (resp) => (
        (this.comprobar = this.cartasServices.jugarCartaOponente(
          this.cartasEnMano
        )),
        this.Comprobar(this.comprobar)
      )
    );

    //regresar una carta a la mano
    this.cartasServices.cartaOponente$.subscribe((resp) =>
      this.cartasEnMano.push(resp)
    );

    //agregar carta al cementerio
    this.cartasServices.cementerioOponente$.subscribe((resp) =>
      this.cementerio.push(resp)
    );

    //levantar carta del mazo
    this.cartasServices.levantarOponente$.subscribe((resp) => {
      if (this.mazoMezclado.length) {
        this.cartasEnMano.push(this.mazoMezclado.shift()!);
      } else if (!this.cartasEnMano.length) {
        this.cartasServices.ganaste();
      }
    });
  }

  //asigno propietario a las cartas del mazo
  asignarJugador(mazo: Carta[], prop: string): Carta[] {
    return mazo.map((carta) => {
      carta.propietario = prop;
      return carta;
    });
  }

  //compruebo que el mazo no este vacio
  Comprobar(comprobar: Carta[] | null) {
    if (comprobar !== null) {
      this.cartasEnMano = comprobar;
    }
  }
}
