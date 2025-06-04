import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { UserService } from '../../core/services/user/user.service';
import { ComputerService } from '../../core/services/computer/computer.service';
import { UserComputerRes } from '../../core/models/computer/user-computer-res.model';
import { UserRes } from '../../core/models/user/user-res';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { StorageService } from '../../core/services/storage/storage.service';
import { SessionUser } from '../../core/models/manager/session.model';
import { UserComputerReq } from '../../core/models/computer/user-computer-req.model';
import { FindPipe } from '../../shared/pipes/find.pipe';
import { ComputerDetails } from '../../core/models/computer/computer-details';

@Component({
    selector: 'app-computer',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatSnackBarModule,
        HeaderComponent,
        FindPipe,
    ],
    templateUrl: './computer.component.html',
    styleUrl: './computer.component.scss',
})
export class ComputerComponent implements OnInit {
    assignmentForm!: FormGroup;
    user: UserRes | null = null;
    computers: ComputerDetails[] = [];
    loading = false;
    searched = false;
    userComputer: UserComputerRes | null = null;

    private readonly fb = inject(FormBuilder);
    private readonly userService = inject(UserService);
    private readonly computerService = inject(ComputerService);
    private readonly snackBar = inject(MatSnackBar);
    private readonly router = inject(Router);
    private readonly storage = inject(StorageService);

    ngOnInit(): void {
        this.initForm();
        this.loadComputers();
    }

    private initForm(): void {
        this.assignmentForm = this.fb.group({
            userId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
            computerId: ['', Validators.required],
        });
    }

    private loadComputers(): void {
        this.loading = true;
        this.computerService
            .getAvailableComputers()
            .pipe(
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe({
                next: computers => {
                    this.computers = computers;
                },
                error: error => {
                    console.error('Error al cargar computadoras:', error);
                    this.snackBar.open('Error al cargar las computadoras disponibles', 'Cerrar', {
                        duration: 5000,
                    });
                },
            });
    }
    
    searchUser(): void {
        const userId = Number(this.assignmentForm.get('userId')?.value);
        if (!userId) return;

        this.assignmentForm.get('computerId')?.setValue('');
        this.userComputer = null;

        this.loading = true;

        this.userService.getUserById(userId).subscribe({
            next: user => {
                this.user = user;
                this.computerService
                    .getComputerByUserId(userId)
                    .pipe(
                        finalize(() => {
                            this.loading = false;
                            this.searched = true;
                        })
                    )
                    .subscribe({
                        next: userComputer => {
                            this.userComputer = userComputer;
                        },
                        error: error => {
                            console.error('Error al buscar computadora asignada:', error);
                            this.userComputer = null;
                        },
                    });
            },
            error: error => {
                console.error('Error al buscar usuario:', error);
                this.user = null;
                this.userComputer = null;
                this.loading = false;
                this.searched = true;
                this.snackBar.open('Usuario no encontrado', 'Cerrar', {
                    duration: 5000,
                });
            },
        });
    }

    get isPendingRequest(): boolean {
        return this.userComputer?.status === 'PENDING';
    }

    get isComputerAssigned(): boolean {
        return this.userComputer?.status === 'APPROVED';
    }

    get isRejectedOrCanceled(): boolean {
        return this.userComputer?.status === 'REJECTED' || this.userComputer?.status === 'CANCELED';
    }

    get canRequestComputer(): boolean {
        return !this.userComputer || this.isRejectedOrCanceled;
    }

    onSubmit(): void {
        if (this.assignmentForm.invalid || !this.user || !this.canRequestComputer) {
            if (this.isComputerAssigned) {
                this.snackBar.open('El usuario ya tiene una computadora asignada', 'Cerrar', {
                    duration: 5000,
                });
            } else if (this.isPendingRequest) {
                this.snackBar.open('El usuario tiene una solicitud pendiente', 'Cerrar', {
                    duration: 5000,
                });
            }
            return;
        }
        const computerId = Number(this.assignmentForm.get('computerId')?.value);
        const sessionUser = this.storage.getItem<SessionUser>('user');

        this.loading = true;
        const assignmentRequest: UserComputerReq = {
            employeeId: this.user.id,
            computerId: computerId,
            assignedById: sessionUser?.id as number,
        };

        this.computerService
            .assignComputer(assignmentRequest)
            .pipe(
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe({
                next: () => {
                    this.snackBar.open('Computadora asignada correctamente', 'Cerrar', {
                        duration: 3000,
                    });
                    this.user = null;
                    this.searched = false;
                },
                error: () => {
                    this.snackBar.open('Ocurrió un error al asignar la computadora', 'Cerrar', {
                        duration: 3000,
                    });
                },
            });
    }

    goBackToDashboard(): void {
        this.router.navigate(['/dashboard']);
    }
}
