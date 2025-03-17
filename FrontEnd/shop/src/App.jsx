import { Route, Routes } from 'react-router-dom';
import './App.css';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import ProductForm from './components/ProductForm';
import Layout from './components/Layout';
import SearchResultsPage from './components/SearchResultsPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ProductList />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/add-product" element={<ProductForm />} />
        <Route path="/edit-product/:id" element={<ProductForm />} />
        <Route path="/search-results" element={<SearchResultsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
