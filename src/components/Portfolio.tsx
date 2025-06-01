
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ServicesForm from './portfolio/ServicesForm';
import ProductsForm from './portfolio/ProductsForm';

const Portfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState('services');

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
          Portfolio Management
        </h1>
        <p className="text-muted-foreground mt-2">Manage your services and products</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-background/50 border border-primary/20">
          <TabsTrigger 
            value="services"
            className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
          >
            Services
          </TabsTrigger>
          <TabsTrigger 
            value="products"
            className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
          >
            Products
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="services" className="mt-8">
          <ServicesForm />
        </TabsContent>
        
        <TabsContent value="products" className="mt-8">
          <ProductsForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Portfolio;
