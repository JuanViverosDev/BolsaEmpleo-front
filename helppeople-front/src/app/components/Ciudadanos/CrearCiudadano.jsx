import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { borrarCiudadano, editarCiudadano, guardarCiudadano } from "../../utils/StoreCiudadanos";

const CrearCiudadano = (props) => {
  const [ciudadano, setCiudadano] = useState({})

  useEffect(() => {
    if(props.ciudadanoSelecto){
      setCiudadano(props.ciudadanoSelecto);
    }
  },[props.ciudadanoSelecto])

  const cerrarFormulario = () => {
    setCiudadano({});
    props.cerrarFormulario();
  }

  const cambiarCiudadano = (event) => {
    setCiudadano({...ciudadano, [event.target.name]: event.target.value});
  }

  const crear = async () => {
    console.log(ciudadano);
    try {
      let ciudadanos = await guardarCiudadano(ciudadano);
      if(ciudadanos){
        cerrarFormulario();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const editar = async () => {
    console.log(ciudadano);
    try {
      let ciudadanos = await editarCiudadano(ciudadano);
      if(ciudadanos){
        cerrarFormulario();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const eliminar = async () => {
    console.log(ciudadano);
    try {
      let ciudadanos = await borrarCiudadano(ciudadano.id);
      if(ciudadanos){
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
          {props.ciudadanoSelecto ? "Editar Ciudadano" : "Crear Ciudadano"}
        </h1>
        <select
          className="border border-gray-300 rounded-md p-3"
          value={ciudadano.tipoDocumento}
          label="Tipo de Documento"
          name="tipoDocumento"
          onChange={cambiarCiudadano}
        >
          <option value={""}>Seleccione un tipo de documento</option>
          <option value={"CC"}>Cedula</option>
          <option value={"TI"}>Tarjeta de identidad</option>
          <option value={"RC"}>Registro Civil</option>
          <option value={"PP"}>Pasaporte </option>
          <option value={"CE"}>Cedula de extranjeria</option>
        </select>
        <TextField label="Numero de documento" onChange={cambiarCiudadano} name="numDocumento" value={ciudadano.numDocumento} />
        <TextField label="Nombre" onChange={cambiarCiudadano} name="nombre" value={ciudadano.nombre} />
        <TextField label="Apellido" onChange={cambiarCiudadano} name="apellido" value={ciudadano.apellido} />
        <TextField label="Correo" onChange={cambiarCiudadano} name="email" value={ciudadano.email} />
        <input type="date" className="border border-gray-300 rounded-md p-3" onChange={cambiarCiudadano} name="fechaNacimiento" value={ciudadano.fechaNacimiento || ""} />
        <TextField label="Profesion" onChange={cambiarCiudadano} name="profesion" value={ciudadano.profesion} />
        <TextField label="Aspiracion Salarial" onChange={cambiarCiudadano} name="aspiracionSalarial" value={ciudadano.aspiracionSalarial} />
        {props.ciudadanoSelecto && 
          <div className="flex flex-col gap-4">
            <label>Fecha de creación: {ciudadano.created?.split("T")[0]}</label>
            <label>Ultima actualización: {ciudadano.modified?.split("T")[0]}</label>
          </div>
        }
      </DialogContent>
      <DialogActions>
        {props.ciudadanoSelecto && <Button className="bg-[#ff0000] hover:bg-[#b73939] p-2 rounded-md text-white" onClick={eliminar}>Eliminar</Button>}
        <Button className="bg-[#1b1464] hover:bg-[#3e35a3] p-2 rounded-md text-white" onClick={cerrarFormulario}>Cancelar</Button>
        <Button 
          className="bg-[#1b1464] hover:bg-[#3e35a3] p-2 rounded-md text-white" 
          onClick={() => {
            if(props.ciudadanoSelecto){
              editar();
            }else{
              crear();
            }
          }}
        >
          {props.ciudadanoSelecto ? "Guardar cambios" : "Crear"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CrearCiudadano;