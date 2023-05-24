import * as React from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setEstadoDeTarea } from '../features/tareasSlice';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Alert, Button, Card, CardContent, CardHeader, Grid, IconButton, Tooltip, Typography } from '@mui/material';

const FinalizarTarea = () => {

  const { tarea } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const listaDeTareas = useSelector((state) => state.tareas.listaDeTareas);

  const buscarTarea = listaDeTareas.find(({ subTareas }) => {
    return subTareas.find((subTarea) => subTarea?.tarea === Number(tarea));
  });

  const subTarea = (buscarTarea?.subTareas || []).find((subTarea) => subTarea?.tarea === Number(tarea));

  if (!buscarTarea) {
    return (
      <Alert severity="warning">TAREA NO ENCONTRADA !</Alert>
    );
  }


  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={1} md={3} lg={3} />
      <Grid item xs={12} sm={10} md={6} lg={6}>
        <Card sx={{ width: "100%" }}>
          <CardHeader
            avatar={(
              <Tooltip title="ATRAS">
                <IconButton edge="end" aria-label="comments" onClick={() => {
                  navigate("../");
                }}>
                  <KeyboardBackspaceIcon />
                </IconButton>
              </Tooltip>
            )}
            title={(
              <Typography variant="p" component="div" color="text.secondary">
                PUEDE FINALIZAR LA TAREA #{subTarea?.tarea}
              </Typography>
            )}
          />
          <CardContent>
            <Button fullWidth color="info" variant="contained" sx={{ mb: 2 }} onClick={() => {
              dispatch(setEstadoDeTarea({ tarea: buscarTarea, subTarea }));
              Swal.fire({
                icon: 'success',
                html: `<p>LA TAREA #${subTarea?.tarea} FUE FINALIZADA CON EXITO !</p>`,
              }).then(() => {
                navigate("../");
              });
            }}>
              Finalizar tarea #{subTarea?.tarea}
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={1} md={3} lg={3} />
    </Grid>
  );
};

export default FinalizarTarea;