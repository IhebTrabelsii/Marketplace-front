import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { ShopComponent } from './shop/shop.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AdminusersComponent } from './adminusers/adminusers.component';
import { ContactadminComponent } from './contactadmin/contactadmin.component';
import { HomeadminComponent } from './homeadmin/homeadmin.component';
import { CardComponent } from './card/card.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProfilComponent } from './profil/profil.component';
import { NavadminComponent } from './navadmin/navadmin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminproductComponent } from './adminproduct/adminproduct.component';
const routes: Routes = [
{
  path:'',redirectTo:'login',pathMatch:'full'
},
{
  path:'dashboard',component:DashboardComponent
},
{
  path:'home',component:HomeComponent
},
{
  path:'navadmin',component:NavadminComponent
},
{
  path:'navbar',component:NavbarComponent
},
{
  path:'about',component:AboutComponent
},
{
  path:'blog',component:BlogComponent
},
{
  path:'contact',component:ContactComponent
},
{
  path:'shop',component:ShopComponent
},
{
  path:'signup',component:SignupComponent
},
{
  path:'login',component:LoginComponent
},
{ 
   path:'adminusers',component:AdminusersComponent
  },
{
    path:'contactadmin',component:ContactadminComponent
  },
  {
    path:'homeadmin',component:HomeadminComponent
  },
  {
    path:'card',component:CardComponent
  },
  {
    path:'profil',component:ProfilComponent
  },
  { 
    path:'adminproduct',component:AdminproductComponent
   },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
