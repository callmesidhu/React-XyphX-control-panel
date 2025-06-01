
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  change, 
  changeType = 'neutral' 
}) => {
  const changeColor = {
    positive: 'text-green-400',
    negative: 'text-red-400',
    neutral: 'text-yellow-400'
  }[changeType];

  return (
    <Card className="glass-effect cyber-border hover:border-primary/40 transition-all duration-300 group">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground uppercase tracking-wide">{title}</p>
            <p className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
              {value}
            </p>
            {change && (
              <p className={`text-sm ${changeColor} font-medium`}>
                {change}
              </p>
            )}
          </div>
          <div className="p-3 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-xl group-hover:from-primary-500/30 group-hover:to-primary-600/30 transition-all duration-300">
            <Icon className="w-6 h-6 text-primary-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
