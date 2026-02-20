import { useState } from "react";
import BackButton from "../Components/BackButton";

export default function AddProduct({ goToBack }) {
  const [form, setForm] = useState({ name: "", price: "", image: "", category: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          price: parseFloat(form.price) || 0,
          image: form.image,
          category: form.category,
        }),
      });

      if (!res.ok) throw new Error("Failed to add product");

      const data = await res.json();
      setStatus("success");
      setForm({ name: "", price: "", image: "", category: "" });
      console.log("Created product:", data);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div>
      <div className="p-4 bg-white border-b flex items-center gap-2">
        <BackButton onBack={goToBack} label="Back" />
      </div>
      <div className="max-w-xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">Add Product</h2>

      {status === "success" && (
        <div className="p-2 mb-4 bg-green-100 text-green-800">Product added successfully.</div>
      )}

      {status === "error" && (
        <div className="p-2 mb-4 bg-red-100 text-red-800">Failed to add product.</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        </div>

        <div>
          <label className="block text-sm font-medium">Price</label>
          <input name="price" value={form.price} onChange={handleChange} type="number" step="0.01" className="w-full border px-3 py-2 rounded" required />
        </div>

        <div>
          <label className="block text-sm font-medium">Image URL</label>
          <input name="image" value={form.image} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Category</label>
          <input name="category" value={form.category} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
            {status === "loading" ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}
