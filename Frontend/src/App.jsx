import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Components/Navbar";
import Chatbot from "./Components/Chatbot";
import Home from "./Pages/Home";
import CategoryView from "./Pages/CategoryView";
import Products from "./Pages/Products";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import ProtectedRoute from "./Components/ProtectedRoute";
import Favorites from "./Pages/Favorites"
import AddProduct from "./Pages/AddProduct";
import Account from "./Pages/Account";
import { API } from "./config/api";

function App() {
  const [cart, setCart] = useState([]);
  const [lastAdded, setLastAdded] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState("home");
  const [previousPage, setPreviousPage] = useState("home");
  const [favorites, setFavorites] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser && JSON.parse(storedUser).favorites 
      ? JSON.parse(storedUser).favorites 
      : [];
  });
  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [chatbotOpen, setChatbotOpen] = useState(false);

  console.log("App rendered, page:", page);

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const navigateTo = (newPage) => {
    setPreviousPage(page);
    setPage(newPage);
  };

  const goBack = () => {
    setPage(previousPage || "home");
  };

  const addToCart = (product) => {
    const exists = cart.find((item) => item._id === product._id);

    if (exists) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    setLastAdded(product);
    navigateTo("cart");
  };

  const toggleFavorite = async (product) => {
    const exists = favorites.find((p) => p._id === product._id);

    let newFavs;
    if (exists) {
      newFavs = favorites.filter((p) => p._id !== product._id);
    } else {
      newFavs = [...favorites, product];
    }
    setFavorites(newFavs);

    if (user) {
      try {
        const token = localStorage.getItem("token");
        await axios.post(
          `${API}/api/auth/favorites`,
          { favorites: newFavs.map(f => f._id) },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // update local storage user
        const updatedUser = { ...user, favorites: newFavs };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } catch (err) {
        console.error("Failed to update favorites in DB", err);
      }
    }
  };

  const openCheckout = (product) => { 
    setCheckoutProduct(product || null); 
    navigateTo("checkout"); 
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <ProtectedRoute>
      <Navbar
        cartCount={cart.reduce((a, c) => a + c.qty, 0)}
        favCount={favorites.length}
        search={search}
        setSearch={setSearch}
        goToHome={() => navigateTo("home")}
        goToCart={() => navigateTo("cart")}
        goToProducts={() => navigateTo("products")}
        goToFavorites = {() => navigateTo("favorites")}
        goToAddProduct={() => navigateTo("add-product")}
        goToCheckout={openCheckout}
        showChatbot={() => setChatbotOpen(true)}
        goToAccount={() => navigateTo("account")}
        logout={handleLogout}
        user ={user}
      />
      {page === "home" && (
        <Home
          goToCategory={(cat) => { 
            setSelectedCategory(cat); 
            navigateTo("category");
          }}
        />
      )}

      {page === "category" && (
        <CategoryView
          category={selectedCategory}
          addToCart={addToCart}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          goToBack={goBack}
          goToCheckout={openCheckout}
        />
      )}

      {page === "products" && (
        <Products
          addToCart={addToCart}
          search={search}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          goToBack={goBack}
          goToCheckout={openCheckout}
        />
      )}

      {page === "cart" && (
        <Cart
          cart={cart}
          setCart={setCart}
          goToCheckout={openCheckout}
          goToBack={goBack}
          lastAddedProduct={lastAdded}
          clearLastAdded={() => setLastAdded(null)}
        />
      )}

      {page === "favorites" && (
        <Favorites 
          favorites={favorites} 
          addToCart={addToCart} 
          goToBack={goBack}
          goToCheckout={openCheckout}
        />
      )}

      {page === "add-product" && (
        <AddProduct goToBack={goBack} />
      )}

      {page === "checkout" && (
        <Checkout 
          cart={cart} 
          setCart={setCart} 
          goToBack={goBack}
          product={checkoutProduct} 
        />
      )}

      {page === "account" && (
        <Account 
          user={user} 
          goToBack={goBack}
          logout={handleLogout}
          favorites={favorites}
          cart={cart}
        />
      )}

      {/* Chatbot Widget */}
      <Chatbot isOpen={chatbotOpen} setIsOpen={setChatbotOpen} />
    </ProtectedRoute>
  );
}

export default App;
