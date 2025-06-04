export interface RolePermissionMap {
    roleId: number;
    allowedSystemIds: number[];
}

export const ROLE_PERMISSION_MAP: RolePermissionMap[] = [
    {
        // DEV_JUNIOR
        roleId: 9,
        allowedSystemIds: [2, 3, 5, 7, 9], // GitHub-developer, AWS-developer, Jira, Confluence, Grafana-stg
    },
    {
        // DEV_SEMI
        roleId: 10,
        allowedSystemIds: [2, 3, 5, 7, 9], // GitHub-developer, AWS-developer, Jira, Confluence, Grafana-stg
    },
    {
        // DEV_SENIOR
        roleId: 11,
        allowedSystemIds: [2, 3, 5, 7, 8, 9], // GitHub-developer, AWS-developer, Jira, Confluence, Grafana-prod, Grafana-stg
    },
    {
        // TECH_LEAD
        roleId: 12,
        allowedSystemIds: [2, 3, 5, 7, 8, 9], // GitHub-developer, AWS-developer, Jira, Confluence, Grafana-prod, Grafana-stg
    },
    {
        // QA_ANALYST
        roleId: 13,
        allowedSystemIds: [2, 5, 7, 10], // GitHub-developer, Jira, Confluence, CRM-stg
    },
    {
        // QA_AUTOMATION
        roleId: 14,
        allowedSystemIds: [2, 5, 7, 10], // GitHub-developer, Jira, Confluence, CRM-stg
    },
    {
        // DEVOPS_ENGINEER
        roleId: 15,
        allowedSystemIds: [1, 4, 5, 7, 8, 9], // GitHub-devops, AWS-devops, Jira, Confluence, Grafana-prod, Grafana-stg
    },
    {
        // SRE
        roleId: 16,
        allowedSystemIds: [1, 4, 5, 7, 8, 9], // GitHub-devops, AWS-devops, Jira, Confluence, Grafana-prod, Grafana-stg
    },
    {
        // UX_DESIGNER
        roleId: 17,
        allowedSystemIds: [5, 6, 7], // Jira, Figma, Confluence
    },
    {
        // UI_DESIGNER
        roleId: 18,
        allowedSystemIds: [5, 6, 7], // Jira, Figma, Confluence
    },
    {
        // PROJECT_MANAGER
        roleId: 19,
        allowedSystemIds: [5, 6, 7, 8], // Jira, Confluence, Figma, Grafana-prod
    },
    {
        // SCRUM_MASTER
        roleId: 20,
        allowedSystemIds: [5, 7, 8, 9], // Jira, Confluence, Grafana-stg, Grafana-prod
    },
    {
        // AGILE_COACH
        roleId: 21,
        allowedSystemIds: [5, 7, 8, 9], // Jira, Confluence, Grafana-stg, Grafana-prod
    },
    {
        // PRODUCT_OWNER
        roleId: 22,
        allowedSystemIds: [5, 6, 7, 8], // Jira, Confluence, Figma, Grafana-prod
    },
];
