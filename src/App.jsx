import { useState } from 'react'
import { Route , Routes} from 'react-router-dom'
import Home from './components/Home'
import Test from './components/Test'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>

       <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/test' element={<Test></Test>}></Route>
       </Routes>
       
    </>
  )
}

export default App
