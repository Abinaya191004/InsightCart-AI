import { useState } from "react";
import { Mail, MapPin, Phone, DollarSign, Settings as SettingsIcon, LogOut, Heart, Globe } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Account({ user, goToBack, logout, favorites = [] }) {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [showSettings, setShowSettings] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: user?.name || "User",
    email: user?.email || "",
    phone: user?.phone || "+91 9876543210",
    address: user?.address || "123 Main Street, City, State",
    gender: "female",
    upi: "user@upi",
    bankAccount: "1234567890",
    ifsc: "SBIN0001234",
  });

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "hi", name: "हिंदी" },
  ];

  const profileImage =
    userProfile.gender === "female"
      ? "https://em-content.zedo.com/thumbs/mobile/1ec/ecb7c84c9e2b47caaa65eac8ecb7c84c.png"
      : "https://em-content.zedo.com/thumbs/mobile/2c2/e894a8c34c7e4b69875c87abd1e894a8.png";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-white shadow px-6 py-4 flex items-center justify-between">
        <button
          onClick={goToBack}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold">My Account</h1>
        <div className="w-10"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            {/* Profile Picture */}
            <div className="flex flex-col items-center">
              <img
                src={profileImage}
                alt={userProfile.name}
                className="w-24 h-24 rounded-full object-cover bg-gray-200"
              />
              <label className="mt-3 text-sm cursor-pointer text-indigo-600 hover:text-indigo-700">
                Change Picture
              </label>
            </div>

            {/* Profile Info */}
            <div className="flex-1 w-full">
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 uppercase">Name</label>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {userProfile.name}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail size={16} />
                    <span>{userProfile.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone size={16} />
                    <span>{userProfile.phone}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin size={16} />
                  <span>{userProfile.address}</span>
                </div>
              </div>
            </div>

            {/* Gender & Language Selection */}
            <div className="flex flex-col gap-4 md:min-w-max">
              <div>
                <label className="text-xs text-gray-500 uppercase">Gender</label>
                <select
                  value={userProfile.gender}
                  onChange={(e) =>
                    setUserProfile({ ...userProfile, gender: e.target.value })
                  }
                  className="mt-1 px-3 py-2 border rounded"
                >
                  <option value="female">Female 👧</option>
                  <option value="male">Male 👦</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 text-xs text-gray-500 uppercase">
                  <Globe size={14} /> Language
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="mt-1 px-3 py-2 border rounded w-full md:w-auto"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Wishlist Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="text-red-500" />
            <h3 className="text-xl font-semibold">My Wishlist ({favorites.length})</h3>
          </div>
          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favorites.map((item) => (
                <div
                  key={item._id}
                  className="border rounded p-3 hover:shadow-lg transition"
                >
                  <p className="font-semibold text-sm truncate">
                    {item.name || item.title}
                  </p>
                  <p className="text-indigo-600 font-bold">
                    ₹{item.price || "N/A"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No items in wishlist yet.</p>
          )}
        </div>

        {/* Bank & UPI Details */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="text-green-600" />
            <h3 className="text-xl font-semibold">Payment Methods</h3>
          </div>

          <div className="space-y-4">
            {/* UPI */}
            <div className="border rounded p-4 bg-blue-50">
              <h4 className="font-semibold text-sm text-gray-700 mb-2">UPI ID</h4>
              <div className="flex items-center justify-between">
                <span className="font-mono text-gray-800">{userProfile.upi}</span>
                <button className="text-sm text-indigo-600 hover:text-indigo-700">
                  Edit
                </button>
              </div>
            </div>

            {/* Bank Account */}
            <div className="border rounded p-4 bg-green-50">
              <h4 className="font-semibold text-sm text-gray-700 mb-2">
                Bank Account
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Number:</span>
                  <span className="font-mono">****{userProfile.bankAccount.slice(-4)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">IFSC Code:</span>
                  <span className="font-mono">{userProfile.ifsc}</span>
                </div>
              </div>
              <button className="mt-2 text-sm text-indigo-600 hover:text-indigo-700">
                Edit
              </button>
            </div>
          </div>
        </div>

        {/* Payment & Refund Policy */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Payment & Refund Policy</h3>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="border-l-4 border-indigo-600 pl-4">
              <h4 className="font-semibold">Payment Methods</h4>
              <p>We accept UPI, Bank Transfer, Credit/Debit Cards, and Digital Wallets.</p>
            </div>
            <div className="border-l-4 border-green-600 pl-4">
              <h4 className="font-semibold">Refund Policy</h4>
              <p>
                Refunds are processed within 7-10 business days after order
                cancellation. Please ensure product is in original condition.
              </p>
            </div>
            <div className="border-l-4 border-orange-600 pl-4">
              <h4 className="font-semibold">Cancellation</h4>
              <p>
                Orders can be cancelled within 1 hour of placement. After that,
                contact our support team.
              </p>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-2 font-semibold w-full justify-between"
          >
            <span className="flex items-center gap-2">
              <SettingsIcon size={20} />
              Settings
            </span>
            <span>{showSettings ? "−" : "+"}</span>
          </button>

          {showSettings && (
            <div className="mt-4 space-y-3 border-t pt-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4"
                />
                <span>Email Notifications</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span>SMS Alerts</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                <span>Marketing Emails</span>
              </label>
              <button className="mt-3 w-full px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                Change Password
              </button>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <div className="bg-white rounded-lg shadow p-6">
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to logout?")) {
                logout();
              }
            }}
            className="w-full bg-red-600 text-white py-3 rounded font-semibold flex items-center justify-center gap-2 hover:bg-red-700 transition"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Account;
