import './App.css';
import { Link, Routes, Route } from 'react-router-dom';
import Home from './components/home';
//import { BrowserRouter as Routes, Route } from 'react-router-dom';
import Cart from './components/cart';
import ErrorPage from './components/ErrorPage';


function App() {
  return (
    <div>
        <nav>
            <h1>Prussian & Co.</h1>
                <ul>
                    <li>
                        <Link to="/"><p>Home</p></Link> 
                    </li>
                    
                    <li>    
                        <Link to="/login"><p>Log in</p></Link>
                    </li>

                    <li>
                        <Link to="/help"><p>Help</p></Link>
                    </li>

                    <li className="cart">
                        <Link to='/cart'><p>Shopping Bag(<span>0</span>)</p></Link>
                    </li>
                </ul>  
        </nav> 


        <Routes>
          <Route path='/' element={<Home />} errorElement={<ErrorPage />} /> {/*for each route add the errorElement if the url doesnt work */}
          <Route path='#'  errorElement={<ErrorPage />} />
          <Route path='#'  errorElement={<ErrorPage />} />
          <Route path='/cart' element={<Cart />} errorElement={<ErrorPage />} />
          <Route path='*' element={<ErrorPage />} /> {/* The '*' path will match any route that hasn’t been explicitly defined, helping you catch 404 errors more gracefully. */}
      </Routes>

    </div>
  
  );
}

export default App;
