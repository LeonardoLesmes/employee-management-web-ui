import { Component, inject, OnInit, signal } from '@angular/core';
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
        HeaderComponent,
        RouterModule,
    ],
    providers: [UserService],
    templateUrl: './create-user.component.html',
    styleUrl: './create-user.component.scss',
})
export class CreateUserComponent implements OnInit {
    public userForm: FormGroup;
    public roles = signal<Role[]>([]);

    private user: SessionUser | null = null;

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
        this.userService.getRoles().subscribe(roles => {
            this.roles.set(roles);
        });
        this.user = this.storage.getItem<SessionUser>('user');

        if (this.user == null || Object.keys(this.user).length === 0) {
            this.snackBar.open('No se encontró información del usuario', 'Cerrar', {
                duration: 3000,
                panelClass: 'error-snackbar',
            });
            this.router.navigate(['/login']);
        }
    }

    public onSubmit(): void {
        if (this.userForm.valid) {
            const createUser: UserReq = {
                name: this.userForm.value.name,
                email: this.userForm.value.email,
                department: this.userForm.value.area,
                roleId: this.userForm.value.roleId,
                assignedBy: this.user?.id as number,
            };
            this.userService.createUser(createUser).subscribe({
                next: () => {
                    this.snackBar.open('Usuario creado con éxito', 'Cerrar', {
                        duration: 2000,
                        panelClass: 'success-snackbar',
                    });
                    this.router.navigate(['/dashboard']);
                },
                error: () => {
                    this.snackBar.open('Error al crear el usuario', 'Cerrar', {
                        duration: 3000,
                        panelClass: 'error-snackbar',
                    });
                },
            });
        }
    }
    hasError(controlName: string, errorName: string): boolean {
        const control = this.userForm.get(controlName);
        return !!(control && control.touched && control.hasError(errorName));
    }

    get isSubmitDisabled(): boolean {
        return this.userForm.invalid;
    }

    goBackToDashboard(): void {
        this.router.navigate(['/dashboard']);
    }
}
