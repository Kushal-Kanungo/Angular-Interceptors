import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthInterceptor } from './auth.interceptor';
import { AuthGuardService } from './services/guard/auth-guard.service';
import { LoaderComponent } from './loader/loader.component';
import { LoaderInterceptor } from './interceptor/loader.interceptor';
import { NavbarComponent } from './navbar/navbar.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LoginLoaderComponent } from './login-loader/login-loader.component';
import { CanDeactivateGuard } from './dashboard/can-deactivate-guard.service';
import { MyFormComponent } from './my-form/my-form.component';
import { DragDirective } from './dragDropFileUpload.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LoaderComponent,
    NavbarComponent,
    LoginLoaderComponent,
    MyFormComponent,
    DragDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    InfiniteScrollModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    AuthGuardService,
    CanDeactivateGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
