import { Route, Routes } from 'react-router-dom';
import Tareas from './components/Tareas';
import FinalizarTarea from './components/FinalizarTarea';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Tareas />} />
      <Route path="/:tarea" element={<FinalizarTarea />} />
    </Routes>
  );
};

export default App;
