const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const menImage = `${API}/api/images/6988d72ac4ab78b6b1e69d49`;
const menShirt = `${API}/api/images/6988d72ac4ab78b6b1e69d45`;
const menShoes = `${API}/api/images/6988d72ac4ab78b6b1e69d47`;
const menAccessories = `${API}/api/images/6988d729c4ab78b6b1e69d43`;
const earringsThumb = `${API}/api/images/6988d726c4ab78b6b1e69d23`;
const gymThumb = `${API}/api/images/6988d727c4ab78b6b1e69d2f`;
const homeDecor = `${API}/api/images/6988d728c4ab78b6b1e69d35`;
const beautyImage = `${API}/api/images/6988d724c4ab78b6b1e69d1b`;
const skinCare = `${API}/api/images/6988d72cc4ab78b6b1e69d57`;
const makeup = `${API}/api/images/6988d729c4ab78b6b1e69d3f`;
const haircare = `${API}/api/images/6988d727c4ab78b6b1e69d31`;
const kidsImage = `${API}/api/images/6988d728c4ab78b6b1e69d3b`;
const kidsToys = `${API}/api/images/6988d729c4ab78b6b1e69d3d`;
const kidsClothing = `${API}/api/images/6988d728c4ab78b6b1e69d39`;
const kidsAccessories = `${API}/api/images/6988d728c4ab78b6b1e69d37`;
const stationaryImage = `${API}/api/images/6988d72cc4ab78b6b1e69d59`;
const pens = `${API}/api/images/6988d72bc4ab78b6b1e69d53`;
const notebooks = `${API}/api/images/6988d72bc4ab78b6b1e69d4f`;
const officeSupplies = `${API}/api/images/6988d72bc4ab78b6b1e69d51`;
const booksImage = `${API}/api/images/6988d725c4ab78b6b1e69d1f`;
const fictionBook = `${API}/api/images/6988d726c4ab78b6b1e69d29`;
const nonFiction = `${API}/api/images/6988d726c4ab78b6b1e69d25`;
const casesImage = `${API}/api/images/6988d725c4ab78b6b1e69d21`;
const phoneCases = `${API}/api/images/6988d72cc4ab78b6b1e69d55`;
const electronicsImage = `${API}/api/images/6988d726c4ab78b6b1e69d27`;
const mobileThumb = `${API}/api/images/6988d72ac4ab78b6b1e69d4b`;
const accessoriesThumb = `${API}/api/images/6988d723c4ab78b6b1e69d19`;
const healthcareImage = `${API}/api/images/6988d727c4ab78b6b1e69d33`;
const wellness = `${API}/api/images/6988d72cc4ab78b6b1e69d5b`;
const supplements = `${API}/api/images/6988d729c4ab78b6b1e69d41`;
const groceriesImage = `${API}/api/images/6988d727c4ab78b6b1e69d2d`;
const fruitsThumb = `${API}/api/images/6988d726c4ab78b6b1e69d2b`;
const beveragesThumb = `${API}/api/images/6988d725c4ab78b6b1e69d1d`;

const CATEGORY_DATA = [
  {
    key: "Men",
    title: "Men",
    image: menImage,
  },
  {
    key: "Women",
    title: "Women",
    image: earringsThumb,
  },
  {
    key: "Beauty",
    title: "Beauty",
    image: beautyImage,
  },
  {
    key: "Home",
    title: "Home",
    image: homeDecor,
  },
  {
    key: "Kids",
    title: "Kids",
    image: kidsImage,
  },
  {
    key: "Stationary",
    title: "Stationary",
    image: stationaryImage,
  },
  {
    key: "Sports",
    title: "Sports & Fitness",
    image: gymThumb,
  },
  {
    key: "Books",
    title: "Books",
    image: booksImage,
  },
  {
    key: "Cases",
    title: "Cases & Covers",
    image: casesImage,
  },
  {
    key: "Electronics",
    title: "Electronics",
    image: electronicsImage,
  },
  {
    key: "Healthcare",
    title: "Healthcare",
    image: healthcareImage,
  },
  {
    key: "Groceries",
    title: "Groceries",
    image: groceriesImage,
  },
];

function Home({ goToCategory }) {
  return (
    <div className="p-6">
      <div style={{ color: "red", fontSize: "20px", marginBottom: "20px" }}>
        ✓ Home Component Loaded
      </div>
      {/* Category thumbnails: responsive grid with 3 columns on md+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {CATEGORY_DATA.map((cat) => (
          <button
            key={cat.key}
            onClick={() => goToCategory && goToCategory(cat.key)}
            className="relative h-40 rounded overflow-hidden shadow-lg w-full text-left hover:shadow-xl transition"
          >
            <img src={cat.image} alt={cat.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30 flex items-end">
              <div className="p-4 text-white font-semibold text-lg">{cat.title}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold">Explore Categories</h2>
        <p className="mt-2 text-gray-600">Tap a category to view subcategories and products</p>
      </div>
    </div>
  );
}

export default Home;
