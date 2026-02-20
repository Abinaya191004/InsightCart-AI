import { useState } from "react";
import BackButton from "../Components/BackButton";

export default function Checkout({ cart, setCart, goToBack, product }) {
  const [form, setForm] = useState({ name: "", address: "", email: "", phone: "" });
  const [status, setStatus] = useState(null);

  const totalPrice = product
    ? (product.price || 0) * (product.qty || 1)
    : cart.reduce((t, i) => t + i.price * i.qty, 0);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleConfirm = (e) => {
    e.preventDefault();
    setStatus("processing");
    setTimeout(() => {
      setStatus("success");
      if (product) {
        setCart((prev) => prev.filter((item) => item._id !== product._id));
      } else {
        setCart([]);
      }
    }, 900);
  };

  if (status === "success") {
    return (
      <div>
        <div className="p-4 bg-white border-b flex items-center gap-2">
          <BackButton onBack={goToBack} label="Back" />
        </div>
        <div className="p-8 max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Order Confirmed</h2>
          <p className="mb-6">Thanks {form.name || "Customer"}, your order has been placed.</p>
          <button onClick={goToBack} className="bg-indigo-600 text-white px-4 py-2 rounded">Continue Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="p-4 bg-white border-b flex items-center gap-2">
        <BackButton onBack={goToBack} label="Back" />
      </div>
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-2">Shipping</h3>
          <form onSubmit={handleConfirm} className="space-y-3">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" required className="w-full border px-3 py-2 rounded" />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required className="w-full border px-3 py-2 rounded" />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone number" required className="w-full border px-3 py-2 rounded" />
            <textarea name="address" value={form.address} onChange={handleChange} placeholder="Shipping address" required className="w-full border px-3 py-2 rounded" />

            <button type="submit" className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded">
              {status === "processing" ? "Processing..." : `Pay ₹${totalPrice}`}
            </button>
          </form>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Order Summary</h3>
          <div className="space-y-3">
            {product ? (
              <div className="flex items-center gap-3">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-gray-600">{product.qty || 1} x ₹{product.price}</div>
                </div>
                <div>₹{(product.qty || 1) * product.price}</div>
              </div>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={item._id} className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-600">{item.qty} x ₹{item.price}</div>
                    </div>
                    <div>₹{item.qty * item.price}</div>
                  </div>
                ))}

                <div className="border-t pt-3 flex justify-between font-bold">
                  <div>Total</div>
                  <div>₹{totalPrice}</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
