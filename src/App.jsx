import { useEffect, useState, useContext } from 'react';
import './App.css';
import { Link, Navigate } from 'react-router-dom';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { CartContext } from './assets/pages/CartContext';

function App() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [categoryResults, setCategoryResults] = useState([]);
  const [combinedResults, setCombinedResults] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [counts, setCounts] = useState([]);
  const { cartItems, setCartItems } = useContext(CartContext);
  const categories = [
    "beauty",
    "fragrances",
    "furniture",
    "groceries",
    "home-decoration",
    "kitchen-accessories",
    "laptops",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "mobile-accessories",
    "motorcycle",
    "skin-care",
    "smartphones",
    "sports-accessories",
    "sunglasses",
    "tablets",
    "tops",
    "vehicle",
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches"
  ];

  useEffect(() => {
    if (triggerSearch && search) {
      fetch(`https://dummyjson.com/products/search?q=${search}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data.products);
          setCounts(new Array(data.products.length).fill(1));
          console.log(data);
        })
        .catch((error) => console.error('Error fetching data:', error))
        .finally(() => setTriggerSearch(false));
      
      categories.forEach((category) => {
        if (search === category) {
          fetch(`https://dummyjson.com/products/category/${search}`)
            .then(res => res.json())
            .then(data => {
              setCategoryResults(data.products);
              setCounts(new Array(data.products.length).fill(0));
              console.log(data);
            });
        }
      });
    }
  }, [triggerSearch, search]);

  useEffect(() => {
    setCombinedResults([...results, ...categoryResults]);
  }, [results, categoryResults]);

  useEffect(() => {
    if (sortOrder) {
      const sortFunction = (a, b) => {
        if (sortOrder === 'lowToHigh') {
          return a.price - b.price;
        } else if (sortOrder === 'highToLow') {
          return b.price - a.price;
        }
        return 0;
      };
      setCombinedResults(prevCombinedResults => [...prevCombinedResults].sort(sortFunction));
    }
  }, [sortOrder]);

  function updateSearch(value) {
    setSearch(value);
  }

  function handleSearchClick() {
    setTriggerSearch(true);
  }

  function incrementCount(index) {
    const newCounts = [...counts];
    newCounts[index] += 1;
    setCounts(newCounts);
  }

  function decrementCount(index) {
    const newCounts = [...counts];
    if (newCounts[index] > 0) {
      newCounts[index] -= 1;
    }
    setCounts(newCounts);
  }

  function AddToCart(index) {
    if (counts[index] > 0) {
      const newCart = [...cartItems];
      newCart.push([combinedResults[index].images[0],combinedResults[index].title, combinedResults[index].price, counts[index]]);
      setCartItems(newCart);
      console.log(newCart);
    }
  }

  return (
    <>
      
      <div className="header">
        <h1>Shopping Mart</h1>

        <div className="search-space">
        <input type="text" value={search} onChange={e => updateSearch(e.target.value)} />
      <button onClick={handleSearchClick}>   Search   </button>
      <select name="" id="" value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
        <option value="">Filter</option>
        <option value="lowToHigh">low to high</option>
        <option value="highToLow">high to low</option>
      </select>
        </div>

      <Link to='cart'><div className="cart"><h1>Cart</h1></div></Link>
      
    </div>


    {!search ? <div className='boxes'>
      {categories.map((category) => {
        return (
          <div className="box" key={category} onClick={() => { setTriggerSearch(true); setSearch(category); setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 1000); }}>
            <h3>{category}</h3>
          </div>
        );
      })}
    </div> : <></>}


      <div>
        {combinedResults.map((result, index) => (
          <div key={index} className='item-container'>
            <div className="right">
              <img src={result.images[0]} alt={result.title} />
            </div>
            <div className="left">
              <div>{result.title} </div>
              <div className="price"> ${result.price}</div>
              <br /><br />
              <div className="rating">Rating : {result.rating}/5</div>
              <br /><br />
              <div>
                <FaMinus onClick={() => decrementCount(index)} /> {counts[index]} <FaPlus onClick={() => incrementCount(index)} />
              </div>
              <br />
              <div className='add-to-cart' onClick={() => [AddToCart(index), console.log(`clicked`)]}>Add to cart</div>
            </div>
            <br />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;