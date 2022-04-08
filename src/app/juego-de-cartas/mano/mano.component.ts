import { Component, OnInit } from '@angular/core';
import { Carta } from '../../interfaces/carta.interface';
import ListaCartas from 'src/assets/data-cartas/data-cartas.json';
import { CartasService } from '../services/cartas.service';

@Component({
  selector: 'app-mano',
  templateUrl: './mano.component.html',
  styleUrls: ['./mano.component.css'],
})
export class ManoComponent implements OnInit {
  private mazo: Carta[] = ListaCartas;
  Mazo: Carta[] = [...this.mazo];
  mazoMezclado: Carta[] = [];

  constructor(private carasService: CartasService) {}
  ngOnInit(): void {
    console.log(this.Mazo);
  }

  mezclarCartas() {
    console.log(this.Mazo);
    this.mazoMezclado = this.carasService.mezclarCartas(this.Mazo);
    console.log(this.mazoMezclado);
  }
}
/*manoInicial() {
    for (let index = 0; index < 7; index++) {
      this.cartasIniciales.push(this.cartas[index]);
    }
    console.log(this.cartasIniciales);
    return this.cartasIniciales;
  }*/
