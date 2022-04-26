import { Component, Input, OnInit } from '@angular/core';
import { Carta } from 'src/app/interfaces/carta.interface';

type tipos = 'mano' | 'juego' | 'listado';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css'],
})
export class CartaComponent implements OnInit {
  @Input() carta!: Carta;
  @Input() estilos: tipos;
  constructor() {}

  ngOnInit(): void {}

  getClassCss(estilos) {
    switch (estilos) {
      case 'mano':
        return 'mano';

      case 'listado':
        return 'listado';
      case 'juego':
        if (this.carta.propietario === 'jugador') {
          return 'Mia';
        } else {
          return 'Oponent';
        }
      default:
        break;
    }
    return null;
  }
}
