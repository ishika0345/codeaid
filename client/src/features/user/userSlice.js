import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../api/axios.js'
import { toast } from 'react-hot-toast'

const initialState = {
    value:null,
    isLoading:true,
    error:null
}

export const fetchUser =createAsyncThunk('user/fetchUser', async (token)=>{
  const{ data } = await api.get('/api/user/data',{
        headers: {Authorization: `Bearer ${token}`}
    })
    return data.success ? data.user: null
})

export const updateUser =createAsyncThunk('user/update', async ({userData,token})=>{
  const{ data } = await api.post('/api/user/update',userData,{
        headers: {Authorization: `Bearer ${token}`}
    })
    if (data.success){
        toast.success(data.message)
        return data.user
    }
    else{
        toast.error(data.message)
        return null
    }
})

const userSlice =createSlice ({
    name:'user',
    initialState,
    reducers:{

    },
    extraReducers: (builder)=>{
       builder
        // 1. PENDING: Runs when fetchUser starts
        .addCase(fetchUser.pending, (state) => {
            state.isLoading = true; // Set loading to true
            state.error = null;
        })
        // 2. FULFILLED: Runs when the API call succeeds (HTTP 200/304)
        .addCase(fetchUser.fulfilled, (state, action) => {
            state.isLoading = false; // <<< 🔑 CRITICAL FIX: Set loading to false
            state.value = action.payload;
        })
        // 3. REJECTED: Runs when the API call fails (network error, 4xx/5xx)
        .addCase(fetchUser.rejected, (state, action) => {
            state.isLoading = false; // <<< 🔑 CRITICAL FIX: Set loading to false
            state.value = null; 
            state.error = action.error.message;
        })
    
    // --- UPDATE USER CASES ---
        .addCase(updateUser.fulfilled, (state, action) => {
            state.value = action.payload;
            // No need for a loading state here unless you have a separate 'isUpdating' spinner
        })
        // Add updateUser.rejected case for full error handling
        .addCase(updateUser.rejected, (state, action) => {
             // Handle update errors here
             state.error = action.error.message;
        });
    }
})

export default userSlice.reducer