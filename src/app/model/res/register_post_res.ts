export interface RegisterPostRes {
  message: string;      // ข้อความตอบกลับจากเซิร์ฟเวอร์
  user_id: number;      // รหัสผู้ใช้ที่เพิ่งสมัครเสร็จ
  avatar_url: string;   // ลิงก์รูปภาพโปรไฟล์หลังอัปโหลดสำเร็จ
}