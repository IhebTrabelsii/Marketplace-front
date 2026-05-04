import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ShopComponent } from './shop/shop.component';
import { ContactComponent } from './contact/contact.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductFormComponent } from './product-form/product-form.component';
import { AdminusersComponent } from './adminusers/adminusers.component';
import { ContactadminComponent } from './contactadmin/contactadmin.component';
import { HomeadminComponent } from './homeadmin/homeadmin.component';
import { CardComponent } from './card/card.component';
import { HttpLoaderFactory } from './app.module';
import { ProfilComponent } from './profil/profil.component';
import { CommonModule } from '@angular/common';
import { NavadminComponent } from './navadmin/navadmin.component';
import { SideadminComponent } from './sideadmin/sideadmin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminproductComponent } from './adminproduct/adminproduct.component';
import { FilterPipe } from './filter.pipe';


@NgModule({
  declarations: [
    FilterPipe,
    ProfilComponent,
    AppComponent,
    HomeComponent,
    AboutComponent,
    ShopComponent,
    ContactComponent,
    NavadminComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    SignupComponent,
    ProductFormComponent,
    AdminusersComponent,
    ContactadminComponent,
    HomeadminComponent,
    CardComponent,
    SideadminComponent,
    AdminproductComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule {
}
