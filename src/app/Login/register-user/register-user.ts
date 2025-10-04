import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { Constants } from '../../comfig/constants';
import { RegisterPostRes } from '../../model/res/register_post_res';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HttpClientModule],
  templateUrl: './register-user.html',
  styleUrls: ['./register-user.scss']
})
export class RegisterUser {
  constants = new Constants();

  email = '';
  password = '';
  username = '';
  avatarFile!: File;
 previewUrl: string | ArrayBuffer | null | undefined = null;

  @ViewChild('avatarInput') avatarInput!: ElementRef<HTMLInputElement>;

  constructor(private http: HttpClient, private router: Router) {}

  // ✅ เมื่อคลิกที่รูป
  onAvatarClick() {
    this.avatarInput.nativeElement.click(); // trigger input file
  }

  // ✅ เมื่อผู้ใช้เลือกไฟล์
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.avatarFile = file;

      // ✅ สร้างภาพ preview
      const reader = new FileReader();
      reader.onload = (e) => (this.previewUrl = e.target?.result);
      reader.readAsDataURL(file);
    }
  }

  // ✅ เมื่อกดปุ่มสมัคร
  onRegister() {
    if (!this.email || !this.password || !this.username || !this.avatarFile) {
      alert('กรุณากรอกข้อมูลให้ครบ');
      return;
    }

    const formData = new FormData();
    formData.append('email', this.email);
    formData.append('username', this.username);
    formData.append('password', this.password);
    formData.append('avatar', this.avatarFile);

    const url = `${this.constants.API_ENDPOINT}/register/user`;

    this.http.post<RegisterPostRes>(url, formData).subscribe({
      next: (res) => {
        console.log('✅ Register success:', res);
        alert(`${res.message}\nUser ID: ${res.user_id}`);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('❌ Register failed:', err);
        alert(err.error?.message || 'สมัครสมาชิกไม่สำเร็จ');
      }
    });
  }
}
