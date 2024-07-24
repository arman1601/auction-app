import { BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom';
import { AuthProvider } from './hooks/AuthProvider';
import { Layout } from './pages/Layout';
import { MainPage } from './pages/MainPage';
import { Login } from './pages/Login';
import { PersonalAuctions } from './pages/PersonalAuctions';
import { AuctionPage } from './pages/AuctionPage'
import { Registration } from './pages/Registration';
import { NotFound } from './pages/NotFound';

function App() {
  
  return (
    <AuthProvider>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/' element={<Layout />}>
            <Route path='/main' index element={<MainPage />} />
            <Route path='/personal-auctions' element={<PersonalAuctions />}/>
            <Route index element={ <Navigate to={'/main'} /> } />
            <Route path='/auctions/item/:id' element={<AuctionPage />} />
          </Route>
          <Route path='/404' element={<NotFound />} />
          <Route path='*' element={<Navigate to='/404' replace />} />
        </Routes>
    </AuthProvider>
  )
}

export default App
