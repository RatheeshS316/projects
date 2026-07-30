import { Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './components/home'
import About from './components/about'
import Contact from './components/contact'
import ClippedDrawer from './components/navbar'
import Form from './components/form'


function App() {
  return (
    <>
      <ClippedDrawer/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </>
  )
}

export default App
