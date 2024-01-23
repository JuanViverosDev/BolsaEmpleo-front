import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import CrearCiudadano from "./CrearCiudadano";
import { traerCiudadanos } from "../../utils/StoreCiudadanos";

const Ciudadanos = () => {

  // id
  // TipoDocumento
  // NumDocumento
  // Nombre
  // Apellido
  // FechaNacimiento
  // Profesión
  // AspiracionSalarial
  // isActive
  // created
  // modified
  
  const [ciudadanos, setCiudadanos] = useState([]);
  const [ciudadanoSelecto, setCiudadanoSelecto] = useState();
  const [formulario, setFormulario] = useState(false); 

  useEffect(() => async () => {
    try {
      let todos = await traerCiudadanos();
      if (todos) {
        setCiudadanos(todos);
      }
    } catch (error) {
      console.log(error)
    }
  },[formulario]);

  return (
    <div className="flex flex-col gap-8">
      <div className="w-full flex justify-between text-4xl">Ciudadanos
        <Button variant="contained" size="small" className="bg-blue-800" onClick={() => {setFormulario(true)}}>Crear Ciudadano</Button>
      </div>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell className="font-bold text-lg">Identificacion</TableCell>
            <TableCell className="font-bold text-lg">Nombre</TableCell>
            <TableCell className="font-bold text-lg">Apellido</TableCell>
            <TableCell className="font-bold text-lg">Correo</TableCell>
            <TableCell className="font-bold text-lg">Fecha de Nacimiento</TableCell>
            <TableCell className="font-bold text-lg">Profesión</TableCell>
            <TableCell className="font-bold text-lg">Aspiracion salarial</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ciudadanos.map((ciudadano, i) => (
            <TableRow key={i} onClick={() => {setCiudadanoSelecto(ciudadano); setFormulario(true)}}>
              <TableCell>{ciudadano.numDocumento}</TableCell>
              <TableCell>{ciudadano.nombre}</TableCell>
              <TableCell>{ciudadano.apellido}</TableCell>
              <TableCell>{ciudadano.email}</TableCell>
              <TableCell>{ciudadano.fechaNacimiento.split("T")[0]}</TableCell>
              <TableCell>{ciudadano.profesion}</TableCell>
              <TableCell>{ciudadano.aspiracionSalarial}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CrearCiudadano open={formulario} cerrarFormulario={() => {setFormulario(false); setCiudadanoSelecto()}} ciudadanoSelecto={ciudadanoSelecto} />
    </div>
  );
}

export default Ciudadanos;