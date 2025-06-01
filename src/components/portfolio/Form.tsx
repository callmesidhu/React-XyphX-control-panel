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
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rank' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'products'), formData);
      console.log('Product added to Firestore');

      // Reset the form
      setFormData({
        name: '',
        description: '',
        link: '',
        status: '',
        rank: 0,
      });
    } catch (error) {
      console.error('Error adding product: ', error);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {['name', 'description', 'link', 'status'].map((field) => (
          <div className="space-y-2" key={field}>
            <label className="text-sm font-medium text-foreground/80">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <Input
              name={field}
              value={(formData as any)[field]}
              onChange={handleChange}
              placeholder={`Enter product ${field}`}
              required
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
