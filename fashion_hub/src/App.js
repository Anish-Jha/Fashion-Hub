import './App.css';
import Product from './Pages/Product';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Pages/Home';
import Admin from './Pages/Admin';
import MainRoutes from './Pages/MainRoutes';
import Footer from './Components/Footer/Footer';
import Cart from './Pages/Cart';
import HamburgerMenu from './Components/Navbar/Hamburger';
// import Dummy from './Components/Navbar/Dummy'


function App() {
  return (
      <div className="App">
        <Navbar/>
        <HamburgerMenu/>
        <MainRoutes/>
        <Footer/>
        {/* <Dummy/> */}
      </div>
  );
}

export default App;