import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listaDeTareas: [
    {
      tarea: 1, subTareas: [
        { tarea: 1, estadoDeTarea: false }
      ]
    },
    {
      tarea: 2, subTareas: [
        { tarea: 2, estadoDeTarea: false }
      ]
    },
    {
      tarea: 3, subTareas: [
        { tarea: 3.1, estadoDeTarea: false },
        { tarea: 3.2, estadoDeTarea: false }
      ]
    },
    {
      tarea: 4, subTareas: [
        { tarea: 4.1, estadoDeTarea: false },
        { tarea: 4.2, estadoDeTarea: false },
        { tarea: 4.3, estadoDeTarea: false }
      ]
    },
    {
      tarea: 5, subTareas: [
        { tarea: 5.1, estadoDeTarea: false },
        { tarea: 5.2, estadoDeTarea: false }
      ]
    },
    {
      tarea: 6, subTareas: [
        { tarea: 6, estadoDeTarea: false }
      ]
    },
  ],
};

export const tareasSlice = createSlice({
  name: 'tareas',
  initialState,
  reducers: {
    setEstadoDeTarea: (state, action) => {

      const findIndexTarea = state.listaDeTareas.findIndex(({ tarea }) => {
        return tarea === action.payload.tarea.tarea;
      });

      if (findIndexTarea >= 0) {
        const findIndexSubTarea = state.listaDeTareas[findIndexTarea]?.subTareas
          .findIndex(({ tarea }) => tarea === action.payload.subTarea.tarea);

        if (findIndexSubTarea >= 0) {
          const listaDeTareas = state.listaDeTareas;
          listaDeTareas[findIndexTarea].subTareas[findIndexSubTarea].estadoDeTarea = true;

          state.listaDeTareas = listaDeTareas;
        }
      }

    },
  },
});

// Action creators are generated for each case reducer function
export const { setEstadoDeTarea } = tareasSlice.actions;

export default tareasSlice.reducer;