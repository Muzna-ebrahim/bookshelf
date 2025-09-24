import React, { useState } from 'react';

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('reader');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLogin) {
      const response = await fetch('http://localhost:5000/users');
      const users = await response.json();
      const user = users.find(u => u.username === username);
      
      if (user) {
        onLogin(user);
      } else {
        alert('User not found');
      }
    } else {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username, email, role })
      });
      
      if (response.ok) {
        alert('Account created! Please login.');
        setIsLogin(true);
        setUsername('');
        setEmail('');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="bg-white p-10 rounded-3xl shadow-2xl border max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Bookshelf
          </h1>
          <p className="text-gray-600">Your Interactive Reading Platform</p>
        </div>
        
        <div className="flex space-x-2 mb-6">
          <button
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
              isLogin ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
              !isLogin ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
            required
          />
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
            required
          />
          
          {!isLogin && (
            <>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                required
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
              >
                <option value="reader">Reader</option>
                <option value="admin">Admin</option>
              </select>
            </>
          )}
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;