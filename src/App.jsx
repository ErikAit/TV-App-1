// css import
import './App.css'

// route import
import { Route, Routes } from 'react-router-dom'

// component import
import Menu__Layout from './components/Layouts/menu-layout/Menu__Layout'
import Home from './pages/Home'
import FilmInfoPage from './pages/Film-Info_Page/FilmInfoPage'


function App() {

  return (
    <div className="App">
      <Routes>
        <Route element={<Menu__Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/info' element={<FilmInfoPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
