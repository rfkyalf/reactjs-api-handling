import { BASE_URL } from '../App';

export default function DeleteProduct({ id }: { id: number }) {
  const handleDelete = async () => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      console.log('Product Deleted Succesfully', result);
      alert('Product has been delete');
    } catch (error) {
      console.log('Failed Delete Product', error);
      alert('Failed Delete Product');
    }
  };
  return <button onClick={handleDelete}>Delete</button>;
}
