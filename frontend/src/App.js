import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.scss'
import About from './components/About'
import Contact from './components/Contact'
import Home from './components/Home'
import Layout from './components/Layout'
import Portfolio from './components/Portfolio'
import Form from './Formdata/Form'
import { userContext } from './UserContext'

function App() {

  const [userDetails,setUserDetails] = useState(null);
  return (
    <userContext.Provider value={{ userDetails, setUserDetails }}>
      <Routes>
        <Route index element={<Form/>}/>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Route>
      </Routes>
    </userContext.Provider>
  )
}

export default App
