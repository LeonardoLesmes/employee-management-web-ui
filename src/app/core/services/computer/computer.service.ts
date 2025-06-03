import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ComputerRes } from '../../models/computer.model';
import { ComputerReq } from '../../models/computer-assignment-req.model';
import { UserComputerRes } from '../../models/user-computer.model';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {
  private readonly http = inject(HttpClient);

  public getComputersByAssignedId(assignedId: number) {
    return this.http.get<any[]>(`http://localhost:8080/api/computer-assignments/assigned-by/${assignedId}`);
  }

  public getAvailableComputers(): Observable<ComputerRes[]> {
    return this.http.get<ComputerRes[]>('http://localhost:8080/api/computer-assignments/available');
  }
  
  public assignComputer(request: ComputerReq): Observable<void> {
    return of(void 0);
  }

  public getComputerByUserId(userId: number): Observable<UserComputerRes | null> {
    // En un entorno de desarrollo real, esta sería una llamada HTTP
    // Para simular el comportamiento, crearemos un mock que puede devolver datos o null
    
    // Datos de usuarios con computadoras ya asignadas para pruebas
    const userComputers: Record<number, UserComputerRes> = {
      1: {
        employee: {
          id: 1,
          name: "Ana Gómez"
        },
        computer: {
          id: 3,
          model: "ThinkPad P1",
          serialNumber: "TP-P1-003",
          status: "ASSIGNED",
          specs: "Intel i9, 64GB RAM, 2TB SSD, NVIDIA RTX 3080, Windows 11 Pro"
        },
        assignedAt: "2025-05-15T10:30:00",
        assignedBy: {
          id: 5,
          name: "Carlos Rodriguez"
        }
      },
      3: {
        employee: {
          id: 3,
          name: "Luis Fernández"
        },
        computer: {
          id: 7,
          model: "Dell XPS 13",
          serialNumber: "DL-XPS13-001",
          status: "ASSIGNED",
          specs: "Intel i7 12th Gen, 16GB RAM, 512GB SSD, Windows 11 Pro"
        },
        assignedAt: "2025-04-20T14:45:00",
        assignedBy: {
          id: 5,
          name: "Carlos Rodriguez"
        }
      },
      8: {
        employee: {
          id: 8,
          name: "María López"
        },
        computer: {
          id: 5,
          model: "MacBook Pro 16\"",
          serialNumber: "MB-P16-002",
          status: "ASSIGNED",
          specs: "M1 Max, 32GB RAM, 1TB SSD, macOS Monterey"
        },
        assignedAt: "2025-05-25T09:15:00",
        assignedBy: {
          id: 2,
          name: "Javier Martinez"
        }
      }
    };
    
    // Simulamos una pequeña latencia
    return of(userComputers[userId] || null);
    
    // En producción, se usaría:
    // return this.http.get<UserComputerRes | null>(`http://localhost:8080/api/computer-assignments/employee/${userId}`);
  }
}
