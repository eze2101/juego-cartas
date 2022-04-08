import { EventEmitter, Injectable } from '@angular/core';
import { Carta } from '../../interfaces/carta.interface';

@Injectable({
  providedIn: 'root',
})
export class CartasService {
  mezclarCartas(mazo: Carta[]) {
    var i, j, temp;
    for (i = mazo.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = mazo[i];
      mazo[i] = mazo[j];
      mazo[j] = temp;
    }
    console.log(mazo);
    return mazo;
  }
}
