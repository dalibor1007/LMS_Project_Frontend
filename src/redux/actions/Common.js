import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  HIDE_MESSAGE,
  SHOW_MESSAGE,
  TOGGLE_APP_DRAWER,
  UPDATING_CONTENT,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_FALI,
  UPDATE_USER_SUCCESS,
  DELETE_USER_SUCCESS,
} from '../../shared/constants/ActionTypes';

export const fetchStart = () => {
  return (dispatch) => dispatch({type: FETCH_START});
};

export const fetchSuccess = () => {
  return (dispatch) => dispatch({type: FETCH_SUCCESS});
};
export const updatingContent = () => {
  return (dispatch) => dispatch({type: UPDATING_CONTENT});
};

export const fetchError = (error) => {
  return (dispatch) => dispatch({type: FETCH_ERROR, payload: error});
};

export const showMessage = (message) => {
  return (dispatch) => dispatch({type: SHOW_MESSAGE, payload: message});
};
export const onToggleAppDrawer = () => {
  return (dispatch) => dispatch({type: TOGGLE_APP_DRAWER});
};

export const hideMessage = () => {
  return (dispatch) => dispatch({type: HIDE_MESSAGE});
};

export const getUserListSuccess = () =>{
  return (dispatch) => dispatch({type:GET_USER_LIST_SUCCESS});
}

export const getUserListFail = () =>{
  return (dispatch) => dispatch({type:GET_USER_LIST_FALI});
}

export const updateUserSuccess = () =>{
  return (dispatch) => dispatch({type:UPDATE_USER_SUCCESS});
}

export const deleteUserSuccess = () =>{
  return (dispatch) => dispatch({type:DELETE_USER_SUCCESS});
}