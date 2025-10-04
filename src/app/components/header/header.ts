import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink,CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

   userId: string | null = null;

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    console.log('🧩 Header loaded userId:', this.userId);
  }
  
}
