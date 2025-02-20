import React, { useState } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import logo from "../../components/assets/google.png";
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../mutations/userMutation';
import Header from './Dashboard';



const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

export default function Login() {
  const [user, setUser] = useState([]);
  const [data, setData] = useState(null);
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      sessionStorage.setItem('access_token', codeResponse.access_token)
      setUser(codeResponse)
    },
    onError: (error) => console.log('Login Failed:', error)
  });

  const userSessionStorage = sessionStorage.getItem('access_token');
  const logOut = () => {
    googleLogout();
    sessionStorage.removeItem('access_token');
  };
  const logoutChildtoParent = (childdata) => {
    setData(childdata);
    if (childdata) {
      logOut();
    }
  }

  return (
    <>
        {userSessionStorage ? (
          <Header logoutChildtoParent={logoutChildtoParent} />
        ) : (
          <div className="flex items-center justify-center min-h-screen bg-forest bg-gray-800 bg-opacity-50" >
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col bg-opacity-90">
            <h1 className="text-3xl mb-4 text-center">Login</h1>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                <input type="text" name="username" id="username" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Username" />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <input type="password" name="password" id="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Password" />
              </div>
              <div className="flex items-center justify-between mb-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" >Login</button>
                <a href="#" className="text-blue-500 hover:text-blue-700 text-sm font-bold">Forgot Password?</a>
              </div>
              <div className="flex items-center justify-center mb-4">
                <button type="button"  className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded w-full flex items-center justify-center"
                  onClick={() => login()}>
                  <img src={logo} alt="Google" className="w-6 h-6 mr-2" />
                  Sign in with Google
                </button>
              </div>
          </div>
        </div>
        )}
    </>
  )
}
