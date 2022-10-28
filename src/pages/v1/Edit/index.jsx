import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../../components/Input";
import axios from "axios";

const Edit = () => {
  const id = useParams().id;
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BASEURL + "/v1/product/" + id)
      .then((res) => {
        setProduct(res.data);
      })
      .then(() => setProduct((prev) => {
        return { ...prev, status: true };
      }))
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleChange = (e) => {
    const {name, type, value} = e.target;
    setProduct((a) => {
      return type === "number"
      ? { ...a, [name]: Number(value)}
      : { ...a, [name] : value}
    })
  };

const handleChangeCheckbox = (e) => {
  const { name, checked } = e.target;
  setProduct((prev) => {
    return { ...prev, [name]: checked}
  })
}

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name , price, stock, status } = product;
    axios
    .put(process.env.REACT_APP_BASEURL + "/v1/product/" + id, {
      name,
      price,
      stock,
      status
    })
    .then((res) => {
      console.log(res)
      alert("Berhasil di Update");
      window.location.reload();
    })
    .catch((error) => {
      console.log(error)
      alert("Berhasil di Update");
      window.location.reload();
    })
  }



  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form onSubmit = {handleSubmit}>
          <Input 
            name="name" 
            type="text" 
            placeholder="Nama Produk..." 
            label="Nama" 
            value={product.name} 
            onChange={handleChange}
          />
          <Input 
            name="price" 
            type="number" 
            placeholder="Harga Produk..." 
            label="Harga" 
            value={product.price} 
            onChange={handleChange}
          />
          <Input 
            name="stock" 
            type="number" 
            placeholder="Stock Produk..." 
            label="Stock" 
            value={product.stock}
            onChange={handleChange} 
          />
          <Input
            name="status" 
            type="checkbox" 
            label="Active"
            defaultChecked={true} 
            value={product.status}
            onChange={handleChangeCheckbox} 
          />
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
