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
  cartasEnCampo: Carta[] = this.CartasService.cartasEnCampo;

  constructor(private CartasService: CartasService) {}

  ngOnInit(): void {}

  combate() {
    this.CartasService.combate();
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
      this.CartasService.cartasEnCampo.push(this.cartamia[0]);
      this.CartasService.cartaMia = this.cartamia[0];
      this.CartasService.jugarCarta$.emit(true);
      this.cartamia = [];
    }
  }
}
/*drop(event: CdkDragDrop<Carta[]>) {
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
  } */
