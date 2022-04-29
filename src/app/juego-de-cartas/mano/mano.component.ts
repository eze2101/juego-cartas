import { Component, OnInit, Input, EventEmitter } from '@angular/core';
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
  mazo: Carta[] = this.cartas.map((carta) => {
    return { ...carta };
  });

  mazoMezclado: Carta[] = [];
  cementerio: Carta[] = [];
  cartasEnMano: Carta[] = [];

  @Input() listado;

  Perdi$ = new EventEmitter<boolean>();

  constructor(private cartasServices: CartasService) {}
  ngOnInit(): void {
    //regreso carta a la mano
    this.cartasServices.cartaMia$.subscribe((resp) => {
      this.cartasEnMano.push(resp);
    });

    //agrego carta al cementerio
    this.cartasServices.cementerioMio$.subscribe((resp) =>
      this.cementerio.push(resp)
    );

    //levanto una carta del mazo
    this.cartasServices.levantar$.subscribe((resp) => this.levantar());
  }

  //inicio el juego
  iniciarJuego() {
    this.mazoMezclado = this.cartasServices.mezclarCartas(this.mazo);
    this.mazoMezclado = this.asignarJugador(this.mazoMezclado, 'jugador');
    this.cartasEnMano = this.mazoMezclado.splice(0, 7);
    this.cartasServices.juegoIniciado$.emit(true);
    this.cartasServices.vaciarCampo$.emit(true);
    this.cementerio = [];
  }

  //asigno propietario a las cartas del mazo
  asignarJugador(mazo: Carta[], prop: string): Carta[] {
    return mazo.map((carta) => {
      carta.propietario = prop;
      return carta;
    });
  }

  //cambio texto del boton
  textoBoton() {
    var texto = document.getElementById('boton1');
    if (texto.innerText == 'Comenzar Juego')
      texto.innerText = 'Reiniciar Juego';
  }

  //jugar una carta de la mano
  JugarCarta(carta: Carta, mazo: Carta[]) {
    var comprobar;
    comprobar = this.cartasServices.jugarCartaMia(carta, mazo);

    if (comprobar !== null) {
      this.cartasEnMano = comprobar;
    }
    this.cartasServices.jugarCarta$.emit(true);
  }

  //levantar una carta
  levantar() {
    if (this.mazoMezclado.length) {
      this.cartasEnMano.push(this.mazoMezclado.shift()!);
    } else if (!this.cartasEnMano.length) {
      this.cartasServices.perdiste();
    }
  }

  //drag and drop
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
