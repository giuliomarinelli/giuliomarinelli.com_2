import { Component, ViewChild, afterNextRender } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: '#root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor() {
    afterNextRender(() => {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        console.log('dark mode')
      } else {
        console.log('light mode')
      }
    })
  }

  @ViewChild('sidenav') protected sidenav!: MatSidenav;




  title = 'giuliomarinelli.com';
}
