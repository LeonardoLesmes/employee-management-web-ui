import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  } 
  
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.router.navigate(['/dashboard']);
    }
  }

  getEmailErrorMessage(): string {
    const emailControl = this.loginForm.get('email');
    if (!emailControl) return '';
    
    if (emailControl.hasError('required')) {
      return 'Debes ingresar un correo electrónico';
    }
    
    return emailControl.hasError('email') ? 'Correo electrónico no válido' : '';
  }

  getPasswordErrorMessage(): string {
    const passwordControl = this.loginForm.get('password');
    if (!passwordControl) return '';
    
    if (passwordControl.hasError('required')) {
      return 'Debes ingresar una contraseña';
    }
    
    return passwordControl.hasError('minlength') ? 'La contraseña debe tener al menos 6 caracteres' : '';
  }
}
