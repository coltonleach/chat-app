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

/*
  TODO LIST:
  When you log out and log into a different account,
  it displays the last chat from the previous account.
    * HIGH PRIORITY
    * Huge security vulnerability
  When a user updates their avatar or name, other people
  cannot see those changes. This is currently due to the
  way I have the storage setup, but should be relatively
  simple to fix.
    * HIGH PRIORITY
  Add multiple color themes that users can choose from
    * LOW PRIORITY
  Make it more clear when a user has an image attached
  to their chat.
    * LOW PRIORITY
  Display multiple users when searching for users, as
  well as allowing for a more general search query
  instead of an exact query
    * MEDIUM
  Make the images clickable to either fullscreen or open
  in a new tab
    *LOW
  
*/

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
