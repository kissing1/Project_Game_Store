export interface UpdateGetRes {
  message: string;  // ข้อความตอบกลับ เช่น "User updated successfully"
  user: UpdatedUser; // ข้อมูลผู้ใช้ที่อัปเดตแล้ว
}

// ✅ โครงสร้างข้อมูลผู้ใช้ที่ตอบกลับมา
export interface UpdatedUser {
  user_id: string;      // ID ผู้ใช้
  username: string;     // ชื่อผู้ใช้ใหม่
  avatar_url: string;   // URL ของรูปโปรไฟล์ใหม่
}
