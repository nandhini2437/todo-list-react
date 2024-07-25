import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchTodos = createAsyncThunk(
  'todo/fetchAll',
  async (username, thunkAPI) => {
    const response = await axios.get('http://35.95.212.85/todo/all');
    const todos = response.data;

    const userTodos = todos.filter(todo => todo.username === username);

    return userTodos;
  }
);


export const addTodo = createAsyncThunk(
    'todo',
    async (newTodo, thunkAPI) => {
      const token = localStorage.getItem('authToken'); 
  
      try {
        const response = await axios.post('http://35.95.212.85/todo', newTodo, {
          headers: {
            'Authorization': `Bearer ${token}`, 
          },
        });
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    data: [],
    loading: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.data = action.payload;
        state.error='';
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
      })
      .addCase(addTodo.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.data.push(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
      })
  },
});

export default todoSlice.reducer;
