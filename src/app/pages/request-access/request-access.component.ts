import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user/user.service';
import { AccessService } from '../../core/services/access/access.service';
import { System } from '../../core/models/access/system.model';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { UserRes } from '../../core/models/user/user-res';
import { ROLE_PERMISSION_MAP } from '../../core/models/role-permission-map';
import { StorageService } from '../../core/services/storage/storage.service';
import { SessionUser } from '../../core/models/manager/session.model';
import { AccessReq } from '../../core/models/access/access-req';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-request-access',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        HeaderComponent,
    ],
    templateUrl: './request-access.component.html',
    styleUrl: './request-access.component.scss',
})
export class RequestAccessComponent implements OnInit {
    accessForm!: FormGroup;
    user: UserRes | null = null;
    systems: System[] = [];
    filteredSystems: System[] = [];
    loading = false;
    searched = false;

    private readonly fb = inject(FormBuilder);
    private readonly userService = inject(UserService);
    private readonly accessService = inject(AccessService);
    private readonly snackBar = inject(MatSnackBar);
    private readonly router = inject(Router);
    private readonly storage = inject(StorageService);

    ngOnInit(): void {
        this.initForm();
        this.loadSystems();
    }

    private initForm(): void {
        this.accessForm = this.fb.group({
            userId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
            systemAccess: this.fb.group({}),
        });
    }
    private loadSystems(): void {
        this.loading = true;
        this.accessService.getSystems().subscribe({
            next: systems => {
                this.systems = systems;
                this.filteredSystems = [];
                const systemAccessGroup = this.accessForm.get('systemAccess') as FormGroup;
                systems.forEach(system => {
                    systemAccessGroup.addControl(system.id.toString(), this.fb.control(false));
                });
                this.loading = false;
            },
            error: error => {
                console.error('Error al cargar sistemas:', error);
                this.loading = false;
                this.snackBar.open('Error al cargar los sistemas disponibles', 'Cerrar', {
                    duration: 5000,
                });
            },
        });
    }
    searchUser(): void {
        const userId = Number(this.accessForm.get('userId')?.value);
        if (!userId) return;

        this.loading = true;
        this.userService.getUserById(userId).subscribe({
            next: user => {
                this.user = user;
                this.loading = false;
                this.searched = true;
                this.filterSystemsByUserRole();
            },
            error: error => {
                console.error('Error al buscar usuario:', error);
                this.loading = false;
                this.searched = true;
                this.user = null;
                this.snackBar.open('Usuario no encontrado', 'Cerrar', {
                    duration: 5000,
                });
            },
        });
    }

    private filterSystemsByUserRole(): void {
        if (!this.user || !this.systems.length) return;

        const systemAccessGroup = this.accessForm.get('systemAccess') as FormGroup;
        Object.keys(systemAccessGroup.controls).forEach(controlName => {
            systemAccessGroup.get(controlName)?.setValue(false);
        });

        const roleMapping = ROLE_PERMISSION_MAP.find(mapping => mapping.roleId === this.user?.role.id);

        if (roleMapping) {
            this.filteredSystems = this.systems.filter(system => roleMapping.allowedSystemIds.includes(system.id));
        } else {
            this.filteredSystems = [];
            this.snackBar.open('No hay permisos definidos para este rol de usuario', 'Cerrar', {
                duration: 5000,
            });
        }
    }
    getSelectedSystems(): System[] {
        const selectedSystems: System[] = [];
        const systemAccessControls = this.accessForm.get('systemAccess')?.value;

        if (systemAccessControls) {
            Object.keys(systemAccessControls).forEach(id => {
                if (systemAccessControls[id]) {
                    const system = this.filteredSystems.find(s => s.id === Number(id));
                    if (system) {
                        selectedSystems.push(system);
                    }
                }
            });
        }

        return selectedSystems;
    }

    hasSelectedSystems(): boolean {
        return this.getSelectedSystems().length > 0;
    }

    onSubmit(): void {
        if (this.accessForm.invalid || !this.user || !this.hasSelectedSystems()) {
            return;
        }
        this.loading = true;
        const selectedSystems = this.getSelectedSystems();
        const sessionUser = this.storage.getItem<SessionUser>('user');

        const accessRequest: AccessReq = {
            employeeId: this.user.id,
            systemIds: selectedSystems.map(system => system.id),
            assignedById: sessionUser?.id as number,
        };

        this.accessService
            .createAccessRequest(accessRequest)
            .pipe(
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe({
                next: () => {
                    this.snackBar.open('Solicitud enviada correctamente', 'Cerrar', {
                        duration: 3000,
                    });
                },
                error: () => {
                    this.snackBar.open('Ocurrio un error al tratar de solicitar permisos', 'Cerrar', { duration: 3000 });
                },
            });
    }

    goBackToDashboard(): void {
        this.router.navigate(['/dashboard']);
    }
}
