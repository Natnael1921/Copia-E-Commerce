export default function ProductRow({ product, onEdit, onDelete }) {
  return (
    <tr>
      <td>
        <img src={product.image} alt={product.name} className="product-img" />
      </td>

      <td>{product.name}</td>

      <td>{product.category}</td>

      <td>${product.price}</td>

      <td>
        <button className="edit-btn" onClick={() => onEdit(product)}>
          Edit
        </button>

        <button className="delete-btn" onClick={() => onDelete(product._id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}
