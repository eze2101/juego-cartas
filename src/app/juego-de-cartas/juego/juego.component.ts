import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

import { CartasService } from '../services/cartas.service';

import { Carta } from '../../interfaces/carta.interface';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css'],
})
export class JuegoComponent implements OnInit {
  cartasEnCampo: Carta[] = [];

  constructor(private CartasService: CartasService) {}

  ngOnInit(): void {
    //vacio el campo de juego
    this.CartasService.vaciarCampo$.subscribe((resp) => {
      this.cartasEnCampo = [];
    });

    //agrego carta al campo de juego
    this.CartasService.cartasEnCampo$.subscribe((resp) => {
      this.cartasEnCampo.push(resp);
    });

    //remuevo cartas del campo de juego
    this.CartasService.cartaDerrotada$.subscribe((carta) => {
      var index = this.cartasEnCampo
        .map((card) => card.nombre)
        .indexOf(carta.nombre);
      this.cartasEnCampo.splice(index, 1);
    });
  }

  //inicar el combate
  combate() {
    if (this.cartasEnCampo.length === 2) {
      this.CartasService.combate();
    }
  }

  //drag and drop
  cartamia: Carta[] = [];
  drop(event: CdkDragDrop<Carta[]>) {
    if (event.previousContainer === event.container) {
    } else if (this.CartasService.cartaMia === undefined) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.CartasService.cartasEnCampo$.emit(this.cartamia[0]);
      this.CartasService.cartaMia = this.cartamia[0];
      this.CartasService.jugarCarta$.emit(true);
      this.cartamia = [];
    }
  }
}
