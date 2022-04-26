import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { Carta } from '../../interfaces/carta.interface';

import { CartasService } from '../services/cartas.service';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css'],
})
export class JuegoComponent implements OnInit {
  cartasEnCampo: Carta[] = [];

  constructor(private CartasService: CartasService) {}

  ngOnInit(): void {
    this.CartasService.vaciarCampo$.subscribe((resp) => {
      this.cartasEnCampo = [];
    });

    this.CartasService.cartasEnCampo$.subscribe((resp) => {
      this.cartasEnCampo.push(resp);
    });

    this.CartasService.cartaDerrotada$.subscribe((carta) => {
      var index = this.cartasEnCampo
        .map((card) => card.nombre)
        .indexOf(carta.nombre);
      this.cartasEnCampo.splice(index, 1);
    });
  }

  combate() {
    if (this.cartasEnCampo.length === 2) {
      this.CartasService.combate();
    }
  }

  cartamia: Carta[] = [];
  drop(event: CdkDragDrop<Carta[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else if (this.CartasService.cartaMia === undefined) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.CartasService.cartaMia = this.cartamia[0];
      this.CartasService.jugarCarta$.emit(true);
      this.cartamia = [];
    }
  }
}
