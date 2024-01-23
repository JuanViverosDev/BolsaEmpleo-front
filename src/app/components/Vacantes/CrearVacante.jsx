import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { asignarCiudadanoVacantes, borrarVacante, desertarCiudadanoVacantes, editarVacante, guardarVacante } from "../../utils/StoreVacantes";
import { traerCiudadanos } from "../../utils/StoreCiudadanos";

const CrearVacante = (props) => {
  const [vacante, setVacante] = useState({})
  const [ciudadanos, setCiudadanos] = useState([]);

  useEffect(() => {
    if(props.vacanteSelecta){
      setVacante(props.vacanteSelecta);
    }
  },[props.vacanteSelecta])

  useEffect(() => async () => {
    try {
      let todos = await traerCiudadanos();
      if (todos) {
        setCiudadanos(todos);
      }
    } catch (error) {
      console.log(error)
    }
  },[props.vacanteSelecta])

  const cerrarFormulario = () => {
    setVacante({});
    props.cerrarFormulario();
  }

  const cambiarVacante = (event) => {
    setVacante({...vacante, [event.target.name]: event.target.value});
  }

  const crear = async () => {
    console.log(vacante)
    try {
      let vacantes = await guardarVacante(vacante);
      if(vacantes){
        cerrarFormulario();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const editar = async () => {
    console.log(vacante)
    try {
      let vacantes = await editarVacante(vacante);
      if(vacantes){
        cerrarFormulario();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const eliminar = async () => {
    console.log(vacante)
    try {
      let vacantes = await borrarVacante(vacante.id);
      if(vacantes){
        cerrarFormulario();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const asignar = async () => {
    console.log(vacante)
    try {
      let vacantes = await asignarCiudadanoVacantes({
        idCiudadano: vacante.ciudadano,
        idVacante: vacante.id,
      });
      if(vacantes){
        cerrarFormulario();
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  const desertar = async () => {
    console.log(vacante)
    try {
      let vacantes = await desertarCiudadanoVacantes({
        idCiudadano: vacante.ciudadano.id,
        idVacante: vacante.id,
      });
      if(vacantes){
        cerrarFormulario();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <Dialog open={props.open} onClose={cerrarFormulario}>
      <DialogContent className="flex flex-col gap-4 w-96">
        <h1 className="text-2xl">
          {props.vacanteSelecta ? "Editar Vacante" : "Crear Vacante"}
        </h1>
        <TextField label="Codigo" onChange={cambiarVacante} name="codigo" value={vacante.codigo} />
        <TextField label="Cargo" onChange={cambiarVacante} name="cargo" value={vacante.cargo} />
        <TextField label="Empresa" onChange={cambiarVacante} name="empresa" value={vacante.empresa} />
        <TextField label="Descripción" onChange={cambiarVacante} name="descripcion" value={vacante.descripcion} />
        <TextField label="Salario" type="number" onChange={cambiarVacante} name="salario" value={vacante.salario} />
        {/* <TextField label="" onChange={cambiarVacante} name="" value={vacante} /> */}
        {props.vacanteSelecta && 
          <div className="flex flex-col gap-4">
            <label>Fecha de creación: {vacante.created?.split("T")[0]}</label>
            <label>Ultima actualización: {vacante.modified?.split("T")[0]}</label>
          </div>
        }
        {props.vacanteSelecta && props.vacanteSelecta.ciudadano ?
          <div className="flex flex-col">Asignado a {`${props.vacanteSelecta.ciudadano.nombre} ${props.vacanteSelecta.ciudadano.apellido}`} <Button onClick={desertar}>Desertar</Button></div>
          :
          <div className="flex flex-col">
            <label>Asignar a:</label>
            <select
              className="border border-gray-300 rounded-md p-3"
              value={vacante.ciudadano}
              label="Ciudadano"
              name="ciudadano"
              onChange={cambiarVacante}
            >
              <option value={""}>Seleccione un ciudadano</option>
              {ciudadanos.map((ciudadano, i) => (
                <option key={i} value={ciudadano.id}>{`${ciudadano.nombre} ${ciudadano.apellido}`}</option>
              ))}
            </select>
            <Button onClick={asignar}>Asignar</Button>
          </div>
        }
      </DialogContent>
      <DialogActions>
        {props.vacanteSelecta && <Button className="bg-[#ff0000] hover:bg-[#b73939] p-2 rounded-md text-white" onClick={eliminar}>Eliminar</Button>}
        <Button className="bg-[#1b1464] hover:bg-[#3e35a3] p-2 rounded-md text-white" onClick={cerrarFormulario}>Cancelar</Button>
        <Button 
          className="bg-[#1b1464] hover:bg-[#3e35a3] p-2 rounded-md text-white" 
          onClick={() => {
            if(props.vacanteSelecta){
              editar();
            }else{
              crear();
            }
          }}
        >
          {props.vacanteSelecta ? "Guardar cambios" : "Crear"}
        </Button>
      </DialogActions>
    </Dialog>
  )

}

export default CrearVacante;