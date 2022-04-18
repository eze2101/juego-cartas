import { Component, Input, OnInit } from '@angular/core';
import { Carta } from 'src/app/interfaces/carta.interface';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css'],
})
export class CartaComponent implements OnInit {
  @Input() carta!: Carta;
  constructor() {}

  ngOnInit(): void {}
}
