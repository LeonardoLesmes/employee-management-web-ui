export interface RolePermissionMap {
    roleId: number;
    allowedSystemIds: number[];
}

export const ROLE_PERMISSION_MAP: RolePermissionMap[] = [
    {
        // DEV_JUNIOR
        roleId: 23,
        allowedSystemIds: [2, 3, 5, 7, 9], // GitHub-developer, AWS-developer, Jira, Confluence, Grafana-stg
    },
    {
        // DEV_SEMI
        roleId: 24,
        allowedSystemIds: [2, 3, 5, 7, 9], // GitHub-developer, AWS-developer, Jira, Confluence, Grafana-stg
    },
    {
        // DEV_SENIOR
        roleId: 25,
        allowedSystemIds: [2, 3, 5, 7, 8, 9], // GitHub-developer, AWS-developer, Jira, Confluence, Grafana-prod, Grafana-stg
    },
    {
        // TECH_LEAD
        roleId: 26,
        allowedSystemIds: [2, 3, 5, 7, 8, 9], // GitHub-developer, AWS-developer, Jira, Confluence, Grafana-prod, Grafana-stg
    },
    {
        // QA_ANALYST
        roleId: 27,
        allowedSystemIds: [2, 5, 7, 10], // GitHub-developer, Jira, Confluence, CRM-stg
    },
    {
        // QA_AUTOMATION
        roleId: 28,
        allowedSystemIds: [2, 5, 7, 10], // GitHub-developer, Jira, Confluence, CRM-stg
    },
    {
        // DEVOPS_ENGINEER
        roleId: 29,
        allowedSystemIds: [1, 4, 5, 7, 8, 9], // GitHub-devops, AWS-devops, Jira, Confluence, Grafana-prod, Grafana-stg
    },
    {
        // SRE
        roleId: 30,
        allowedSystemIds: [1, 4, 5, 7, 8, 9], // GitHub-devops, AWS-devops, Jira, Confluence, Grafana-prod, Grafana-stg
    },
    {
        // UX_DESIGNER
        roleId: 31,
        allowedSystemIds: [5, 6, 7], // Jira, Figma, Confluence
    },
    {
        // UI_DESIGNER
        roleId: 32,
        allowedSystemIds: [5, 6, 7], // Jira, Figma, Confluence
    },
    {
        // PROJECT_MANAGER
        roleId: 33,
        allowedSystemIds: [5, 6, 7, 8], // Jira, Confluence, Figma, Grafana-prod
    },
    {
        // SCRUM_MASTER
        roleId: 34,
        allowedSystemIds: [5, 7, 8, 9], // Jira, Confluence, Grafana-stg, Grafana-prod
    },
    {
        // AGILE_COACH
        roleId: 35,
        allowedSystemIds: [5, 7, 8, 9], // Jira, Confluence, Grafana-stg, Grafana-prod
    },
    {
        // PRODUCT_OWNER
        roleId: 36,
        allowedSystemIds: [5, 6, 7, 8], // Jira, Confluence, Figma, Grafana-prod
    },
];
