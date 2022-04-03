import { EventEmitter, Injectable, Output } from '@angular/core';
import { Carta } from '../../interfaces/carta.interface';

@Injectable({
  providedIn: 'root',
})
export class CartasService {
  @Output() disparador: EventEmitter<Carta[]> = new EventEmitter();
}
