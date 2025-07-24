'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../configs/firebase'; // Adjust this path as needed

const ProductsForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    link: '',
    status: '',
    rank: 0,
    logo: '' // optional logo URL
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rank' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Trim optional empty string fields
      const payload = {
        ...formData,
        logo: formData.logo.trim() === '' ? undefined : formData.logo.trim()
      };

      await addDoc(collection(db, 'products'), payload);
      console.log('Product added to Firestore');

      // Reset form
      setFormData({
        name: '',
        description: '',
        link: '',
        status: '',
        rank: 0,
        logo: ''
      });
    } catch (error) {
      console.error('Error adding product: ', error);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-2" noValidate>
        {['name', 'description', 'link', 'status', 'logo'].map((field) => (
          <div className="space-y-0" key={field}>
            <label className="text-sm font-medium text-foreground/80">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <Input
              name={field}
              value={(formData as any)[field]}
              onChange={handleChange}
              placeholder={`Enter product ${field}${field === 'logo' ? ' (optional)' : ''}`}
              required={field !== 'logo'}
            />
          </div>
        ))}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground/80">Rank</label>
          <Input
            name="rank"
            type="number"
            value={formData.rank}
            onChange={handleChange}
            placeholder="Enter rank"
            required
          />
        </div>
        <Button type="submit" className="w-full bg-primary text-white">
          Add Product
        </Button>
      </form>
    </div>
  );
};

export default ProductsForm;
