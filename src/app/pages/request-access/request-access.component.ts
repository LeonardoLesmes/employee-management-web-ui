import { Component, OnInit, inject, signal, computed } from '@angular/core';
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
import { finalize } from 'rxjs';
import { UserService } from '../../core/services/user/user.service';
import { AccessService } from '../../core/services/access/access.service';
import { System } from '../../core/models/access/system.model';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { UserRes } from '../../core/models/user/user-res';
import { StorageService } from '../../core/services/storage/storage.service';
import { SessionUser } from '../../core/models/manager/session.model';
import { AccessReq } from '../../core/models/access/access-req';

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
    public readonly accessForm: FormGroup;
    
    public readonly user = signal<UserRes | null>(null);
    public readonly systems = signal<System[]>([]);
    public readonly filteredSystems = signal<System[]>([]);
    public readonly loading = signal<boolean>(false);
    public readonly searched = signal<boolean>(false);

    private readonly fb = inject(FormBuilder);
    private readonly userService = inject(UserService);
    private readonly accessService = inject(AccessService);
    private readonly snackBar = inject(MatSnackBar);
    private readonly router = inject(Router);
    private readonly storage = inject(StorageService);

    constructor() {
        this.accessForm = this.fb.group({
            userId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
            systemAccess: this.fb.group({}),
        });
    }

    ngOnInit(): void {
        this.loadSystems();
    }

    private loadSystems(): void {
        this.loading.set(true);
        this.accessService.getSystems().subscribe({
            next: systems => {
                this.systems.set(systems);
                this.filteredSystems.set([]);
                const systemAccessGroup = this.accessForm.get('systemAccess') as FormGroup;
                systems.forEach(system => {
                    systemAccessGroup.addControl(system.id.toString(), this.fb.control(false));
                });
                this.loading.set(false);
            },
            error: error => {
                console.error('Error al cargar sistemas:', error);
                this.loading.set(false);
                this.snackBar.open('Error al cargar los sistemas disponibles', 'Cerrar', {
                    duration: 5000,
                });
            },
        });
    }

    public searchUser(): void {
        const userId = Number(this.accessForm.get('userId')?.value);
        if (!userId) return;

        this.loading.set(true);
        this.userService.getUserById(userId).subscribe({
            next: user => {
                this.user.set(user);
                this.getAvailableSystemsForRole(user.role.id);
            },
            error: error => {
                console.error('Error al buscar usuario:', error);
                this.loading.set(false);
                this.searched.set(true);
                this.user.set(null);
                this.snackBar.open('Usuario no encontrado', 'Cerrar', {
                    duration: 5000,
                });
            },
        });
    }

    private getAvailableSystemsForRole(roleId: number): void {
        this.accessService.getAvailableSystems(roleId).subscribe({
            next: (allowedSystems) => {
                this.loading.set(false);
                this.searched.set(true);
                this.filterSystemsByUserRole(allowedSystems);
            },
            error: () => {
                this.loading.set(false);
                this.searched.set(true);
                this.snackBar.open('No hay permisos definidos para este rol de usuario', 'Cerrar', { duration: 5000 });
            },
        });
    }

    private filterSystemsByUserRole(allowedSystems: number[]): void {
        if (!this.user() || !this.systems().length) {
            return;
        }

        const systemAccessGroup = this.accessForm.get('systemAccess') as FormGroup;
        Object.keys(systemAccessGroup.controls).forEach(controlName => {
            systemAccessGroup.get(controlName)?.setValue(false);
        });

        this.filteredSystems.set(this.systems().filter(system => allowedSystems.includes(system.id)));
    }

    public getSelectedSystems(): System[] {
        const selectedSystems: System[] = [];
        const systemAccessControls = this.accessForm.get('systemAccess')?.value;

        if (systemAccessControls) {
            Object.keys(systemAccessControls).forEach(id => {
                if (systemAccessControls[id]) {
                    const system = this.filteredSystems().find(s => s.id === Number(id));
                    if (system) {
                        selectedSystems.push(system);
                    }
                }
            });
        }

        return selectedSystems;
    }

    public onSubmit(): void {
        if (this.accessForm.invalid || !this.user() ||  !(this.getSelectedSystems().length > 0)) {
            return;
        }

        this.loading.set(true);
        const selectedSystems = this.getSelectedSystems();
        const sessionUser = this.storage.getItem<SessionUser>('user');

        const accessRequest: AccessReq = {
            employeeId: this.user()!.id,
            systemIds: selectedSystems.map(system => system.id),
            assignedById: sessionUser?.id as number,
        };

        this.accessService
            .createAccessRequest(accessRequest)
            .pipe(
                finalize(() => {
                    this.loading.set(false);
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

    public goBackToDashboard(): void {
        this.router.navigate(['/dashboard']);
    }
}
