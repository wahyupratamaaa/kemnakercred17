// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import { CiLocationArrow1 } from "react-icons/ci";

const Card = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/produk")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
        setLoading(false);
      });
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <header className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-10 mt-16 text-gray-900 text-start">
          Menu Makanan
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 ">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col w-full  rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer h-80 "
              onClick={() => handleProductClick(product)}
            >
              <div
                className="relative w-full h-64 bg-cover bg-center transition-all duration-300"
                style={{
                  backgroundImage: `url(${product.image || "kosong"})`,
                  objectFit: "cover",
                }}
              >
                {!product.image && (
                  <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold bg-black bg-opacity-60">
                    <span>Gambar Tidak Tersedia</span>
                  </div>
                )}
              </div>
              <div className="p-4 sm:p-6 h-5/6 flex flex-col justify-between">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                  {product.name}
                </h3>
                <p
                  className="text-gray-600 text-sm mb-4"
                  style={{ lineHeight: 1.6 }}
                >
                  {product.description}
                </p>
                <p className="mt-4 text-sm font-semibold text-red-600 flex justify-between items-center">
                  Rp {product.price.toLocaleString()}
                  <CiLocationArrow1 />
                </p>
              </div>
            </div>
          ))}
        </div>
      </header>

      <Modal
        product={selectedProduct}
        isOpen={isModalOpen}
        closeModal={closeModal}
      />
    </div>
  );
};

export default Card;
