import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_USER_LIST_SUCCESS,
  HIDE_MESSAGE,
  SHOW_MESSAGE,
  TOGGLE_APP_DRAWER,
  UPDATING_CONTENT,
  DELETE_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
} from '../../shared/constants/ActionTypes';

const INIT_STATE = {
  error: '',
  loading: false,
  isAppDrawerOpen: false,
  updatingContent: false,
  displayMessage: '',
  userList:[],
  flag:false,
};

const commonReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_START: {
      return {...state, error: '', displayMessage: '', loading: true};
    }
    case UPDATING_CONTENT: {
      return {...state, error: '', displayMessage: '', updatingContent: true};
    }
    case FETCH_SUCCESS: {
      return {
        ...state,
        error: '',
        displayMessage: '',
        loading: false,
        updatingContent: false,
      };
    }
    case SHOW_MESSAGE: {
      return {
        ...state,
        error: '',
        displayMessage: action.payload,
        loading: false,
        updatingContent: false,
      };
    }
    case FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        displayMessage: '',
        updatingContent: false,
      };
    }
    case HIDE_MESSAGE: {
      return {
        ...state,
        loading: false,
        error: '',
        displayMessage: '',
        updatingContent: false,
      };
    }
    case TOGGLE_APP_DRAWER: {
      return {
        ...state,
        isAppDrawerOpen: !state.isAppDrawerOpen,
      };
    }
    case GET_USER_LIST_SUCCESS: {
      return {
        ...state,
        userList:action.payload,
      };
    }
    case DELETE_USER_SUCCESS: {
      return {
        ...state,
        userList:action.payload,
      };
    }
    case UPDATE_USER_SUCCESS: {
      return{
        ...state,
        userList:action.payload,
      };
    }
    default:
      return state;
  }
};
export default commonReducer;
