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

  juegoIniciado$ = new EventEmitter<boolean>();
  jugarCarta$ = new EventEmitter<boolean>();

  mazoMezclado: Carta[] = [];
  cementerio: Carta[] = [];

  cartasEnMano: Carta[] = [];
  cartasEnCampo: Carta[] = [];

  cartaMia$ = new EventEmitter<Carta>();
  cartaMia: any;
  cartaOponente$ = new EventEmitter<Carta>();
  cartaOponente: any;
  cementerioMio$ = new EventEmitter<Carta>();
  cementerioOponente$ = new EventEmitter<Carta>();
  levantar$ = new EventEmitter();
  levantarOponente$ = new EventEmitter();

  constructor(private MessageService: MessageService) {}

  ngOnInit(): void {}

  mezclarCartas(mazo: Carta[]) {
    this.cartasEnCampo.splice(0, 2);
    delete this.cartaMia;
    delete this.cartaOponente;
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

  jugarCartaMia(carta: Carta, mazo: Carta[]) {
    if (this.cartaMia === undefined) {
      this.cartaMia = carta;
      this.cartasEnCampo.push(carta);
      console.log(this.cartasEnCampo);
      var index = mazo.map((card) => card.nombre).indexOf(carta.nombre);
      mazo.splice(index, 1);
      return mazo;
    }
    return null;
  }
  jugarCartaOponente(mazo: Carta[]) {
    if (this.cartaOponente === undefined) {
      var index = Math.floor(Math.random() * mazo.length);
      this.cartaOponente = mazo[index];
      this.cartasEnCampo.push(mazo[index]);
      mazo.splice(index, 1);
      return mazo;
    }
    return null;
  }

  recuperarCartaMia(carta: Carta) {
    var index = this.cartasEnCampo
      .map((card) => card.nombre)
      .indexOf(carta.nombre);
    if (carta === this.cartaMia) {
      this.cartaMia$.emit(this.cartaMia);
      this.cartasEnCampo.splice(index, 1);
      delete this.cartaMia;
    }
  }

  recuperarCartaOponente(carta: Carta) {
    var index = this.cartasEnCampo
      .map((card) => card.nombre)
      .indexOf(carta.nombre);
    if (carta === this.cartaOponente) {
      this.cartaOponente$.emit(this.cartaOponente);
      this.cartasEnCampo.splice(index, 1);
      delete this.cartaOponente;
    }
  }

  combate() {
    if (this.cartasEnCampo.length === 2) {
      if (
        this.cartaMia.dano >= this.cartaOponente.defensa &&
        this.cartaMia.defensa <= this.cartaOponente.dano
      ) {
        this.cartaDerrotadaMia(this.cartaMia);
        this.cartaDerrotadaOponente(this.cartaOponente);
        this.levantar$.emit(true);
        this.levantarOponente$.emit(true);
        return;
      } else if (this.cartaMia.dano >= this.cartaOponente.defensa) {
        this.cartaDerrotadaOponente(this.cartaOponente);
        this.levantarOponente$.emit(true);
        return;
      } else if (this.cartaMia.defensa <= this.cartaOponente.dano) {
        this.cartaDerrotadaMia(this.cartaMia);
        this.levantar$.emit(true);
        return;
      }
      return this.Empate();
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

  cartaDerrotadaMia(carta: Carta) {
    var index = this.cartasEnCampo
      .map((card) => card.nombre)
      .indexOf(carta.nombre);
    this.cementerioMio$.emit(carta);
    this.cartasEnCampo.splice(index, 1);
    delete this.cartaMia;
  }

  cartaDerrotadaOponente(carta: Carta) {
    var index = this.cartasEnCampo
      .map((card) => card.nombre)
      .indexOf(carta.nombre);
    this.cementerioOponente$.emit(carta);
    this.cartasEnCampo.splice(index, 1);
    delete this.cartaOponente;
  }
  /*ComenzarJuego(mazo: Carta[]) {
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
  }*/
}
