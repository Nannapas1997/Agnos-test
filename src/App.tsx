
import './App.css'
import { Container } from '@mui/material';
import DarkModeToggle from './components/DarkModeToggie';
import FoodCard from './components/FoodCard';
import Pagination from './components/Pagination';
import { useState } from "react";
function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeChange = (isDark: boolean) => {
    setIsDarkMode(isDark);
  };
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortOption, setSortOption] = useState("az");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);
  const toggleSort = () => setIsSortOpen(!isSortOpen);

  const foodItems = [
    {
      image: "/gyo.png",
      name: "Pork Gyoza",
      description: "Golden-brown dumplings packed with savory pork, ginger, garlic, and sesame oil. Served with a soy-vinegar dipping sauce.",
      price: 70.00,
      category: "อาหารญี่ปุ่น",
      rating: 4.8
    },
    {
      image: "/burger.png",
      name: "Pork Burger",
      description: "Tender chicken dumplings with fresh vegetables and aromatic herbs. Perfectly pan-fried to golden perfection.",
      price: 65.00,
      category: "อาหารฝรั่ง",
      rating: 4.5
    },
    {
      image: "/food.png",
      name: "Mixed Vegetable Salad with Couscous",
      description: "Crispy vegetable dumplings filled with cabbage, carrots, mushrooms, and spring onions. A delightful vegetarian option.",
      price: 60.00,
      category: "อาหารเจ",
      rating: 4.3
    },
    {
      image: "/salmon.png",
      name: "Salmon Poke Bowl",
      description: "Premium shrimp dumplings with a hint of ginger and garlic. Steamed to perfection and served with ponzu sauce.",
      price: 85.00,
      category: "อาหารญี่ปุ่น",
      rating: 4.9
    },
    {
      image: "/cupcake.png",
      name: "Cup Cake",
      description: "A bite-sized cake with soft texture and creamy frosting.",
      price: 120.00,
      category: "ของหวาน",
      rating: 4.6
    },
    {
      image: "/spa.png",
      name: "Spaghetti",
      description: "A classic Italian pasta made from long, thin noodles, often served with tomato sauce, meat, or herbs.",
      price: 150.00,
      category: "อาหารอิตาเลียน",
      rating: 4.7
    },
    {
      image: "/mix-salad.png",
      name: "Mix Salad",
      description: "Fresh mixed greens with colorful vegetables and a light vinaigrette dressing.",
      price: 200.00,
      category: "อาหารเจ",
      rating: 4.4
    },
    {
      image: "/fruit.png",
      name: "Fruit Bowl",
      description: "Small, juicy fruits that grow in clusters. Sweet and refreshing, eaten fresh or dried as raisins.",
      price: 160.00,
      category: "ของหวาน",
      rating: 4.5
    },
    {
      image: "/gyo.png",
      name: "Vegetable Gyoza",
      description: "Golden-brown vegetable dumplings with cabbage and mushrooms.",
      price: 70.00,
      category: "อาหารญี่ปุ่น",
      rating: 4.2
    },
    {
      image: "/burger.png",
      name: "Chicken Burger",
      description: "Juicy chicken patty with fresh lettuce, tomatoes, and special sauce.",
      price: 65.00,
      category: "อาหารฝรั่ง",
      rating: 4.6
    }

  ];


  let filteredItems = foodItems.filter(item => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower);

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(item.category);

    return matchesSearch && matchesCategory;
  });


  if (sortOption === "az") {
    filteredItems = [...filteredItems].sort((a, b) => a.name.localeCompare(b.name, 'th'));
  } else if (sortOption === "za") {
    filteredItems = [...filteredItems].sort((a, b) => b.name.localeCompare(a.name, 'th'));
  } else if (sortOption === "price-low") {
    filteredItems = [...filteredItems].sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-high") {
    filteredItems = [...filteredItems].sort((a, b) => b.price - a.price);
  }


  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
    setCurrentPage(1);
  };

  const handleToggleWishlist = (itemName: string) => {
    setWishlist(prev => {
      if (prev.includes(itemName)) {
        return prev.filter(name => name !== itemName);
      } else {
        return [...prev, itemName];
      }
    });
  };
  return (
    <>
      <div className={`w-full shadow-[0_0_20px_rgba(0,0,0,0.25)] ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <Container maxWidth="xl">
          <div className="flex flex-row justify-between items-center py-3 md:py-4 px-4 md:px-0">
            <img src="/logo.png" alt="logo" className="h-[60px] md:h-[80px] lg:h-[100px] object-contain" />

            <div className="flex flex-row gap-2 md:gap-3 items-center mr-[45px]">

              <DarkModeToggle onToggle={handleThemeChange} initialValue={false} />

              <div className="relative">
                <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-[40px] md:h-[40px]">
                  <path
                    d="M20 35L17.1 32.4C8.8 25.12 4 20.04 4 13.5C4 8.16 8.16 4 13.5 4C16.52 4 19.42 5.38 21.36 7.56C21.82 8.1 22.22 8.68 22.58 9.3C22.94 8.68 23.34 8.1 23.8 7.56C25.74 5.38 28.64 4 31.66 4C36.84 4 41 8.16 41 13.5C41 20.04 36.2 25.12 27.9 32.4L20 35Z"
                    fill="none"
                    stroke={isDarkMode ? "white" : "#FF6A44"}
                    strokeWidth="2"
                  />
                </svg>
                {wishlist.length > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlist.length}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div className="w-full bg-[linear-gradient(90deg,#FF6A00_0%,#FF8C22_100%)] py-8 md:py-12 lg:py-16">
        <Container maxWidth="xl">

          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 lg:gap-10 px-4 md:px-0">

            {/* LEFT TEXT */}
            <p className="text-white text-[24px] sm:text-[28px] md:text-[36px] lg:text-[45px] leading-snug italic md:ml-0 lg:ml-14 text-center md:text-left flex-1">
              "There is no sincere love than the love of food."
              <span className="not-italic font-medium block sm:inline mt-2 sm:mt-0"> — George Bernard Shaw</span>
            </p>

            {/* RIGHT IMAGE - Always on the right */}
            <div className="flex justify-end flex-shrink-0 w-full md:w-auto relative bottom-15">
              <img
                src="/cake.png"
                alt="cake"
                className="w-[200px] sm:w-[250px] md:w-[350px] lg:w-[450px] xl:w-[500px] object-contain"
              />
            </div>

          </div>
        </Container>

      </div>
      <div className="bg-[linear-gradient(90deg,#FF6A00_0%,#FF8C22_100%)] py-4 md:py-6">
        <Container maxWidth="md">

          <div className="flex flex-col md:grid md:grid-cols-[1fr_auto] gap-4 items-center px-4 md:px-0">

            <div className="w-full">
              <div className="flex items-center bg-white rounded-full px-4 md:px-5 py-2 md:py-2.5 shadow-[0_0_10px_rgba(0,0,0,0.15)]">
                <img src="/search.png" className="w-4 h-4 md:w-5 md:h-5 opacity-60 mr-2 md:mr-3" />
                <input
                  type="search"
                  placeholder="ค้นหาอาหาร"
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full text-sm md:text-base text-gray-500 placeholder:text-gray-400 outline-none"
                />
              </div>
            </div>
            <div className="flex justify-center gap-6 md:gap-8 text-white text-sm md:text-base">
              <div className="relative">
                <button onClick={toggleFilter} className="flex items-center gap-1 md:gap-2">
                  <img src="/filter.png" alt="filter" className="w-8 h-8 md:w-10 md:h-10" />
                  <span className="text-sm md:text-base">Filter</span>
                </button>
                {isFilterOpen && (
                  <div className="absolute bottom-full mb-2 bg-white text-gray-700 rounded-lg shadow-lg p-3 w-48 left-0 z-40">
                    <label className="flex items-center px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        className="mr-3 w-4 h-4"
                        checked={selectedCategories.includes("อาหารญี่ปุ่น")}
                        onChange={() => handleCategoryToggle("อาหารญี่ปุ่น")}
                      />
                      <span className="text-sm">อาหารญี่ปุ่น</span>
                    </label>
                    <label className="flex items-center px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        className="mr-3 w-4 h-4"
                        checked={selectedCategories.includes("อาหารฝรั่ง")}
                        onChange={() => handleCategoryToggle("อาหารฝรั่ง")}
                      />
                      <span className="text-sm">อาหารฝรั่ง</span>
                    </label>
                    <label className="flex items-center px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        className="mr-3 w-4 h-4"
                        checked={selectedCategories.includes("อาหารเจ")}
                        onChange={() => handleCategoryToggle("อาหารเจ")}
                      />
                      <span className="text-sm">อาหารเจ</span>
                    </label>
                    <label className="flex items-center px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        className="mr-3 w-4 h-4"
                        checked={selectedCategories.includes("ของหวาน")}
                        onChange={() => handleCategoryToggle("ของหวาน")}
                      />
                      <span className="text-sm">ของหวาน</span>
                    </label>
                  </div>
                )}
              </div>
              <div className="relative">
                <button onClick={toggleSort} className="flex items-center gap-1 md:gap-2">
                  <img src="/sorting.png" alt="sort" className="w-8 h-8 md:w-10 md:h-10" />
                  <span className="text-sm md:text-base">Sorting</span>
                </button>
                {isSortOpen && (
                  <div className="absolute bottom-full mb-2 bg-white text-gray-700 rounded-lg shadow-lg p-2 w-40 right-0 z-40">
                    <button
                      className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm"
                      onClick={() => {
                        setSortOption("az");
                        setIsSortOpen(false);
                      }}
                    >
                      A → Z
                    </button>
                    <button
                      className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                      onClick={() => {
                        setSortOption("za");
                        setIsSortOpen(false);
                      }}
                    >
                      Z → A
                    </button>
                    <button
                      className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                      onClick={() => {
                        setSortOption("price-low");
                        setIsSortOpen(false);
                      }}
                    >
                      ราคา: ต่ำ → สูง
                    </button>
                    <button
                      className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                      onClick={() => {
                        setSortOption("price-high");
                        setIsSortOpen(false);
                      }}
                    >
                      ราคา: สูง → ต่ำ
                    </button>
                  </div>
                )}
              </div>

            </div>

          </div>
        </Container>
      </div>
      <div className={`py-16 px-4 md:px-8 ${isDarkMode ? 'bg-gradient-to-b from-gray-800 to-gray-900' : 'bg-gradient-to-b from-[#FFE5D9] to-[#FFDCC8]'}`}>
        <Container maxWidth="xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {currentItems.map((item, index) => (
              <FoodCard
                key={`${item.name}-${index}`}
                image={item.image}
                name={item.name}
                description={item.description}
                price={item.price}
                rating={item.rating}
                isWishlisted={wishlist.includes(item.name)}
                onToggleWishlist={() => handleToggleWishlist(item.name)}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Container>
      </div>

    </>
  );
}

export default App
