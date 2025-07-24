'use client';

import React, { useEffect, useState } from 'react';
import { db } from '../../../configs/firebase';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy
} from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Edit, Save, X } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  status: string;
  link: string;
  rank: number;
  logo?: string;
}

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    status: '',
    link: '',
    rank: 0,
    logo: ''
  });

  const fetchProducts = async () => {
    const q = query(collection(db, 'products'), orderBy('rank'));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id: string) => {
    await deleteDoc(doc(db, 'products', id));
    setProducts(products.filter((product) => product.id !== id));
  };

  const startEditing = (product: Product) => {
    setEditingId(product.id);
    setEditData({
      name: product.name,
      description: product.description,
      status: product.status,
      link: product.link,
      rank: product.rank,
      logo: product.logo || ''
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = async (id: string) => {
    const productRef = doc(db, 'products', id);
    await updateDoc(productRef, {
      ...editData,
      rank: Number(editData.rank)
    });

    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { id, ...editData } : p))
    );
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Products List (Edit & Delete)</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product) =>
              editingId === product.id ? (
                <Card key={product.id} className="p-4 border shadow">
                  <input
                    className="w-full mb-2 rounded border p-2 text-white bg-gray-800"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    placeholder="Product name"
                  />
                  <input
                    className="w-full mb-2 rounded border p-2 text-white bg-gray-800"
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    placeholder="Description"
                  />
                  <input
                    className="w-full mb-2 rounded border p-2 text-white bg-gray-800"
                    value={editData.status}
                    onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                    placeholder="Status"
                  />
                  <input
                    className="w-full mb-2 rounded border p-2 text-white bg-gray-800"
                    value={editData.link}
                    onChange={(e) => setEditData({ ...editData, link: e.target.value })}
                    placeholder="Product link"
                  />
                  <input
                    className="w-full mb-2 rounded border p-2 text-white bg-gray-800"
                    value={editData.logo}
                    onChange={(e) => setEditData({ ...editData, logo: e.target.value })}
                    placeholder="Logo URL (optional)"
                  />
                  <input
                    className="w-full mb-4 rounded border p-2 text-white bg-gray-800"
                    type="number"
                    value={editData.rank}
                    onChange={(e) => setEditData({ ...editData, rank: Number(e.target.value) })}
                    placeholder="Rank"
                  />
                  <div className="flex justify-end gap-2">
                    <Button size="sm" onClick={() => saveEdit(product.id)} className="bg-violet-700 text-white">
                      <Save className="w-4 h-4 mr-1" /> Save
                    </Button>
                    <Button size="sm" variant="ghost" onClick={cancelEdit}>
                      <X className="w-4 h-4 mr-1" /> Cancel
                    </Button>
                  </div>
                </Card>
              ) : (
                <Card key={product.id} className="p-4 border shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => startEditing(product)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-500"
                        onClick={() => deleteProduct(product.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  {product.logo && (
                    <img
                      src={product.logo}
                      alt={`${product.name} logo`}
                      className="w-20 h-20 object-contain mb-2"
                    />
                  )}
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                  <p className="text-xs">Status: {product.status}</p>
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-purple-600 underline"
                  >
                    Visit Product
                  </a>
                  <p className="text-xs text-muted-foreground">Rank: {product.rank}</p>
                </Card>
              )
            )
          ) : (
            <p className="text-muted-foreground col-span-full">Loading...</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsList;
