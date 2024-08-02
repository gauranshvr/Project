
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import './App.css';
import LoginForm from './components/LoginForm';
import FoodForm from './components/FoodForm';
import OrderHistory from './components/OrderHistory';
import Logout from './components/Logout';
import Home from './components/Home'; 
import clip1 from './clip1.mp4';
// import imageUrl from "../public/tea.jpeg"
function App() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [pendingAmount, setPendingAmount] = useState(0);
  const [currentOrderTotal, setCurrentOrderTotal] = useState(0);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      setUser(storedUser);
      loadUserData(storedUser.userId);
    }
  }, []);

  const loadUserData = (userId) => {
    const storedOrders = JSON.parse(localStorage.getItem(`${userId}-orders`)) || [];
    const storedPendingAmount = parseFloat(localStorage.getItem(`${userId}-pendingAmount`)) || 0;
    setOrders(storedOrders);
    setPendingAmount(storedPendingAmount);
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem(`${user.userId}-orders`, JSON.stringify(orders));
      localStorage.setItem(`${user.userId}-pendingAmount`, pendingAmount);
    }
  }, [orders, pendingAmount, user]);

  const addOrder = (order) => {
    const totalOrderPrice = order.items.reduce((total, item) => total + item.price, 0);
    const newOrders = [...orders, order];
    setOrders(newOrders);
    setPendingAmount(pendingAmount + totalOrderPrice);
    setCurrentOrderTotal(totalOrderPrice);
  };

  return (
    <Router>
      <video className='clip' src={clip1} controls autoPlay muted loop></video>
      <div className="App">
        <header className="App-header">
          {/* Conditionally render header based on user login status */}
          {!user && (
            <>
              <Link to="/login" className="button-link">Login</Link>
            </>
          )}
          {user && (
            <>
              <Link to="/" className="button-link">Home</Link>
              <Link to="/place-order" className="button-link">Place order</Link>
              <Link to="/orders" className="button-link">Orders</Link>
              <Logout setUser={setUser} setOrders={setOrders} setPendingAmount={setPendingAmount} />
            </>
          )}
        </header>
        <main>
          <Routes>
            <Route path="/login" element={<LoginForm setUser={(user) => { setUser(user); loadUserData(user.userId); }} />} />
            {user ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/place-order" element={<FoodForm addOrder={addOrder} user={user} />} />
                <Route path="/orders" element={<OrderHistory orders={orders} pendingAmount={pendingAmount} currentOrderTotal={currentOrderTotal} />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
