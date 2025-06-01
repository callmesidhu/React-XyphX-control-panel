
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Settings, MoreHorizontal } from 'lucide-react';

interface Site {
  id: string;
  name: string;
  status: 'Active' | 'Inactive';
  lastUpdated: string;
  visitors: number;
}

interface SiteTableProps {
  sites: Site[];
}

const SiteTable: React.FC<SiteTableProps> = ({ sites }) => {
  return (
    <Card className="glass-effect cyber-border">
      <CardHeader>
        <CardTitle className="text-xl font-semibold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
          Site Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-primary/20">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Website</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Visitors</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Last Updated</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sites.map((site, index) => (
                <tr 
                  key={site.id} 
                  className="border-b border-primary/10 hover:bg-primary/5 transition-colors duration-200"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <td className="py-4 px-4">
                    <div className="font-medium text-foreground">{site.name}</div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge 
                      variant={site.status === 'Active' ? 'default' : 'secondary'}
                      className={site.status === 'Active' 
                        ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                        : 'bg-red-500/20 text-red-400 border-red-500/30'
                      }
                    >
                      {site.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-foreground/80">
                    {site.visitors.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">
                    {site.lastUpdated}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button size="sm" variant="ghost" className="hover:bg-primary/10 hover:text-primary">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="hover:bg-primary/10 hover:text-primary">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="hover:bg-primary/10 hover:text-primary">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default SiteTable;
