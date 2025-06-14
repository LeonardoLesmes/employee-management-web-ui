import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../core/services/login/login.service';
import { SessionUser } from '../../core/models/manager/session.model';
import { StorageService } from '../../core/services/storage/storage.service';

@Component({
    selector: 'app-login',
    imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSnackBarModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    public readonly loginForm: FormGroup;
    public readonly hidePassword = signal<boolean>(true);

    private readonly loginService = inject(LoginService);
    private readonly router = inject(Router);
    private readonly fb = inject(FormBuilder);
    private readonly snackBar = inject(MatSnackBar);
    private readonly storage = inject(StorageService);

    constructor() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    public onSubmit(): void {
        if (this.loginForm.valid) {
            this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
                next: res => {
                    const user: SessionUser = {
                        id: res.id,
                        name: res.name,
                        role: res.role,
                    };
                    this.storage.setItem('user', user);
                    this.storage.setItem('token', res.token);
                    this.router.navigate(['/dashboard']);
                },
                error: () => {
                    this.snackBar.open('Credenciales incorrectas', 'Cerrar', {
                        duration: 5000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top',
                        panelClass: ['error-snackbar'],
                    });
                },
            });
        }
    }

    public getEmailErrorMessage(): string {
        const emailControl = this.loginForm.get('email');
        if (!emailControl) return '';

        if (emailControl.hasError('required')) {
            return 'Debes ingresar un correo electrónico';
        }

        return emailControl.hasError('email') ? 'Correo electrónico no válido' : '';
    }

    public getPasswordErrorMessage(): string {
        const passwordControl = this.loginForm.get('password');
        if (!passwordControl) return '';

        if (passwordControl.hasError('required')) {
            return 'Debes ingresar una contraseña';
        }

        return passwordControl.hasError('minlength') ? 'La contraseña debe tener al menos 6 caracteres' : '';
    }

    public togglePasswordVisibility(): void {
        this.hidePassword.set(!this.hidePassword());
    }
}
