import { useState } from 'react';
import { BASE_URL } from '../App';

export default function AddProduct() {
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<number | ''>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [category, setCategory] = useState<string>('jewelery');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !price || !description || !image || !category) {
      alert('Please fill out all fields');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          price,
          description,
          image,
          category,
        }),
      });

      const result = await response.json();
      console.log('Product created:', result);

      setTitle('');
      setPrice('');
      setDescription('');
      setImage('');
      setCategory('jewelery');
      alert('Product added successfully!');
    } catch (error) {
      console.log('Error creating product', error);
      alert('Failed create product');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-y-2 w-[300px] mt-4"
    >
      <input
        type="text"
        placeholder="Title"
        className="border border-neutral-700"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        className="border border-neutral-700"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      <textarea
        placeholder="Description"
        className="border border-neutral-700"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="url"
        placeholder="Image"
        className="border border-neutral-700"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <select
        className="border border-neutral-700"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      >
        <option value="jewelery">Jewelery</option>
        <option value="electronics">Electronics</option>
        <option value="men's clothing">Men's clothing</option>
        <option value="women's clothing">Women's clothing</option>
      </select>
      <button type="submit" className="bg-neutral-800 text-white">
        Create
      </button>
    </form>
  );
}
