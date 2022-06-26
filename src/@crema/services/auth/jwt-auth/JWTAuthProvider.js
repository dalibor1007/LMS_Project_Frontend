import React, {createContext, useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_FALI,
} from '../../../../shared/constants/ActionTypes';
import jwtAxios, {setAuthToken} from './jwt-api';
import axios from 'axios';

const JWTAuthContext = createContext();
const JWTAuthActionsContext = createContext();

export const useJWTAuth = () => useContext(JWTAuthContext);

export const useJWTAuthActions = () => useContext(JWTAuthActionsContext);

const JWTAuthAuthProvider = ({children}) => {
  const [firebaseData, setJWTAuthData] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const dispatch = useDispatch();
  const server_url = 'http://localhost:3001';

  useEffect(() => {
    const getAuthUser = () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setJWTAuthData({
          user: undefined,
          isLoading: false,
          isAuthenticated: false,
        });
        return;
      }
      setAuthToken(token);
      jwtAxios
        .get('/auth')
        .then(({data}) =>
          setJWTAuthData({
            user: data,
            isLoading: false,
            isAuthenticated: true,
          }),
        )
        .catch(() =>
          setJWTAuthData({
            user: undefined,
            isLoading: false,
            isAuthenticated: false,
          }),
        );
    };

    getAuthUser();
  }, []);
  
  const signInUser = async ({email, password}) => {
    dispatch({type: FETCH_START});
    try {
      const {data} = await axios.post(`${server_url}/api/signin`,  {email, password});
      console.log('signdata========>>', data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.user.email);
      localStorage.setItem('name', data.user.name);
      localStorage.setItem('role', data.user.role);
      setAuthToken(data.token);
      // const res = await jwtAxios.get('/auth');
      setJWTAuthData({user: data, isAuthenticated: true, isLoading: false});
      dispatch({type: FETCH_SUCCESS});
    } catch (error) {
      setJWTAuthData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
    dispatch({type: FETCH_START});
    try{
      const data = await axios.get(`${server_url}/api/users`);
      console.log(data);
      dispatch({type:GET_USER_LIST_SUCCESS, payload:data});
    } catch (error) {
      dispatch({type:GET_USER_LIST_FALI})
    }
  };

  const signUpUser = async ({name, email, password}) => {
    dispatch({type: FETCH_START});
    try {
      // const {data} = await jwtAxios.post('signup', {name, email, password});
      const {data} = await axios.post(`${server_url}/api/signup`, { name, email, password});
      console.log('after=-------signupdata=============>>>', data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.email);
      localStorage.setItem('name', data.name);
      localStorage.setItem('role', data.role);
      setAuthToken(data.token);
      // const res = await jwtAxios.get('/auth');
      setJWTAuthData({user: data, isAuthenticated: true, isLoading: false});
      dispatch({type: FETCH_SUCCESS});
    } catch (error) {
      setJWTAuthData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };

  const logout = async () => {
    localStorage.removeItem('token');
    setAuthToken();
    setJWTAuthData({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  return (
    <JWTAuthContext.Provider
      value={{
        ...firebaseData,
      }}>
      <JWTAuthActionsContext.Provider
        value={{
          signUpUser,
          signInUser,
          logout,
        }}>
        {children}
      </JWTAuthActionsContext.Provider>
    </JWTAuthContext.Provider>
  );
};
export default JWTAuthAuthProvider;

JWTAuthAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
