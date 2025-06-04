export const environment = {
    production: true,
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
        },
        computer: {
            base: '/computer-assignments',
            assignedBy: '/computer-assignments/assigned-by',
            available: '/computer-assignments/available',
            employee: '/computer-assignments/employee',
        },
    },
};
