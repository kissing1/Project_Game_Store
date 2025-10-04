export interface UpdatePostReq {
  user_id: number;     // รหัสผู้ใช้ที่ต้องการอัปเดต
  username: string;    // ชื่อใหม่ของผู้ใช้
  avatar?: File;       // รูปใหม่ (optional)
}