import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

// A experiência nasce na Landing (Design System → Landing → Login →
// Portal, mandato do responsável de 2026-07-26). Login e Portal ainda
// não existem em frontend/src — só entram depois que a Landing estiver
// consolidada.
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
