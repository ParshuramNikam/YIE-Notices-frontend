import Home from './components/Home'
import Notice from './components/Notice'
import {Route, Routes} from 'react-router-dom'
import Header from './components/Header';
import CreateNotice from './components/CreateNotice';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/notice" element={<Notice />}/>
        <Route path="/create_notice" element={<CreateNotice />}/>
      </Routes>
    </div>
  );
}

export default App;
