import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  ComoJugar() {
    const dialogRef = this.dialog.open(ComoJugar);
  }
}

@Component({
  selector: 'como-jugar',
  templateUrl: 'ComoJugar.html',
})
export class ComoJugar {}
