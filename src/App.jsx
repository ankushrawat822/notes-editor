import { useState } from 'react'
import { Route , Routes} from 'react-router-dom'
import Home from './components/Home'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>

       <Routes>
        <Route path='/' element={<Home></Home>}></Route>
       </Routes>
       
    </>
  )
}

export default App
