import Login from './components/login/Login'
import Body from './components/body/Body'
import Detail from './components/detail/Detail';
import MyAuctions from './components/myAuctions/MyAuctions';
import { Routes,Route,Navigate} from 'react-router-dom';
import { AuthProvider} from './hooks/useAuth';
import { ProtectedRoute } from './components/handlers/ProtectedRoute';

function App() {
  
  return (
    <AuthProvider>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/main' element={<ProtectedRoute> <Body/> </ProtectedRoute>} />
        <Route index element={<Navigate to={'/main'} />} />
        <Route path='/auctions/item/:id' element={<ProtectedRoute> <Detail /> </ProtectedRoute>} />
        <Route path='/my-auctions' element={<ProtectedRoute> <MyAuctions /> </ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  )
}

export default App
