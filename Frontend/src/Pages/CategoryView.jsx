import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../Components/ProductCard";
import BackButton from "../Components/BackButton";
const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const menShirt = `${API}/api/images/6988d72ac4ab78b6b1e69d45`;
const menShoes = `${API}/api/images/6988d72ac4ab78b6b1e69d47`;
const menAccessories = `${API}/api/images/6988d729c4ab78b6b1e69d43`;
const earringsThumb = `${API}/api/images/6988d726c4ab78b6b1e69d23`;
const nightwearThumb = `${API}/api/images/6988d72bc4ab78b6b1e69d4d`;
const westernThumb = `${API}/api/images/6988d72dc4ab78b6b1e69d5d`;
const skinCare = `${API}/api/images/6988d72cc4ab78b6b1e69d57`;
const makeup = `${API}/api/images/6988d729c4ab78b6b1e69d3f`;
const haircare = `${API}/api/images/6988d727c4ab78b6b1e69d31`;
const homeDecor = `${API}/api/images/6988d728c4ab78b6b1e69d35`;
const kidsToys = `${API}/api/images/6988d729c4ab78b6b1e69d3d`;
const kidsClothing = `${API}/api/images/6988d728c4ab78b6b1e69d39`;
const kidsAccessories = `${API}/api/images/6988d728c4ab78b6b1e69d37`;
const pensThumb = `${API}/api/images/6988d72bc4ab78b6b1e69d53`;
const notebookThumb = `${API}/api/images/6988d72bc4ab78b6b1e69d4f`;
const officeSuppliesThumb = `${API}/api/images/6988d72bc4ab78b6b1e69d51`;
const gymThumb = `${API}/api/images/6988d727c4ab78b6b1e69d2f`;
const fictionThumb = `${API}/api/images/6988d726c4ab78b6b1e69d29`;
const nonFictionThumb = `${API}/api/images/6988d726c4ab78b6b1e69d25`;
const phoneCasesThumb = `${API}/api/images/6988d72cc4ab78b6b1e69d55`;
const mobileThumb = `${API}/api/images/6988d72ac4ab78b6b1e69d4b`;
const accessoriesThumb = `${API}/api/images/6988d723c4ab78b6b1e69d19`;
const wellnessThumb = `${API}/api/images/6988d72cc4ab78b6b1e69d5b`;
const medicalThumb = `${API}/api/images/6988d729c4ab78b6b1e69d41`;
const fruitsThumb = `${API}/api/images/6988d726c4ab78b6b1e69d2b`;
const beveragesThumb = `${API}/api/images/6988d725c4ab78b6b1e69d1d`;
const groceriesImage = `${API}/api/images/6988d727c4ab78b6b1e69d2d`;

const SUBCATEGORIES = {
  Men: [
    { key: "Shirts", title: "Shirts", image: menShirt },
    { key: "Shoes", title: "Shoes", image: menShoes },
    { key: "Accessories", title: "Accessories", image: menAccessories },
  ],
  Women: [
    { key: "Earrings", title: "Earrings", image: earringsThumb },
    { key: "Kurta", title: "Kurta", image: westernThumb },
    { key: "Nightwear", title: "Nightwear", image: nightwearThumb },
    { key: "Western", title: "Western", image: westernThumb },
  ],
  Beauty: [
    { key: "Skincare", title: "Skincare", image: skinCare },
    { key: "Makeup", title: "Makeup", image: makeup },
    { key: "Haircare", title: "Haircare", image: haircare },
  ],
  Home: [
    { key: "Furniture", title: "Furniture", image: homeDecor },
    { key: "Bedding", title: "Bedding", image: homeDecor },
    { key: "Decor", title: "Decor", image: homeDecor },
  ],
  Kids: [
    { key: "Toys", title: "Toys", image: kidsToys },
    { key: "Clothing", title: "Clothing", image: kidsClothing },
    { key: "Accessories", title: "Accessories", image: kidsAccessories },
  ],
  Stationary: [
    { key: "Pens", title: "Pens", image: pensThumb },
    { key: "Notebooks", title: "Notebooks", image: notebookThumb },
    { key: "Office Supplies", title: "Office Supplies", image: officeSuppliesThumb },
  ],
  Sports: [
    { key: "Gym Equipment", title: "Gym Equipment", image: gymThumb },
    { key: "Sports Gear", title: "Sports Gear", image: gymThumb },
    { key: "Footwear", title: "Footwear", image: menShoes },
  ],
  Books: [
    { key: "Fiction", title: "Fiction", image: fictionThumb },
    { key: "Non-Fiction", title: "Non-Fiction", image: nonFictionThumb },
    { key: "Educational", title: "Educational", image: nonFictionThumb },
  ],
  Cases: [
    { key: "Phone Cases", title: "Phone Cases", image: phoneCasesThumb },
    { key: "Laptop Cases", title: "Laptop Cases", image: mobileThumb },
    { key: "Travel Cases", title: "Travel Cases", image: phoneCasesThumb },
  ],
  Electronics: [
    { key: "Mobiles", title: "Mobiles", image: mobileThumb },
    { key: "Accessories", title: "Accessories", image: accessoriesThumb },
    { key: "Gadgets", title: "Gadgets", image: mobileThumb },
  ],
  Healthcare: [
    { key: "Wellness", title: "Wellness", image: wellnessThumb },
    { key: "Supplements", title: "Supplements", image: medicalThumb },
    { key: "Medical", title: "Medical", image: medicalThumb },
  ],
  Groceries: [
    { key: "Fruits", title: "Fruits", image: fruitsThumb },
    { key: "Vegetables", title: "Vegetables", image: groceriesImage },
    { key: "Beverages", title: "Beverages", image: beveragesThumb },
  ],
};

function CategoryView({ category, addToCart, favorites, toggleFavorite, goToBack, goToCheckout }) {
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!selectedSubCategory) return;

    const url = `http://localhost:5000/api/products?category=${category}`;
    axios.get(url).then((res) => {
      const all = res.data || [];
      const sub = selectedSubCategory.toLowerCase();

      const filtered = all.filter((p) => {
        if (!p) return false;
        const fields = [p.subcategory, p.subCategory, p.type, p.category].filter(Boolean).map((f) => f.toString().toLowerCase());
        if (fields.some((f) => f.includes(sub))) return true;
        return (p.name || "").toString().toLowerCase().includes(sub);
      });

      setProducts(filtered);
    });
  }, [selectedSubCategory, category]);

  if (selectedSubCategory) {
    return (
      <div>
        <div className="p-4 bg-white border-b flex items-center gap-2">
          <BackButton onBack={() => setSelectedSubCategory(null)} label={`Back to ${category}`} />
        </div>
        <div className="p-6">
          <div className="text-lg font-semibold mb-4">{selectedSubCategory}</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
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
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="p-4 bg-white border-b flex items-center gap-2">
        <BackButton onBack={goToBack} label="Back" />
      </div>
      <div className="p-6">
        <div className="text-2xl font-bold mb-4">{category}</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {(SUBCATEGORIES[category] || []).map((sub) => (
            <button
              key={sub.key}
              onClick={() => setSelectedSubCategory(sub.key)}
              className="relative h-36 rounded overflow-hidden shadow-lg w-full text-left hover:shadow-xl transition"
            >
              <img src={sub.image} alt={sub.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/25 flex items-end">
                <div className="p-3 text-white font-medium">{sub.title}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryView;
