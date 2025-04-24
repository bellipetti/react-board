
import { Route, Routes, Link } from 'react-router-dom';
import BoardList from './component/BoardList';
import BoardView from './component/BoardView';
import BoardWrite from './component/BoardWrite';
// import './App.css'


function App() {
  return (
    <>
    <div>
      <Link to="/">게시글 목록 조회</Link> &nbsp;&nbsp;     
      <Link to="/write">게시글 등록</Link>
    </div>
    <Routes>
      <Route path='/' element={<BoardList />} />
      <Route path='/list' element={<BoardList />} />
      <Route path='/view/:id' element={<BoardView />} />
      <Route path='/write' element={<BoardWrite />} />
      {/* <Route path='/modify/:id' element={<BoardModify />} /> */}
    </Routes>
    </>
  )
}

export default App
