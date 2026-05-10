import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
// If you have Login/Admin pages, the app will still find them 
// because we are using the standard Route structure below.

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* This structure is compatible with your existing /login or /admin routes */}
    </Routes>
  );
}
