
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { RegistroLotes } from './pages/RegistroLotes';
import { ExploradorSemillas } from './pages/ExploradorSemillas';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="registro" element={<RegistroLotes />} />
          <Route path="explorador" element={<ExploradorSemillas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
