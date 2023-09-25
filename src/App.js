import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './Components/PrivateRoute';
import PrivateRoute1 from './Components/PrivateRoute1';
import PostPage from './Pages/PostPage';
import Newfeed from './Pages/Newfeed';
import UpdatePost from './Pages/UpdatePost';
import UpdateUser from './Pages/UserInfo';
import Dashboard from './Pages/Dashboard';

class App extends Component {
  render() {
    return (
      <div >
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path='/' element={<Newfeed />} />
            <Route path='/newfeed' element={<Newfeed/>} />
            <Route path='/postpage/:postId' element={<PostPage/>} />
            <Route path='/userinfo/:userId' element={<UpdateUser/>} />
            
            <Route path='/' element={<PrivateRoute1/>} >
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
            </Route>

            <Route path='/' element={<PrivateRoute />}>
              <Route path='user/dashboard' element={<Dashboard />} />
              <Route path='/updatepost/:postId' element={<UpdatePost/>} />
            </Route>

          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
