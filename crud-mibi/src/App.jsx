
import 'bootstrap/dist/css/bootstrap.css';

import { BrowserRouter, Route, Routes  } from 'react-router-dom'
import Home from './components/Home.jsx';
import Create from './components/Create.jsx';
import Update from './components/Update.jsx';

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
         <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
