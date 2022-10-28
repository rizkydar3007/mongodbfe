import Input from "../../../components/Input";
import "./index.scss";
import { useState } from "react";
import axios from "axios";

const Tambah = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_BASEURL + "/v1/product", {
        name: name,
        price: Number(price),
        stock: Number(stock),
        status: status,
      })
      .then((res) => {
        console.log(res);
        alert("Produk berhasil ditambahkan")
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" onChange={(e) => setName(e.target.value)} />
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" onChange={(e) => setPrice(e.target.value)} />
          <Input name="stock" type="number" placeholder="Stock Produk..." label="Stock" onChange={(e) => setStock(e.target.value)} />
          <Input name="status" type="checkbox" label="Active" defaultChecked={true} onChange={(e) => setStatus(e.target.value)} />
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Tambah;
