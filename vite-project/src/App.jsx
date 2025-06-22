import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Pages/loginPage/AddItems'
import { Route, Routes } from 'react-router-dom'
import AddItems from './Pages/loginPage/AddItems'
import ShowItems from './Pages/itemsPage/ShowItems'
import { Header } from './Components/Header'
import Footer from './Components/footer'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
       <Routes>
        <Route path="/Additems" element={<AddItems />} />
       <Route path="/Showitems" element={<ShowItems/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
