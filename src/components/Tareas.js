import * as React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TaskIcon from '@mui/icons-material/Task';
import { Alert, Avatar, Button, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import Swal from 'sweetalert2';

const Tareas = () => {

  const navigate = useNavigate();

  const listaDeTareas = useSelector((state) => state.tareas.listaDeTareas);
  React.useEffect(() => {
    Swal.fire({
      type: 'success',
      allowOutsideClick: false,
      title: 'Success!',
      text: 'You are welcome!',
    })
  }, [])
  

  const navigateFinalizarTarea = React.useCallback((subTarea) => {

    const existeTareaMenor = listaDeTareas.find((tarea) => {
      return tarea?.subTareas.find(({ tarea, estadoDeTarea }) => {
        return ((tarea < subTarea?.tarea) && !estadoDeTarea);
      });
    });

    if (existeTareaMenor) {
      const { tarea } = existeTareaMenor?.subTareas.find(({ estadoDeTarea }) => !estadoDeTarea);
      Swal.fire({
        icon: 'info',
        html: `<p>PRIMERO DEBE FINALIZAR LA TAREA #${tarea} !</p>
        <p>LAS TAREAS DEBEN SER FINALIZADAS EN ORDEN, GRACIAS.</p>`,
      });
      return;
    }

    navigate(`./${subTarea?.tarea}`);

  }, []);


  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={1} md={3} lg={3} />

      <Grid item xs={12} sm={10} md={6} lg={6}>
        <Grid container spacing={2}>

          <Grid item xs={12} sm={10} md={12} lg={12}>
            <Alert severity="info">LISTA DE TAREAS</Alert>
          </Grid>

          {listaDeTareas.map(({ tarea, subTareas }, i) => (
            <Grid key={tarea} item xs={12} sm={6} md={6} lg={6}>
              <Card sx={{ width: "100%" }}>
                <CardHeader
                  avatar={<Avatar><TaskIcon /></Avatar>}
                  title={(
                    <Typography variant="p" component="div" color="text.secondary">
                      TAREA #{tarea}
                    </Typography>
                  )}
                />
                <CardContent>
                  {subTareas.filter((subTarea) => !subTarea?.estadoDeTarea).map((subTarea) => (
                    <Button key={subTarea?.tarea} fullWidth color="info" variant="contained" sx={{ mb: 2 }} onClick={() => {
                      navigateFinalizarTarea(subTarea);
                    }}>
                      Hacer tarea #{subTarea?.tarea}
                    </Button>
                  ))}
                  {!Boolean(subTareas.filter((subTarea) => !subTarea?.estadoDeTarea).length) && (
                    <Alert severity="info">NO HAY TAREAS PENDIENTES !</Alert>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item xs={12} sm={1} md={3} lg={3} />
    </Grid>
  )
};

export default Tareas;