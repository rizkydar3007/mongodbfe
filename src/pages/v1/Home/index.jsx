import axios from "axios";
import { useEffect } from "react";
import { useState, React } from "react";
import { Link } from "react-router-dom";
import "./index.scss";

const Home = () => {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BASEURL + "/v1/product?name=" + search)
      .then((res) => setProduct(res.data))
      .catch((error) => console.log(error));
  });

  const deleteProduct = async (_id) => {
    let deleteItem = await window.confirm("Hapus produk ini ?");
    if (deleteItem){
      axios
        .delete(process.env.REACT_APP_BASEURL + "/api/v1/product/"+ _id )
        .then(() => {
          alert("Produk berhasil dihapus")
          window.location.reload();
        })
        .catch((error) => console.log(error));
    }
  }

  const searchChange = (e) => {
    setSearch(e.target.value);
  }

  return (
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">
        Tambah Produk
      </Link>
      <div className="search">
        <input 
        type="text" placeholder="Masukan kata kunci..." 
        onChange={(e) => searchChange(e)}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {product.length > 0 ? (
             product.map((item, index) => {
              return (
                <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td className="text-right">RP. {item.price ? item.price.toLocaleString("id-ID") : item.price}</td>
                <td className="text-center">
                  <Link to={`/detail/${item._id}`} className="btn btn-sm btn-info">
                    Detail
                  </Link>
                  <Link to={`/edit/${item._id}`} className="btn btn-sm btn-warning">
                    Edit
                  </Link>
                  <Link to="#" className="btn btn-sm btn-danger" onClick={() => deleteProduct(item._id)}>
                    Delete
                  </Link>
                </td>
              </tr>
              )
            })
          ) : (
            <tr>
              <td>-</td>
              <td>Barang tidak ditemukan</td>
              <td></td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
