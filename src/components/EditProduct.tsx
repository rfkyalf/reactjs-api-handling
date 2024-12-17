import { useState } from 'react';
import { BASE_URL } from '../App';

export default function EditProduct({
  id,
  prevTitle,
  prevPrice,
  prevDescription,
  prevImage,
  prevCategory,
}: {
  id: number;
  prevTitle: string;
  prevPrice: number;
  prevDescription: string;
  prevImage: string;
  prevCategory: string;
}) {
  const [title, setTitle] = useState<string>(prevTitle);
  const [price, setPrice] = useState<number | ''>(prevPrice);
  const [description, setDescription] = useState<string>(prevDescription);
  const [image, setImage] = useState<string>(prevImage);
  const [category, setCategory] = useState<string>(prevCategory);
  const [open, setOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !price || !description || !image || !category) {
      alert('Please fill out all fields');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PATCH',
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
      console.log('Product edited:', result);

      alert('Product edited successfully!');
    } catch (error) {
      console.log('Error editing product', error);
      alert('Failed edit product');
    }
  };

  return (
    <>
      <button
        onClick={() => {
          setOpen(!open);
        }}
      >
        Edit
      </button>
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col gap-y-2 w-[300px] mt-4 ${
          open ? '' : 'hidden'
        }`}
      >
        <input
          type="text"
          placeholder="Title"
          className="border border-neutral-700"
          value={title}
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          className="border border-neutral-700"
          value={price}
          defaultValue={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <textarea
          placeholder="Description"
          className="border border-neutral-700"
          defaultValue={description}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="url"
          placeholder="Image"
          className="border border-neutral-700"
          defaultValue={image}
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <select
          className="border border-neutral-700"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          defaultValue={category}
        >
          <option value="jewelery">Jewelery</option>
          <option value="electronics">Electronics</option>
          <option value="men's clothing">Men's clothing</option>
          <option value="women's clothing">Women's clothing</option>
        </select>
        <button type="submit" className="bg-neutral-800 text-white">
          Edit
        </button>
      </form>
    </>
  );
}
