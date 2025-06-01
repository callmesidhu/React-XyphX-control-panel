
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Edit } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  brief: string;
  description: string;
}

const ServicesForm: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    brief: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newService: Service = {
      id: Date.now().toString(),
      ...formData
    };
    setServices([...services, newService]);
    setFormData({ title: '', brief: '', description: '' });
  };

  const deleteService = (id: string) => {
    setServices(services.filter(service => service.id !== id));
  };

  return (
    <div className="space-y-8">
      <Card className="glass-effect cyber-border">
        <CardHeader>
          <CardTitle className="text-xl font-semibold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            Add New Service
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">Title</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-background/50 border-primary/20 focus:border-primary/50"
                placeholder="Service title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">Brief</label>
              <Input
                value={formData.brief}
                onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                className="bg-background/50 border-primary/20 focus:border-primary/50"
                placeholder="Brief description"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-background/50 border-primary/20 focus:border-primary/50 min-h-[120px]"
                placeholder="Detailed description"
                required
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
            >
              Add Service
            </Button>
          </form>
        </CardContent>
      </Card>

      {services.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card 
                key={service.id} 
                className="glass-effect cyber-border hover:border-primary/40 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold text-foreground">{service.title}</h4>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost" className="hover:bg-primary/10 hover:text-primary">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="hover:bg-red-500/10 hover:text-red-400"
                          onClick={() => deleteService(service.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-primary-400 font-medium">{service.brief}</p>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesForm;
