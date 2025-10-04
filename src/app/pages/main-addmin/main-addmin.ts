import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-addmin',
  imports: [],
  templateUrl: './main-addmin.html',
  styleUrl: './main-addmin.scss'
})
export class MainAddmin {
constructor(private auth: AuthService, private router: Router) {}

  doLogout() {
    // ตรวจสอบ username/password ตามจริงก่อนนะ
    this.auth.logout();   // ✅ set login = true
    this.router.navigate(['']); // ไปหน้า mainuser
  }
}
