import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Constants } from '../../comfig/constants';
import { UpdateGetRes } from '../../model/res/update_get_res';
import { UpdatePostReq } from '../../model/req/update_post_req';
import { EditGetRes } from '../../model/res/edit_get_res';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.scss']
})
export class UserProfile implements OnInit {
  constants = new Constants();

  user: EditGetRes | null = null; // ✅ ใช้ model ใหม่ที่มีทุก field
  isEditing = false;
  editUsername = '';
  previewUrl: string | null = null;
  selectedFile?: File;

  @ViewChild('avatarInput') avatarInput!: ElementRef<HTMLInputElement>;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.loadUserData(Number(userId));
    }
  }

  /** ✅ โหลดข้อมูลผู้ใช้จาก API */
/** ✅ โหลดข้อมูลผู้ใช้จาก API */
private loadUserData(userId: number) {
  this.http.get<EditGetRes>(`${this.constants.API_ENDPOINT}/users/${userId}`).subscribe({
    next: (res) => {
      this.user = res;                // ✅ รับตรงจาก API ได้เลย
      this.editUsername = res.username;
      console.log('✅ โหลดข้อมูลผู้ใช้สำเร็จ:', this.user);
    },
    error: (err) => {
      console.error('❌ โหลดข้อมูลผู้ใช้ล้มเหลว:', err);
    }
  });
}

  /** เปิดโหมดแก้ไข */
  enableEdit() {
    this.isEditing = true;
  }

  /** ยกเลิกการแก้ไข */
  cancelEdit() {
    this.isEditing = false;
    this.previewUrl = null;
    this.selectedFile = undefined;
    this.editUsername = this.user?.username || '';
  }

  /** คลิกเลือกรูปใหม่ */
  onAvatarClick() {
    this.avatarInput.nativeElement.click();
  }

  /** แสดงรูป Preview ก่อนอัปเดต */
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => (this.previewUrl = e.target?.result as string);
      reader.readAsDataURL(file);
    }
  }

  /** ✅ ยืนยันและอัปเดตโปรไฟล์ */
  confirmUpdate() {
    if (!this.user) return;
    if (!this.editUsername.trim()) {
      alert('กรุณากรอกชื่อผู้ใช้');
      return;
    }

    // ใช้ model UpdatePostReq
    const data: UpdatePostReq = {
      user_id: Number(this.user.user_id),
      username: this.editUsername,
      avatar: this.selectedFile
    };

    const formData = new FormData();
    formData.append('user_id', data.user_id.toString());
    formData.append('username', data.username);
    if (data.avatar) formData.append('avatar', data.avatar);

    this.http.post<UpdateGetRes>(`${this.constants.API_ENDPOINT}/users/update`, formData).subscribe({
      next: (res) => {
        alert('✅ อัปเดตโปรไฟล์สำเร็จ');
        const updatedId = Number(res.user.user_id);
        // 🔥 ดึงข้อมูลเต็มอีกครั้งด้วย user_id
        this.loadUserData(updatedId);
        this.isEditing = false;
        this.previewUrl = null;
      },
      error: (err) => {
        console.error('❌ อัปเดตล้มเหลว:', err);
        alert(err.error?.message || 'ไม่สามารถอัปเดตได้');
      }
    });
  }
}
