import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Preloader from './components/Preloader/Preloader';

export default function App() {
  return (
    <BrowserRouter>
      <Preloader />
      <AppRoutes />
    </BrowserRouter>
  );
}
