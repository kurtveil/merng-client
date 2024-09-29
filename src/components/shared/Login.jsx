import React, { useState } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import Header from './Header';
import CardContent from '@mui/material/CardContent';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {grey} from '@mui/material/colors';
import logo from "../../components/assets/google.png";
import { Box, Card, Grid, Typography } from '@mui/material';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../mutations/userMutation';

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    width: 362,
    borderRadius: 10
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
  textAlign:"center",
}
});
export default function Login() {
  const [loginUser] = useMutation(LOGIN_USER);
  const [email, onChangeText] = React.useState('');
  const [password, onChangeNumber] = React.useState('');
  const [user, setUser] = useState([]);
  const [data, setData] = useState(null);
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {sessionStorage.setItem('access_token', codeResponse.access_token)
     setUser(codeResponse)},
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

  const themetoParent = (child) => {
    // console.warn(child);
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
  
  // console.warn(mode);
  return (
    <>

      {userSessionStorage ? (

          <Header logoutChildtoParent={logoutChildtoParent} themetoParent={themetoParent}  />
      ) : (
        <Box sx={{ flexGrow: 1 }}>
        <Grid container  direction="row" spacing={1}  justifyContent="center"
  alignItems="center">
       
        <div className='container'>
        
            <div >
           <Card  className="card-login" variant="outlined">
              {/* <div> */}
              <Grid item xs={12} md={12}>

              <Typography variant='h2' style={styles.text}>
                Bienvenido!
            </Typography>
                <Typography variant='h5' style={styles.text}>Descubre un mundo mejor!</Typography>
              </Grid>
              <div >

                <CardContent>
                  <SafeAreaView>
                 <Grid item xs={12} md={12}>
                    <TextInput
                      style={styles.input}
                      onChangeText={onChangeText}
                      value={email}
                      placeholder="User"
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>

                    <View style={styles.searchSection}>

                     
                    <TextInput
                      style={styles.input}
                      onChangeText={onChangeNumber}
                      value={password}
                      placeholder="Password"
                      keyboardType="numeric"
                    />
                     <VisibilityOffIcon sx={{ color: grey[900] }} />
                    </View>
                  <a href="http://" className='m-2 forgot-password'>Olvidaste la contraseña?</a>  
                  </Grid>
                  </SafeAreaView>
                </CardContent>
                <Grid item xs={12} md={12}> 
                <div className='footer-login'>
                  <button className='btn btn-primary m-3' onClick={(e) => handleSignIn(e)}>Sign in </button>
                  <div style={styles.text}>
                    Or
                  </div>
                  <div className=' m-3 btn-google' onClick={() => login()}> <img src={logo} alt=""  width={30} height={30}/> </div>
                </div>
                </Grid> 
              </div>
             
              {/* </div> */}
         </Card>
            </div>
          
         </div>
        </Grid>
        </Box>
      )}

    </>
  )
}
