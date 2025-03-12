import { Route, Router, Routes } from 'react-router'
import './App.css'
import ProductList from './components/ProductList'
import ProductDetails from './components/ProductDetails'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </>
  )
}

export default App
