import React from 'react'
import {Route,createBrowserRouter,createRoutesFromElements,RouterProvider} from 'react-router-dom'
import './index.css';
import { FirebaseProvider } from './context/Firebase.jsx';
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import VehicleListPage from './pages/VehicleListPage.jsx';
import RegistrationPage from './pages/RegistrationPage.jsx';
import EditPage from './pages/EditPage.jsx';

const router = createBrowserRouter(
  createRoutesFromElements( 
  <>
    
    <Route index element= {<LoginPage/>}/>
    <Route path="/Home" element= {<HomePage/>}/>
    <Route path="/VehicleList" element= {<VehicleListPage/>}/>
    <Route path="/Registration" element= {<RegistrationPage/>}/>
    <Route path='/Edit' element= {<EditPage/>}/>
    
  </>
  
))

const App = () => {

  const names = ['annef','ajx','raku'];
  return (
    <div>
      <RouterProvider router = {router} />
      <FirebaseProvider/>
    </div>
    
  )
}

export default App
 