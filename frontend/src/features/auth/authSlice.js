import { createSlice } from "@reduxjs/toolkit";

export const authSlice=createSlice({
    name:'auth',
    initialState:{isLoggedIn:false,
        username:'',
        id:-1
    },
    reducers:{
        setLogin:(state,action)=>{
            state.isLoggedIn=true;
            state.username=action.payload.username;
            state.id=action.payload.id;
        },
        setLogout:(state)=>{
            state.isLoggedIn=false;
            state.username='';
            state.id=-1;
        }
    }
});


export const {setLogin,setLogout}=authSlice.actions;

export default authSlice.reducer;