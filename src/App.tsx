import { createContext, useContext, useMemo, useState } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import AuthManager from './AuthManager';
import LoginPage from './LoginPage/LoginPage';
import RegistrationPage from './RegistrationPage/RegistrationPage';
import Space from './SpacesPage/Space/Space';
import SpacesPage from './SpacesPage/SpacesPage';
import HomePage from './HomePage';
import LogoutPage from './LogoutPage';

export let AppContext = createContext({ authManager: new AuthManager() })
export const BASE_URL = "http://127.0.0.1:8080"

function App() {
  return (
    <BrowserRouter>
      <AppContext.Provider value={{ authManager: new AuthManager() }}>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>} />
          <Route element={<SecuredRoute></SecuredRoute>}>
            <Route path="/spaces" element={<SpacesPage></SpacesPage>} >
              <Route path="/spaces/:id" element={<Space />}></Route>
            </Route>
          </Route>
          <Route path="/login" element={<LoginPage></LoginPage>} />
          <Route path="/logout" element={<LogoutPage></LogoutPage>} />
          <Route path="/registration" element={<RegistrationPage></RegistrationPage>} />
        </Routes >
      </AppContext.Provider>
    </BrowserRouter>
  );
}
function SecuredRoute() {
  const authManager = useContext(AppContext).authManager;
  return (
    authManager.isAuthenticated() ?
      <Outlet />
      :
      <Navigate to="/login" replace />
  )
}
export default App;
