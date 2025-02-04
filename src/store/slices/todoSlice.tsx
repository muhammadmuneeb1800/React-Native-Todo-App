import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import {TodoData, TodosState} from '../../types/types';
import auth from '@react-native-firebase/auth';

const initialState: TodosState = {
  todos: [],
  UpdateTodos: null,
};

// Add Todo
export const addTodo = createAsyncThunk<TodoData, TodoData>(
  'addTodo',
  async (data, thunkAPI) => {
    try {
      const docRef = await firestore().collection('All Todos').add(data);
      return {...data, id: docRef.id};
    } catch (error: any) {
      console.error('Error adding Todo:', error);
      return thunkAPI.rejectWithValue('Failed to add Todo');
    }
  },
);

// Get Todos
export const getTodos = createAsyncThunk<TodoData[], void>(
  'getTodos',
  async (_, thunkAPI) => {
    try {
      const user = auth().currentUser;
      if (user) {
        const snapshot = await firestore()
          .collection('All Todos')
          .where('user_id', '==', user?.uid)
          .get();
        let AllData: TodoData[] = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          AllData.push({
            id: doc.id,
            ...data,
          });
        });
        return AllData;
      } else {
        throw new Error('User not login!');
      }
    } catch (error: any) {
      console.error('Error getting Todos:', error);
      return thunkAPI.rejectWithValue('Failed to fetch Todos');
    }
  },
);

// Update Todo
export const updateTodo = createAsyncThunk<TodoData, TodoData>(
  'UpdateTodo',
  async (data, thunkAPI) => {
    try {
      await firestore().collection('All Todos').doc(data.id).update(data);
      return data;
    } catch (error: any) {
      console.error('Error updating Todo:', error);
      return thunkAPI.rejectWithValue('Failed to update Todo');
    }
  },
);

// Delete Todo
export const deleteTodo = createAsyncThunk<
  string | undefined,
  string | undefined
>('DeleteTodo', async (id, thunkAPI) => {
  try {
    await firestore().collection('All Todos').doc(id).delete();
    return id;
  } catch (error: any) {
    console.error('Error deleting Todo:', error);
    return thunkAPI.rejectWithValue('Failed to delete Todo');
  }
});

// Todos Slice
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    updateId: (state, action) => {
      const data = state.todos.filter(todo => todo.id === action.payload);
      state.UpdateTodos = data[0];
    },
    resetState: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<TodoData>) => {
        state.todos = [action.payload, ...state.todos];
      })
      .addCase(
        getTodos.fulfilled,
        (state, action: PayloadAction<TodoData[]>) => {
          state.todos = action.payload || [];
        },
      )
      .addCase(
        deleteTodo.fulfilled,
        (state, action: PayloadAction<string | undefined>) => {
          state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },
      )
      .addCase(
        updateTodo.fulfilled,
        (state, action: PayloadAction<TodoData>) => {
          const updatedTodos = state.todos.map(todo =>
            todo.id === action.payload.id ? action.payload : todo,
          );
          state.todos = updatedTodos || [];
        },
      );
  },
});

export const {updateId, resetState} = todoSlice.actions;

export default todoSlice.reducer;
