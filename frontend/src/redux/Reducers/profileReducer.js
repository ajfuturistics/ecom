import {
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_FAIL,
  CLEAR_ERRORS,
} from "../Constunts/profileConstunt";
import {
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESET,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_RESET,
} from "../Constunts/userConstunt";
export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true };

    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_PROFILE_FAIL:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_PROFILE_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case UPDATE_PASSWORD_REQUEST:
      return { ...state, loading: true };

    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_PASSWORD_FAIL:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_PASSWORD_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case UPDATE_USER_REQUEST:
      return { ...state, loading: true };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_USER_FAIL:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_USER_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case DELETE_USER_REQUEST:
      return { ...state, loading: true };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      };

    case DELETE_USER_FAIL:
      return { ...state, loading: false, error: action.payload };

    case DELETE_USER_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
