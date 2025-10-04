import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-user',
  imports: [],
  templateUrl: './main-user.html',
  styleUrl: './main-user.scss'
})
export class MainUser {
  constructor(private auth: AuthService, private router: Router) {}

  doLogin() {
    // ตรวจสอบ username/password ตามจริงก่อนนะ
    this.auth.logout();   // ✅ set login = true
    this.router.navigate(['']); // ไปหน้า mainuser
  }
}
