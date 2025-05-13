import { Routes } from '@angular/router';

export const routes: Routes = [{
    path:'',
    pathMatch: 'full',
    loadComponent:()=> {
        return import('./components/homepage/homepage.component').then((m)=> m.HomepageComponent)
    }},{
    path:'login',
    loadComponent:()=>{
        return import('./components/login/login.component').then((m)=> m.LoginComponent)
    }},{
    path:'register',
    pathMatch: 'full',
    loadComponent:()=> {
        return import('./components/register/register.component').then((m)=> m.RegisterComponent)
    }},{
    path:'contact',
    loadComponent:()=>{
        return import('./components/contact/contact.component').then((m)=> m.ContactComponent)
    }},{
    path:'about',
    pathMatch: 'full',
    loadComponent:()=> {
        return import('./components/about/about.component').then((m)=> m.AboutComponent)
    }},{
    path:'blogs',
    loadComponent:()=>{
        return import('./components/blogs/blogs.component').then((m)=> m.BlogsComponent)
    },
}];
