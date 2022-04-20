import { Component, OnInit, Input } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

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

  @Input() listado;

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
  textoBoton() {
    var texto = document.getElementById('boton1');
    if (texto.innerText == 'Comenzar Juego')
      texto.innerText = 'Reiniciar Juego';
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
    if (this.mazoMezclado.length)
      this.cartasEnMano.push(this.mazoMezclado.shift()!);
  }

  drop(event: CdkDragDrop<Carta[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
