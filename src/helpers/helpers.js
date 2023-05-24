import Swal from "sweetalert2";

export const noExisteTareaMenor = (subTarea, listaDeTareas) => {
  const existeTarea = listaDeTareas.find((tarea) => {
    return tarea?.subTareas.find(({ tarea, estadoDeTarea }) => {
      return ((tarea < subTarea?.tarea) && !estadoDeTarea);
    });
  });

  if (existeTarea) {
    const { tarea } = existeTarea?.subTareas.find(({ estadoDeTarea }) => !estadoDeTarea);
    Swal.fire({
      icon: 'info',
      html: `<p>PRIMERO DEBE FINALIZAR LA TAREA #${tarea} !</p>
      <p>LAS TAREAS DEBEN SER FINALIZADAS EN ORDEN, GRACIAS.</p>`,
    });
    return false;
  }

  return true;
};