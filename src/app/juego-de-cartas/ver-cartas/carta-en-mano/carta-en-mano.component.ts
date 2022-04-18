import { Component, Input, OnInit } from '@angular/core';

import { Carta } from 'src/app/interfaces/carta.interface';

@Component({
  selector: 'app-carta-en-mano',
  templateUrl: './carta-en-mano.component.html',
  styleUrls: ['./carta-en-mano.component.css'],
})
export class CartaEnManoComponent implements OnInit {
  @Input() carta!: Carta;

  constructor() {}

  ngOnInit(): void {}
}
