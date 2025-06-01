
import React from 'react';
import { Users, Eye, Activity, Globe } from 'lucide-react';
import StatsCard from './StatsCard';
import SiteTable from './SiteTable';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Visitors',
      value: '24,321',
      icon: Eye,
      change: '+12.5% from last month',
      changeType: 'positive' as const
    },
    {
      title: 'Active Users',
      value: '1,429',
      icon: Users,
      change: '+8.2% from last week',
      changeType: 'positive' as const
    },
    {
      title: 'Site Uptime',
      value: '99.9%',
      icon: Activity,
      change: 'Excellent performance',
      changeType: 'positive' as const
    },
    {
      title: 'Total Sites',
      value: '4',
      icon: Globe,
      change: 'All systems operational',
      changeType: 'neutral' as const
    }
  ];

  const sites = [
    {
      id: '1',
      name: 'Portfolio',
      status: 'Active' as const,
      lastUpdated: '2 hours ago',
      visitors: 5420
    },
    {
      id: '2',
      name: 'GetWarranty',
      status: 'Active' as const,
      lastUpdated: '1 day ago',
      visitors: 3210
    },
    {
      id: '3',
      name: 'SellMySkills',
      status: 'Inactive' as const,
      lastUpdated: '3 days ago',
      visitors: 1890
    },
    {
      id: '4',
      name: 'XyphX OS',
      status: 'Active' as const,
      lastUpdated: '5 hours ago',
      visitors: 8720
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground mt-2">Welcome back! Here's what's happening with your sites.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={stat.title} style={{ animationDelay: `${index * 100}ms` }}>
            <StatsCard {...stat} />
          </div>
        ))}
      </div>

      <SiteTable sites={sites} />
    </div>
  );
};

export default Dashboard;
