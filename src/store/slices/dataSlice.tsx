import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

interface TodoData {
  id?: string;
  title?: string;
  notes?: string;
  tags?: string;
  dateTime?: Date | string;
}

interface TodosState {
  todos: TodoData[];
}

const initialState: TodosState = {
  todos: [],
};

// Add Todo
export const AddTodo = createAsyncThunk<TodoData, TodoData>(
  'AddTodo',
  async (data, thunkAPI) => {
    try {
      const docRef = await firestore().collection('Todos').add(data);
      console.log('Todo added successfully!', {...data, id: docRef.id});
      return {...data, id: docRef.id};
    } catch (error: any) {
      console.error('Error adding Todo:', error);
      return thunkAPI.rejectWithValue('Failed to add Todo');
    }
  },
);

// Get Todos
export const GetTodos = createAsyncThunk<TodoData[], void>(
  'GetTodos',
  async (_, thunkAPI) => {
    try {
      const snapshot = await firestore().collection('All Todos').get();
      let AllData: any = [];
      snapshot.forEach(doc => {
        AllData.push({id: doc.id, ...doc.data()});
      });
      return AllData;
    } catch (error: any) {
      console.error('Error getting Todos:', error);
      return thunkAPI.rejectWithValue('Failed to fetch Todos');
    }
  },
);

// Delete Todo
// export const DeleteTodo = createAsyncThunk<string, string>(
//   'DeleteTodo',
//   async (id, thunkAPI) => {
//     try {
//       await firestore().collection('All Todos').doc(id).delete();
//       console.log('Todo deleted successfully!', id);
//       return id;
//     } catch (error: any) {
//       console.error('Error deleting Todo:', error);
//       return thunkAPI.rejectWithValue('Failed to delete Todo');
//     }
//   },
// );

// Update Todo
// export const UpdateTodo = createAsyncThunk<TodoData, TodoData>(
//   'UpdateTodo',
//   async (data, thunkAPI) => {
//     try {
//       await firestore().collection('All Todos').doc(data.id).update(data);
//       console.log('Todo updated successfully!', data);
//       return data;
//     } catch (error: any) {
//       console.error('Error updating Todo:', error);
//       return thunkAPI.rejectWithValue('Failed to update Todo');
//     }
//   },
// );

// Todos Slice
const dataSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(AddTodo.fulfilled, (state, action: PayloadAction<TodoData>) => {
        state.todos = [action.payload, ...state.todos];
      })
      .addCase(
        GetTodos.fulfilled,
        (state, action: PayloadAction<TodoData[]>) => {
          state.todos = action.payload;
        },
      );
    // .addCase(DeleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
    //   state.todos = state.todos.filter(todo => todo.id !== action.payload);
    // })
    // .addCase(
    //   UpdateTodo.fulfilled,
    //   (state, action: PayloadAction<TodoData>) => {
    //     const index = state.todos.findIndex(
    //       todo => todo.id === action.payload.id,
    //     );
    //     if (index !== -1) {
    //       state.todos[index] = action.payload;
    //     }
    //   },
    // );
  },
});

export default dataSlice.reducer;
