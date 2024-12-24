import { configureStore } from '@reduxjs/toolkit';
import { AddUserReducer } from './reducer';  

const store = configureStore({
  reducer: {
    user: AddUserReducer  
  }
});

export default store;
