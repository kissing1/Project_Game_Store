export interface RegisterPostReq {
  email: string;      // อีเมลของผู้ใช้
  username: string;   // ชื่อผู้ใช้
  password: string;   // รหัสผ่าน
  avatar: File;       // รูปโปรไฟล์ (อัปโหลดเป็นไฟล์)
}