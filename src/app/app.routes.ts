import { Routes } from '@angular/router';
import { Login } from './Login/login/login';
import { MainUser } from './pages/main-user/main-user';
import { RegisterUser } from './Login/register-user/register-user';
import { MainAddmin } from './pages/main-addmin/main-addmin';
import { UserProfile } from './pages/user-profile/user-profile';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: Login },   
    {path:'mainuser',component:MainUser},
    {path:'registeruser',component:RegisterUser},
    {path:'mainaddmin',component:MainAddmin},
    {path:'userprofile',component:UserProfile},
];
