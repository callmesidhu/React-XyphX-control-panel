'use client';

import React, { useState, useEffect } from 'react';
import { db } from '../../../configs/firebase';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Edit } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  status: string;
  link: string;
  rank: number;
}

const ProductsForm: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: '',
    link: '',
    rank: ''
  });

  const fetchProducts = async () => {
    const snapshot = await getDocs(collection(db, 'products'));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[];
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      name: formData.name,
      description: formData.description,
      status: formData.status,
      link: formData.link,
      rank: Number(formData.rank)
    };

    const docRef = await addDoc(collection(db, 'products'), newProduct);
    setProducts([...products, { id: docRef.id, ...newProduct }]);
    setFormData({ name: '', description: '', status: '', link: '', rank: '' });
  };

  const deleteProduct = async (id: string) => {
    await deleteDoc(doc(db, 'products', id));
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div className="space-y-8">
      <Card className="glass-effect cyber-border px-4 pt-4">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">Name</label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Product name"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">Description</label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Product description"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">Status</label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                placeholder="Available / Sold Out"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">Link</label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                placeholder="Product URL"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">Rank</label>
              <input
                type="number"
                className="w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                value={formData.rank}
                onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                placeholder="Rank (e.g. 1, 2, 3)"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
            >
              Add Product
            </Button>
          </form>
        </CardContent>
      </Card>

      {products.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <Card
                key={product.id}
                className="glass-effect cyber-border hover:border-primary/40 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold text-foreground">{product.name}</h4>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost" className="hover:bg-primary/10 hover:text-primary">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover:bg-red-500/10 hover:text-red-400"
                          onClick={() => deleteProduct(product.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                    <p className="text-xs text-foreground/60">Status: {product.status}</p>
                    <a href={product.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 underline">
                      Visit Link
                    </a>
                    <p className="text-xs text-foreground/60">Rank: {product.rank}</p>
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

export default ProductsForm;
