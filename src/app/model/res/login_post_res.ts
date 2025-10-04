export interface LoginPostRes {
    message: string;
    user:    User;
}

export interface User {
    user_id:        number;
    username:       string;
    email:          string;
    avatar_url:     string;
    wallet_balance: string;
    role:           string;
}
