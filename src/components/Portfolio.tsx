
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ProductsList from './portfolio/List';
import ProductsForm from './portfolio/Form';

const Portfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState('list');

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
          Portfolio Management
        </h1>
        <p className="text-muted-foreground mt-2">Manage your products</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-background/50 border border-primary/20">
          <TabsTrigger 
            value="list"
            className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
          >
            Show Products
          </TabsTrigger>
          <TabsTrigger 
            value="form"
            className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
          >
            Add Product
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="mt-8">
          <ProductsList />
        </TabsContent>
        
        <TabsContent value="form" className="mt-8">
          <ProductsForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Portfolio;
