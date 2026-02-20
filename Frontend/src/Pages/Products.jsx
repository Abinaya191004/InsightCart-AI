/*
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../Components/ProductCard";
import CategoryBar from "../Components/CategoryBar";
import BackButton from "../Components/BackButton";

function Products({ addToCart, search, favorites, toggleFavorite, goToBack, goToCheckout }) {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const url =
      category === "All"
        ? "http://localhost:5000/api/products"
        : `http://localhost:5000/api/products?category=${category}`;

    axios.get(url).then((res) => setProducts(res.data));
  }, [category]);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="p-4 bg-white border-b flex items-center gap-2">
        <BackButton onBack={goToBack} label="Back" />
      </div>
      <CategoryBar setCategory={setCategory} />

  
      <div className="px-6 py-4 md:hidden">
        <input
          placeholder="Search products..."
          className="w-full border px-4 py-2 rounded"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            addToCart={addToCart}
            toggleFavorite={toggleFavorite}
            favorites={favorites}
            goToCheckout={goToCheckout}
          />
        ))}
      </div>
    </>
  );
}

export default Products;*/

import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../Components/ProductCard";

function Products({ addToCart, favorites, toggleFavorite }) {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  // 🔹 Fetch ALL products once (for dropdown generation)
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setAllProducts(res.data);
        setProducts(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // 🔹 Filter products when category or subCategory changes
  useEffect(() => {
    let filtered = allProducts;

    if (category) {
      filtered = filtered.filter(
        (p) => p.category === category
      );
    }

    if (subCategory) {
      filtered = filtered.filter(
        (p) => p.subCategory === subCategory
      );
    }

    setProducts(filtered);
  }, [category, subCategory, allProducts]);

  // 🔹 Generate unique categories dynamically
  const categories = [
    ...new Set(allProducts.map((p) => p.category)),
  ];

  // 🔹 Generate unique subcategories based on selected category
  const subCategories = [
    ...new Set(
      allProducts
        .filter((p) => p.category === category)
        .map((p) => p.subCategory)
    ),
  ];

  return (
    <div>

      {/* 🔹 Dropdown Filters */}
      <div className="flex gap-4 p-6">

        {/* Category Dropdown */}
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setSubCategory("");
          }}
          className="border px-4 py-2 rounded"
        >
          <option value="">All Categories</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* SubCategory Dropdown */}
        <select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          className="border px-4 py-2 rounded"
          disabled={!category}
        >
          <option value="">All Subcategories</option>
          {subCategories.map((sub, index) => (
            <option key={index} value={sub}>
              {sub}
            </option>
          ))}
        </select>

      </div>

      {/* 🔹 Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            addToCart={addToCart}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>

    </div>
  );
}

export default Products;



