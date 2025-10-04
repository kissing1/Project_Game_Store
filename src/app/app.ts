import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { Header } from './components/header/header';
import { HeaderAddmin } from './components/header-addmin/header-addmin';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, CommonModule, HeaderAddmin],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  title = 'game_stores';
  isLoggedIn = false;
  role: string | null = null; // ✅ เพิ่มตัวแปรเก็บ role

  constructor(private auth: AuthService, public router: Router) {}

  ngOnInit() {
    // ✅ subscribe ค่า login จาก AuthService
    this.auth.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      this.role = this.auth.getRole(); // ✅ ดึง role ทุกครั้งที่ login สำเร็จ
    });

    // ✅ โหลด role ครั้งแรก (กัน header หายตอน refresh)
    this.role = this.auth.getRole();
  }
}
