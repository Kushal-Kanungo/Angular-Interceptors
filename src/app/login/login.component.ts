import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('k4shal'),
    password: new FormControl('1234'),
  });

  constructor(private authService: AuthService, private router: Router) {}

  loginButtonHandler() {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        localStorage.setItem('jwt_token', res.token);
        this.router.navigate(['/dashboard']);
      },
    });
  }
}
