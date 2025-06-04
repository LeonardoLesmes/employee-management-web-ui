import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterModule } from '@angular/router';
import { finalize } from 'rxjs';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { Role } from '../../core/models/user/role.model';
import { UserService } from '../../core/services/user/user.service';
import { StorageService } from '../../core/services/storage/storage.service';
import { SessionUser } from '../../core/models/manager/session.model';
import { UserReq } from '../../core/models/user/user-req';

@Component({
    selector: 'app-create-user',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        MatCardModule,
        MatSnackBarModule,
        MatIconModule,
        MatProgressSpinnerModule,
        HeaderComponent,
        RouterModule,
    ],
    providers: [UserService],
    templateUrl: './create-user.component.html',
    styleUrl: './create-user.component.scss',
})
export class CreateUserComponent implements OnInit {
    public readonly userForm: FormGroup;
    
    public readonly roles = signal<Role[]>([]);
    public readonly loading = signal<boolean>(false);
    public readonly submitting = signal<boolean>(false);
    private readonly user = signal<SessionUser | null>(null);

    private readonly fb = inject(FormBuilder);
    private readonly snackBar = inject(MatSnackBar);
    private readonly router = inject(Router);
    private readonly userService = inject(UserService);
    private readonly storage = inject(StorageService);

    constructor() {
        this.userForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            area: ['', [Validators.required]],
            roleId: ['', [Validators.required]],
        });
    }

    ngOnInit(): void {
        this.loadRoles();
        this.loadUser();
    }

    private loadRoles(): void {
        this.loading.set(true);
        this.userService.getRoles()
            .pipe(
                finalize(() => this.loading.set(false))
            )
            .subscribe({
                next: roles => {
                    this.roles.set(roles);
                },
                error: error => {
                    console.error('Error al cargar roles:', error);
                    this.snackBar.open('Error al cargar los roles', 'Cerrar', {
                        duration: 3000,
                        panelClass: 'error-snackbar',
                    });
                }
            });
    }

    private loadUser(): void {
        const sessionUser = this.storage.getItem<SessionUser>('user');
        this.user.set(sessionUser);

        if (!sessionUser || Object.keys(sessionUser).length === 0) {
            this.snackBar.open('No se encontró información del usuario', 'Cerrar', {
                duration: 3000,
                panelClass: 'error-snackbar',
            });
            this.router.navigate(['/login']);
        }
    }

    public onSubmit(): void {
        if (this.userForm.valid && !this.submitting()) {
            this.submitting.set(true);
            
            const createUser: UserReq = {
                name: this.userForm.value.name,
                email: this.userForm.value.email,
                department: this.userForm.value.area,
                roleId: this.userForm.value.roleId,
                assignedBy: this.user()?.id as number,
            };
            
            this.userService.createUser(createUser)
                .pipe(
                    finalize(() => this.submitting.set(false))
                )
                .subscribe({
                    next: () => {
                        this.snackBar.open('Usuario creado con éxito', 'Cerrar', {
                            duration: 2000,
                            panelClass: 'success-snackbar',
                        });
                        this.router.navigate(['/dashboard']);
                    },
                    error: error => {
                        console.error('Error al crear usuario:', error);
                        this.snackBar.open('Error al crear el usuario', 'Cerrar', {
                            duration: 3000,
                            panelClass: 'error-snackbar',
                        });
                    },
                });
        }
    }

    public hasError(controlName: string, errorName: string): boolean {
        const control = this.userForm.get(controlName);
        return !!(control && control.touched && control.hasError(errorName));
    }

    public goBackToDashboard(): void {
        this.router.navigate(['/dashboard']);
    }
}
