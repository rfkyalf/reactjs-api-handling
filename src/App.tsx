import { useEffect, useState } from 'react';
import AddProduct from './components/AddProduct';
import DeleteProduct from './components/DeleteProduct';
import EditProduct from './components/EditProduct';

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
}

export const BASE_URL = 'https://fakestoreapi.com/products';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');
  const [orderBy, setOrderBy] = useState<string>('');
  const [limit, setLimit] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(products.length / limit);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    if (!term.startsWith(' ')) setQuery(term);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(BASE_URL);
      const result = (await response.json()) as Product[];
      const filteredProducts = result
        .filter((product) =>
          product.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        )
        .filter((product) => (category ? product.category === category : true))
        .sort((a, b) => {
          if (sortBy === 'title') {
            return orderBy === 'des'
              ? b.title.localeCompare(a.title)
              : a.title.localeCompare(b.title);
          }
          if (sortBy === 'price') {
            return orderBy === 'des' ? b.price - a.price : a.price - b.price;
          }
          return orderBy === 'des' ? b.id - a.id : a.id - b.id;
        });

      setProducts(filteredProducts);
      setCurrentPage(1);
    };

    fetchProducts();
  }, [category, query, sortBy, orderBy]);

  const paginatedProducts = products.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  return (
    <div className="p-4">
      <div className="flex items-center gap-x-4">
        <input
          type="search"
          className="border border-neutral-700"
          placeholder="Search..."
          onChange={handleSearch}
          value={query}
        />
        <select
          defaultValue=""
          onChange={(e) => setCategory(e.target.value)}
          className="border border-neutral-700"
        >
          <option value="">Select Category:</option>
          <option value="jewelery">Jewelery</option>
          <option value="electronics">Electronics</option>
          <option value="men's clothing">Men's clothing</option>
          <option value="women's clothing">Women's clothing</option>
        </select>
        <select
          defaultValue=""
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-neutral-700"
        >
          <option value="">Sort By:</option>
          <option value="title">Title</option>
          <option value="price">Price</option>
        </select>
        <select
          defaultValue=""
          onChange={(e) => setOrderBy(e.target.value)}
          className="border border-neutral-700"
        >
          <option value="">Order By:</option>
          <option value="asc">Ascending</option>
          <option value="des">Descending</option>
        </select>
        <select
          className="border border-neutral-700"
          defaultValue=""
          onChange={(e) => setLimit(Number(e.target.value))}
        >
          <option value={10} defaultValue={10}>
            Limit:
          </option>
          {Array.from({ length: 20 }).map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-x-2 mt-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="border border-neutral-700 disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          page {currentPage} of {totalPages || 1}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="border border-neutral-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-4">
        {paginatedProducts.map((product) => (
          <div key={product.id} className="border border-neutral-700 p-4">
            <p>{product.title}</p>
            <p>{product.category}</p>
            <p>${product.price}</p>
            <DeleteProduct id={product.id} />
            <span>&nbsp;|&nbsp;</span>
            <EditProduct
              id={product.id}
              prevTitle={product.title}
              prevDescription={product.description}
              prevPrice={product.price}
              prevImage={product.image}
              prevCategory={product.category}
            />
          </div>
        ))}
      </div>
      <AddProduct />
    </div>
  );
}
