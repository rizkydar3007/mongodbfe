import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./index.scss";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v2/product/" + id)
      .then((res) => setProduct(res.data[0]))
      .catch((error) => console.log(error));
    });
  return (
    <div className="main">
      <Link to="/v2" className="btn btn-primary">
        Kembali
      </Link>
      <table className="table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>: {product._id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>: {product.name}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>: RP. {product.price ? product.price.toLocaleString("id-ID") : product.price }</td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>: {product.stock}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>: {product.status ? "Active" : "Inactive"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Detail;
