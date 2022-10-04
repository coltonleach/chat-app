import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import Chat from './pages/Chat'
import { AuthContext } from './context/AuthContext'
import { useContext } from 'react'
import Settings from './pages/Settings'

function App() {
  const { currentUser } = useContext(AuthContext)

  const LoggedOutProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to='/login' />
    }
    return children
  }

  const LoggedInProtectedRoute = ({ children }) => {
    if (currentUser) {
      return <Navigate to='/' />
    }
    return children
  }

  //Unsure if this setup of protected routes is an efficient solution, but it definitely gets the job done. Just happens to not look pretty.

  return (
    <Router>
      <Routes>
        <Route path='/'>
          <Route
            index
            element={
              <LoggedOutProtectedRoute>
                <Chat />
              </LoggedOutProtectedRoute>
            }
          />
          <Route
            path='login'
            element={
              <LoggedInProtectedRoute>
                <Login />
              </LoggedInProtectedRoute>
            }
          />
          <Route
            path='register'
            element={
              <LoggedInProtectedRoute>
                <Register />
              </LoggedInProtectedRoute>
            }
          />
          <Route
            path='recovery'
            element={
              <LoggedInProtectedRoute>
                <ForgotPassword />
              </LoggedInProtectedRoute>
            }
          />
          <Route
            path='settings'
            element={
              <LoggedOutProtectedRoute>
                <Settings />
              </LoggedOutProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
