import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { Role } from '../../core/models/role.model';
import { UserService } from '../../core/services/user/user.service';

@Component({
  selector: 'app-create-user',
  standalone: true,  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatIconModule,
    HeaderComponent,
    RouterModule
  ],
  providers: [UserService],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup;
  public roles = signal<Role[]>([]);
  constructor(
    private readonly fb: FormBuilder,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly userService: UserService
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      area: ['', [Validators.required]],
      roleId: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Get roles from the user service
    this.userService.getRoles().subscribe(roles => {
      this.roles.set(roles);
    });
  }
  onSubmit(): void {
    if (this.userForm.valid) {
      // Use the user service to create the user
      this.userService.createUser(this.userForm.value).subscribe({
        next: (response) => {
          console.log('User created:', response);
          this.snackBar.open('Usuario creado con éxito', 'Cerrar', {
            duration: 3000,
            panelClass: 'success-snackbar'
          });
          
          // Reset form
          this.userForm.reset();
        
          setTimeout(() => this.router.navigate(['/dashboard']), 3000);
        },
        error: (error) => {
          console.error('Error creating user:', error);
          this.snackBar.open('Error al crear el usuario', 'Cerrar', {
            duration: 3000,
            panelClass: 'error-snackbar'
          });
        }
      });
    } else {
      this.markFormGroupTouched(this.userForm);
      
      this.snackBar.open('Por favor complete todos los campos requeridos', 'Cerrar', {
        duration: 3000,
        panelClass: 'error-snackbar'
      });
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.userForm.get(controlName);
    return !!(control && control.touched && control.hasError(errorName));
  }
}
