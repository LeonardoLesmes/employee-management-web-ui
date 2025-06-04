export const environment = {
    production: false,
    resources: {
        host: 'http://localhost:8080/api',
        auth: {
            login: '/auth/login',
            checkToken: '/auth/validate-token',
        },
        employees: {
            base: '/employees',
            assignedBy: '/employees/assigned-by',
            roles: '/roles',
        },
        access: {
            base: '/access-requests',
            assignedBy: '/access-requests/assigned-by',
            systems: '/systems',
            availableSystems: '/systems/available',
        },
        computer: {
            base: '/computer-assignments',
            assignedBy: '/computer-assignments/assigned-by',
            available: '/computer-assignments/available',
            employee: '/computer-assignments/employee',
        },
    },
};
