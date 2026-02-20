import { ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar({
  cartCount,
  favCount,
  search,
  setSearch,
  goToHome,
  goToCart,
  goToProducts,
  goToFavorites,
  goToCheckout,
  logout,
  goToAddProduct,
  goToAccount,
  user,
  showChatbot
}) {
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (callback) => {
    callback && callback();
    setMobileMenuOpen(false);
    setOpen(false);
  };

  return (
    <nav className="bg-white shadow px-4 md:px-6 py-4">
      <div className="flex justify-between items-center">
        
        {/* Logo + Menu */}
        <div className="flex items-center gap-4 md:gap-6">
          <h1
            className="text-lg md:text-xl font-bold cursor-pointer whitespace-nowrap"
            onClick={() => handleNavigate(goToHome)}
          >
            InsightCart <span className="text-indigo-600">AI</span>
          </h1>

          <div className="hidden lg:flex items-center gap-2">
            <button 
              onClick={() => handleNavigate(goToHome)} 
              className="text-sm px-3 py-1 rounded hover:bg-gray-100 transition"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigate(goToFavorites)} 
              className="text-sm px-3 py-1 rounded hover:bg-gray-100 transition"
            >
              Favorites
            </button>
            <button 
              onClick={() => handleNavigate(() => goToCheckout && goToCheckout())} 
              className="text-sm px-3 py-1 rounded hover:bg-gray-100 transition"
            >
              Checkout
            </button>
          </div>
        </div>

        {/* Search - Hidden on mobile, shown on md+ */}
        <div className="hidden md:block flex-1 mx-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="border px-4 py-2 rounded w-full text-sm"
          />
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-3 md:gap-4 relative">
          <button
            onClick={() => handleNavigate(goToAddProduct)}
            className="hidden md:inline-block bg-indigo-600 text-white px-3 py-1 text-sm rounded hover:bg-indigo-700 transition"
          >
            + Add Product
          </button>
          
          {/* Favorites */}
          <div 
            onClick={() => handleNavigate(goToFavorites)} 
            className="relative cursor-pointer hover:text-indigo-600 transition"
            title="Favorites"
          >
            <Heart size={18} />
            {favCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                              {favCount}
                            </span>}
          </div>

          {/* Cart */}
          <div 
            onClick={() => handleNavigate(goToCart)} 
            className="relative cursor-pointer hover:text-indigo-600 transition"
            title="Cart"
          >
            <ShoppingCart size={18} />
            {cartCount > 0 && <span className="badge text-xs">{cartCount}</span>}
          </div>

          {/* Account */}
          <div className="relative">
            <User
              size={18}
              className="cursor-pointer hover:text-indigo-600 transition"
              onClick={() => setOpen(!open)}
              title="Account"
            />

            {open && (
              <div className="absolute right-0 mt-3 bg-white shadow-lg rounded w-56 p-4 z-50">
                <p className="font-semibold text-gray-800">{user?.name || "User"}</p>
                <p className="text-sm text-gray-600">{user?.email || ""}</p>

                <hr className="my-3" />

                <div className="space-y-2">
                  <p className="text-sm text-gray-700">❤️ Favorites: {favCount}</p>
                  <p className="text-sm text-gray-700">🛒 Cart: {cartCount}</p>
                </div>

                <hr className="my-3" />

                <button
                  onClick={() => handleNavigate(goToAccount)}
                  className="w-full text-left px-3 py-2 rounded hover:bg-indigo-50 text-sm text-indigo-600 font-medium transition"
                >
                  👤 My Account
                </button>

                <button
                  onClick={() => handleNavigate(() => logout && logout())}
                  className="mt-2 w-full bg-red-600 text-white py-2 rounded text-sm font-medium hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1 hover:bg-gray-100 rounded transition"
            title="Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden mt-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="border px-4 py-2 rounded w-full text-sm"
        />
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute left-0 right-0 top-full bg-white border-t shadow-lg z-40">
          <div className="flex flex-col p-4 space-y-2">
            <button 
              onClick={() => handleNavigate(goToHome)} 
              className="text-left px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              🏠 Home
            </button>
            <button 
              onClick={() => handleNavigate(goToProducts)} 
              className="text-left px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              🛍️ Products
            </button>
            <button 
              onClick={() => handleNavigate(goToFavorites)} 
              className="text-left px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              ❤️ Favorites ({favCount})
            </button>
            <button 
              onClick={() => handleNavigate(goToCart)} 
              className="text-left px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              🛒 Cart ({cartCount})
            </button>
            <button 
              onClick={() => handleNavigate(goToAddProduct)} 
              className="text-left px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              ➕ Add Product
            </button>
            <hr className="my-2" />
            <button 
              onClick={() => handleNavigate(goToAccount)} 
              className="text-left px-4 py-2 rounded hover:bg-gray-100 transition text-indigo-600 font-medium"
            >
              👤 My Account
            </button>
            <button 
              onClick={() => {handleNavigate(goToHome); showChatbot && showChatbot();}} 
              className="text-left px-4 py-2 rounded hover:bg-gray-100 transition text-blue-600 font-medium"
            >
              💬 AI Assistant
            </button>
            <hr className="my-2" />
            <button 
              onClick={() => handleNavigate(() => {})} 
              className="text-left px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              ℹ️ About Us
            </button>
            <button 
              onClick={() => handleNavigate(() => {})} 
              className="text-left px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              ❓ FAQ
            </button>
            <button 
              onClick={() => handleNavigate(() => {})} 
              className="text-left px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              📞 Contact Us
            </button>
            <button 
              onClick={() => handleNavigate(() => {})} 
              className="text-left px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              ⚙️ Settings
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
