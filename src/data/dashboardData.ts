import { DashboardData } from '@/types/dashboard';

export const initialDashboardData: DashboardData = {
  categories: [
    {
      id: 'cspm-executive',
      name: 'CSPM Executive Dashboard',
      widgets: [
        {
          id: 'cloud-accounts',
          name: 'Cloud Accounts',
          content: 'Connected (2), Not Connected (2) - Total accounts: 4',
          type: 'chart'
        },
        {
          id: 'cloud-risk-assessment',
          name: 'Cloud Account Risk Assessment',
          content: 'Failed (1689), Warning (681), Not Available (36), Passed (7253) - Total: 9659',
          type: 'chart'
        }
      ]
    },
    {
      id: 'cwpp-dashboard',
      name: 'CWPP Dashboard',
      widgets: [
        {
          id: 'namespace-alerts',
          name: 'Top 5 Namespace Specific Alerts',
          content: 'No Graph data available',
          type: 'stats'
        },
        {
          id: 'workload-alerts',
          name: 'Workload Alerts',
          content: 'No Graph data available',
          type: 'stats'
        }
      ]
    },
    {
      id: 'registry-scan',
      name: 'Registry Scan',
      widgets: [
        {
          id: 'image-risk-assessment',
          name: 'Image Risk Assessment',
          content: '1470 Total Vulnerabilities - Critical (9), High (150)',
          type: 'stats'
        },
        {
          id: 'image-security-issues',
          name: 'Image Security Issues',
          content: '2 Total Images - Critical (2), High (2)',
          type: 'stats'
        }
      ]
    }
  ]
};