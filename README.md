# Sistema de Gestión de Empleados - Interfaz Web

Frontent del sistema de gestion de empleados. Donde los managers pueden loguearse, mirar la solicitudes y generar nuevas para añadir nuevos integrantes, asignarles equipos y permisos. El sistema implementa una arqitectura moduless con componentes standalone y signals.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Scripts Disponibles](#scripts-disponibles)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Arquitectura](#arquitectura)
- [Funcionalidades](#funcionalidades)
- [Componentes Principales](#componentes-principales)
- [Servicios](#servicios)
- [Estilos y Diseño](#estilos-y-diseño)
- [Testing](#testing)
- [Construcción y Despliegue](#construcción-y-despliegue)
- [Guía de Desarrollo](#guía-de-desarrollo)
- [Contribución](#contribución)
- [Soporte](#soporte)

## ✨ Características

- **Gestión Completa de Empleados**: CRUD completo (Crear, Leer, Actualizar, Eliminar)
- **Interfaz Responsiva**: Diseño adaptativo que funciona en dispositivos móviles y desktop
- **Autenticación Segura**: Sistema de login con JWT tokens
- **Validación de Formularios**: Validación reactiva en tiempo real
- **Diseño Material**: Interfaz moderna usando Angular Material

## 🚀 Tecnologías Utilizadas

### Frontend

- **Angular 19**: Framework principal
- **Angular Material**: Biblioteca de componentes UI
- **TypeScript**: Lenguaje de programación
- **RxJS**: Programación reactiva
- **Angular Router**: Navegación SPA
- **Angular Forms**: Formularios reactivos

### Desarrollo y Herramientas

- **Angular CLI**: Herramientas de desarrollo
- **Prettier**: Formateo automático de código
- **ESLint**: Análisis estático de código
- **Karma + Jasmine**: Framework de testing
- **Node.js**: Entorno de ejecución

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** (versión 9 o superior)
- **Angular CLI** (`npm install -g @angular/cli`)

## 🛠️ Instalación

1. **Clonar el repositorio**

    ```bash
    git clone <url-del-repositorio>
    cd employee-management-web-ui
    ```

2. **Instalar dependencias**

    ```bash
    npm install
    ```

3. **Iniciar el servidor de desarrollo**
    ```bash
    npm start
    ```

La aplicación estará disponible en `http://localhost:4200`

### Configuración de API

La aplicación está configurada para conectarse con una API REST. Asegúrate de que el backend esté ejecutándose en el puerto especificado.

## 📜 Scripts Disponibles

| Script                 | Descripción                             |
| ---------------------- | --------------------------------------- |
| `npm start`            | Inicia el servidor de desarrollo        |
| `npm run build`        | Construye la aplicación para producción |
| `npm run format`       | Formatea el código con Prettier         |
| `npm run format:check` | Verifica el formateo del código         |

## 🎯 Funcionalidades

### Gestión de Empleados

- **Listado**: Vista paginada de todos los empleados
- **Búsqueda**: Filtrado por nombre, email o departamento
- **Creación**: Formulario para agregar nuevos empleados

### Autenticación

- **Login**: Acceso seguro con credenciales
- **Logout**: Cierre de sesión seguro
- **Protección de rutas**: Guards para rutas privadas
- **Gestión de tokens**: Manejo automático de JWT

### Interfaz de Usuario

- **Diseño responsivo**: Adaptación a diferentes tamaños de pantalla
- **Navegación intuitiva**: Menús y breadcrumbs claros
- **Notificaciones**: Feedback visual para acciones del usuario
- **Formularios validados**: Validación en tiempo real

## 🎨 Estilos y Diseño

### Angular Material

La aplicación utiliza Angular Material para:

- Componentes UI consistentes
- Tema personalizable
- Iconografía material
- Animaciones fluidas

### Diseño Responsivo

- **Mobile First**: Diseño optimizado para móviles
- **Breakpoints**: Adaptación a diferentes pantallas
- **Flexbox/Grid**: Layouts modernos y flexibles

## 🏗️ Arquitectura

### Arquitectura Modular con Standalone Components

La aplicación implementa una **arquitectura completamente modular** utilizando las características más modernas de Angular 19:

#### Standalone Components
Todos los componentes son **standalone** (independientes), eliminando la necesidad de NgModules:

```typescript
@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        HeaderComponent
    ],
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
    // Implementación del componente
}
```

**Ventajas de Standalone Components:**
- 📦 **Menor bundle size**: Solo se cargan las dependencias necesarias
- 🚀 **Mejor tree-shaking**: Eliminación automática de código no utilizado
- 🔧 **Mantenimiento simplificado**: Dependencias explícitas y claras
- ⚡ **Lazy loading optimizado**: Carga bajo demanda más eficiente

#### Angular Signals (Reactive Primitives)

La aplicación utiliza **Angular Signals** como sistema de reactividad principal, reemplazando patrones tradicionales con observables:

```typescript
export class UserComponent {
    // Signals para estado reactivo
    public readonly user = signal<UserRes | null>(null);
    public readonly loading = signal<boolean>(false);
    public readonly users = signal<UserRes[]>([]);
    
    // Computed signals para valores derivados
    public readonly isUserSelected = computed(() => !!this.user());
    public readonly userCount = computed(() => this.users().length);
    
    // Inyección de dependencias moderna
    private readonly userService = inject(UserService);
    private readonly router = inject(Router);
}
```

**Beneficios de Angular Signals:**
- ⚡ **Performance mejorado**: Change detection más eficiente
- 🔄 **Reactividad simplificada**: Estado reactivo sin complejidad de RxJS
- 🎯 **Computed values**: Cálculos derivados automáticos y optimizados
- 🔒 **Type safety**: Tipado fuerte en tiempo de compilación

### Patrón de Inyección Moderna

La aplicación adopta el patrón de **inject()** function en lugar de constructor injection:

```typescript
// ❌ Patrón tradicional (constructor injection)
constructor(
    private userService: UserService,
    private router: Router
) {}

// ✅ Patrón moderno (inject function)
private readonly userService = inject(UserService);
private readonly router = inject(Router);
```
