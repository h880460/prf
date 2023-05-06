import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnectionService } from './utils/connection.service';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './pages/login/login.component';

// import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { DetailsComponent } from './pages/details/details.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductComponent } from './pages/product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    ErrorComponent,
    LoginComponent,
    DetailsComponent,
    RegisterComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    // AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [ConnectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
