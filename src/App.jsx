// css import
import './App.css'

// route import
import { Route, Routes } from 'react-router-dom'

// component import
import Menu__Layout from './components/Layouts/menu-layout/Menu__Layout'


function App() {

  return (
    <div className="App">
      <Routes>
        <Route element={<Menu__Layout />}>

        </Route>
      </Routes>
    </div>
  )
}

export default App
