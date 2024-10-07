import React, { useMemo, useState } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import CardContent from '@mui/material/CardContent';
import { SafeAreaView, StyleSheet } from 'react-native';
import logo from "../../components/assets/google.png";
import { Card, TextField, Typography } from '@mui/material';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../mutations/userMutation';
import background from '../../components/assets/profile-background.jpg';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Header from './Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SwitchingTheme from './SwitcherTheme';

const styles = StyleSheet.create({
  input: {

  },
  card: {
    margin: 15,
    backgroundColor: "transparent",
    width: 500,
    justifyContent: "center"
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: "center",
  }
});

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

export default function Login() {
  const [loginUser] = useMutation(LOGIN_USER);
  const [email, setEmail] = React.useState('');
  const [password, setPasswrd] = React.useState('');
  const [user, setUser] = useState([]);
  const [mode, setMode] = useState("dark");
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

  const handleSignIn = async (e, a) => {

    try {
      const { data } = await loginUser({
        variables: { email, password },

      });

      // Aquí puedes manejar la respuesta del servidor (por ejemplo, guardar el token de acceso en el estado global o en una cookie).
      console.log("Usuario autenticado:", data.getUser);
    } catch (error) {
      console.error("Error al autenticar:", error.message);
    }
  };
  const colorMode = useMemo(
    () => ({
        toggleColorMode: () => {
            setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        },
        
    }),
    [mode],
);
const theme = useMemo(
  () =>
      createTheme({
          palette: {
              mode,
          },
      }),
  [mode],
);
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {userSessionStorage ? (
          <Header logoutChildtoParent={logoutChildtoParent} />
        ) : (
          <div  className="d-flex" style={{height: "100vh"}}>
            <div style={{width:"50%"}}> <img style={{width:'100%', height:'100%'}} src={background} alt="img-login" /></div>
            <div style={{width:"50%"}}>
              <Card style={{width:'100%', height:'100%'}}>
                <Typography variant='h2' style={styles.text} component="h2" gutterBottom>
                  Projects!
                </Typography>
                <Typography variant='h5' style={styles.text}>Bienvenido!</Typography>
                <div >

                  <CardContent>
                    <SafeAreaView>
                      <TextField 
                        value={email}
                        className='m-3'
                        placeholder="User" />
                      <TextField
                        className='m-3'
                        value={password}
                        placeholder="Password"
                        keyboardtype="numeric"
                      />

                      <a href="http://" className='m-2 forgot-password'>Olvidaste la contraseña?</a>

                    </SafeAreaView>
                  </CardContent>
                  <CardContent>
                    <CardActions style={{ display: 'grid' }}>
                      <Button variant="contained" size='large' className='' onClick={(e) => handleSignIn(e)}>Sign in </Button>
                      <div style={styles.text}>
                        Or
                      </div>
                      <Button className='m-0' variant="outlined" size='medium' onClick={() => login()}><img src={logo} alt="" width={30} height={30} /></Button>
                    </CardActions>
                  </CardContent>
                  <SwitchingTheme colorModContxt={ColorModeContext}/>
                </div>
              </Card>
           
            </div>
          </div>
        )}
             </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  )
}
