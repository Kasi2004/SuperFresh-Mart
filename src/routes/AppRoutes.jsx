import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../layouts/Layout';
import Home from '../pages/Home';
import Categories from '../pages/Categories';
import Products from '../pages/Products';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import Wishlist from '../pages/Wishlist';
import Offers from '../pages/Offers';
import About from '../pages/About';
import Contact from '../pages/Contact';
import FruitsVegetables from '../pages/FruitsVegetables';
import Grocery from '../pages/Grocery';
import KitchenEssentials from '../pages/KitchenEssentials';
import Checkout from '../pages/Checkout';
import Dairy from '../pages/Dairy';
import Snacks from '../pages/Snacks';
import Beverages from '../pages/Beverages';
import FrozenFoods from '../pages/FrozenFoods';
import Bakery from '../pages/Bakery';
import PersonalCare from '../pages/PersonalCare';
import HomeCleaning from '../pages/HomeCleaning';
import BabyCare from '../pages/BabyCare';
import PetCare from '../pages/PetCare';
import Login from '../pages/Login';
import Register from '../pages/Register';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="categories" element={<Categories />} />
        <Route path="products" element={<Products />} />
        <Route path="fruits-vegetables" element={<FruitsVegetables />} />
        <Route path="grocery" element={<Grocery />} />
        <Route path="kitchen-essentials" element={<KitchenEssentials />} />
        <Route path="dairy" element={<Dairy />} />
        <Route path="snacks" element={<Snacks />} />
        <Route path="beverages" element={<Beverages />} />
        <Route path="frozen-foods" element={<FrozenFoods />} />
        <Route path="bakery" element={<Bakery />} />
        <Route path="personal-care" element={<PersonalCare />} />
        <Route path="home-cleaning" element={<HomeCleaning />} />
        <Route path="baby-care" element={<BabyCare />} />
        <Route path="pet-care" element={<PetCare />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="offers" element={<Offers />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* Wildcard redirect to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
