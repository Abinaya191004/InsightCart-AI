import { Trash } from "lucide-react";
import { useState, useEffect } from "react";
import BackButton from "../Components/BackButton";

function Cart({ cart, setCart, goToCheckout, goToBack, lastAddedProduct, clearLastAdded }) {
  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item._id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (lastAddedProduct) {
      setSelected(lastAddedProduct);
      clearLastAdded && clearLastAdded();
    }
  }, [lastAddedProduct, clearLastAdded]);

  if (cart.length === 0) {
    return (
      <div>
        <div className="p-4 bg-white border-b flex items-center gap-2">
          <BackButton onBack={goToBack} label="Back" />
        </div>
        <div className="p-10 text-center">
          <h2 className="text-xl font-bold">
            Your cart is empty 🛒
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="p-4 bg-white border-b flex items-center gap-2">
        <BackButton onBack={goToBack} label="Back" />
      </div>
      <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {cart.map((item) => (
        <div
          key={item._id}
          className="flex items-center gap-4 border-b py-4"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 object-cover rounded"
          />

          <div className="flex-1">
            <h3 className="font-semibold">{item.name}</h3>
            <p>₹{item.price}</p>
            <button onClick={() => setSelected(item)} className="text-sm text-indigo-600 mt-1">View Details</button>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => decreaseQty(item._id)}
              className="px-3 py-1 border rounded"
            >
              -
            </button>
            <span>{item.qty}</span>
            <button
              onClick={() => increaseQty(item._id)}
              className="px-3 py-1 border rounded"
            >
              +
            </button>
          </div>

          {/* Delete Icon */}
          <button
            onClick={() => removeItem(item._id)}
            className="text-red-500 ml-4 hover:text-red-700"
          >
            <Trash size={20} />
          </button>
        </div>
      ))}

      {/* Details Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-2xl w-full rounded shadow-lg p-6 relative">
            <button onClick={() => setSelected(null)} className="absolute right-3 top-3 text-gray-600">Close</button>

            <div className="flex gap-6">
              <img src={selected.image} alt={selected.name} className="w-48 h-48 object-cover rounded" />

              <div className="flex-1">
                <h3 className="text-2xl font-bold">{selected.name}</h3>
                <p className="text-gray-600 mt-2">Category: {selected.category || "—"}</p>
                <p className="mt-4">{selected.description || "No description available."}</p>

                <div className="mt-4">
                  <div className="font-semibold">Price: ₹{selected.price}</div>
                  <div className="text-sm text-gray-600 mt-1">Quantity: {selected.qty || 1}</div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button onClick={() => { setSelected(null); goToCheckout && goToCheckout(selected); }} className="bg-indigo-600 text-white px-4 py-2 rounded">Proceed to Checkout</button>
                  <button onClick={() => setSelected(null)} className="px-4 py-2 border rounded">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Total + Checkout */}
      <div className="mt-8 flex justify-between items-center">
        <h3 className="text-xl font-bold">
          Total: ₹{totalPrice}
        </h3>

        <button onClick={goToCheckout} className="px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          Proceed to Checkout
        </button>
      </div>
      </div>
    </div>
  );
}

export default Cart;
