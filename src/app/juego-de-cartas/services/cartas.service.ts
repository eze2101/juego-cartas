import { EventEmitter, Injectable } from '@angular/core';

import { Carta } from 'src/app/interfaces/carta.interface';

import ListaCartas from 'src/assets/data-cartas/data-cartas.json';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class CartasService {
  private cartas: Carta[] = ListaCartas;
  mazo: Carta[] = [...this.cartas];

  mazoMezclado: Carta[] = [];
  cementerio: Carta[] = [];

  cartasEnMano: Carta[] = [];
  cartasEnCampo: Carta[] = [];

  mazoMezclado$ = new EventEmitter<Carta[]>();
  cartasEnMano$ = new EventEmitter<Carta[]>();
  cementerio$ = new EventEmitter<Carta[]>();

  constructor(private MessageService: MessageService) {}

  ngOnInit(): void {}

  mezclarCartas(mazo: Carta[]) {
    const mazoMezclado: Carta[] = [];
    for (let index = 0; index < mazo.length; index++) {
      mazoMezclado.push(mazo[index]);
    }

    var i, j, temp;
    for (i = mazoMezclado.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = mazoMezclado[i];
      mazoMezclado[i] = mazoMezclado[j];
      mazoMezclado[j] = temp;
    }
    return mazoMezclado;
  }

  ComenzarJuego(mazo: Carta[]) {
    this.mazoMezclado = this.mezclarCartas(mazo);
    this.mazoMezclado$.emit(this.mazoMezclado);
    this.cartasEnMano = this.mazoMezclado.slice(0, 7);
    this.cartasEnMano$.emit(this.cartasEnMano);
  }

  levantar() {
    if (this.mazoMezclado.length) {
      this.cartasEnMano.push(this.mazoMezclado.shift()!);
    }
  }

  jugarCarta(carta: Carta) {
    var index = this.cartasEnMano
      .map((card) => card.nombre)
      .indexOf(carta.nombre);
    if (this.cartasEnCampo.length < 2) {
      this.cartasEnMano.splice(index, 1);
      this.cartasEnCampo.push(carta);
    } else {
      return;
    }
  }

  recuperarCarta(carta: Carta) {
    var index = this.cartasEnCampo
      .map((card) => card.nombre)
      .indexOf(carta.nombre);
    this.cartasEnMano.push(carta);
    this.cartasEnCampo.splice(index, 1);
  }

  Combate() {
    if (this.cartasEnCampo.length === 2) {
      if (
        this.cartasEnCampo[0].dano >= this.cartasEnCampo[1].defensa &&
        this.cartasEnCampo[1].dano >= this.cartasEnCampo[0].defensa
      ) {
        this.cartaDerrotada(this.cartasEnCampo[1]);
        this.cartaDerrotada(this.cartasEnCampo[0]);
        this.levantar();
        this.levantar();

        return;
      } else if (this.cartasEnCampo[0].dano >= this.cartasEnCampo[1].defensa) {
        this.cartaDerrotada(this.cartasEnCampo[1]);
        this.levantar();

        return;
      } else if (this.cartasEnCampo[1].dano >= this.cartasEnCampo[0].defensa) {
        this.cartaDerrotada(this.cartasEnCampo[0]);
        this.levantar();
        return;
      } else return this.Empate();
    }
  }

  Empate() {
    this.MessageService.add({
      severity: 'success',
      summary: 'Empate',
      detail: 'Ninguna puede vencer',
      life: 3000,
      //sticky: true,
    });
  }

  cartaDerrotada(carta: Carta) {
    var index = this.cartasEnCampo
      .map((card) => card.nombre)
      .indexOf(carta.nombre);
    this.cementerio.push(carta);
    this.cartasEnCampo.splice(index, 1);
    this.cementerio$.emit(this.cementerio);
  }
}
