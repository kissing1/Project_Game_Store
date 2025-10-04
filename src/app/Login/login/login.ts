import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Constants } from '../../comfig/constants';
import { AuthService } from '../../services/auth.service';
import { LoginPostReq } from '../../model/req/login_post_req';
import { LoginPostRes } from '../../model/res/login_post_res';




@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HttpClientModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  email: string = '';
  password: string = '';
  constants = new Constants();

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) {}

  doLogin() {
    if (!this.email || !this.password) {
      alert('กรุณากรอกอีเมลและรหัสผ่าน');
      return;
    }

    const url = `${this.constants.API_ENDPOINT}/login`;

    // ✅ ใช้ model LoginFromReq เป็น body
    const body: LoginPostReq = {
      email: this.email,
      password: this.password
    };

    // ✅ บอก Angular ว่า response จะเป็น LoginFromRes
    this.http.post<LoginPostRes>(url, body).subscribe({
      next: (res) => {
        console.log('✅ Login success:', res);
        console.log('📩 Message:', res.message);
        console.log('🎯 User:', res.user);

        // ✅ ดึงข้อมูลผู้ใช้จาก res.user
        const user = res.user;

        // ✅ เก็บข้อมูลไว้ใน localStorage
        localStorage.setItem('userId', String(user.user_id));
        localStorage.setItem('role', user.role);

        this.auth.login();
        console.log('role from API:', user.role);

        // ✅ ตรวจสอบ role แล้วนำทางตามสิทธิ์
        if (user.role?.trim().toLowerCase() === 'admin') {
          this.router.navigate(['/mainaddmin']);
        } else {
          this.router.navigate(['/mainuser']);
        }
      },
      error: (err) => {
        console.error('❌ Login failed:', err);
        alert(err.error?.message || 'เข้าสู่ระบบไม่สำเร็จ');
      }
    });
  }
}
