import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminHealthTipsComponent } from './admin-health-tips/admin-health-tips.component';
import { AdminUserDetailsComponent } from './admin-user-details/admin-user-details.component';
import { AdminManagementComponent } from './admin-management/admin-management.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AdminProductFormComponent } from './admin-product-form/admin-product-form.component';



@NgModule({
  declarations: [
    AppComponent,
  
 
   
   
  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
   
  ],
    
  

  bootstrap: [AppComponent]
})
export class AppModule { }
