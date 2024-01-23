import { useEffect, useState } from "react";
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { traerVacantes } from "../../utils/StoreVacantes";
import CrearVacante from "./CrearVacante";

const Vacantes = () => {
  const [vacantes, setVacantes] = useState([]);
  const [vacanteSelecta, setVacanteSelecta] = useState();
  const [formulario, setFormulario] = useState(false); 

  useEffect(() => async () => {
    try {
      let vcs = await traerVacantes();
      if (vcs) {
        setVacantes(vcs);
      }
    } catch (error) {
      console.log(error)
    }
  },[formulario]);

  return(
    <div className="flex flex-col gap-8">
      <div className="w-full flex justify-between text-4xl">Vacantes
        <Button variant="contained" size="small" className="bg-blue-800" onClick={() => {setFormulario(true)}}>Crear Vacante</Button>
      </div>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell className="font-bold text-lg">Código</TableCell>
            <TableCell className="font-bold text-lg">Cargo</TableCell>
            <TableCell className="font-bold text-lg">Empresa</TableCell>
            <TableCell className="font-bold text-lg">Descripción</TableCell>
            <TableCell className="font-bold text-lg">Salario</TableCell>
            <TableCell className="font-bold text-lg">Disponibilidad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vacantes.map((vacante, i) => (
            <TableRow key={i} onClick={() => {setVacanteSelecta(vacante); setFormulario(true)}}>
              <TableCell>{vacante.codigo}</TableCell>
              <TableCell>{vacante.cargo}</TableCell>
              <TableCell>{vacante.empresa}</TableCell>
              <TableCell>{vacante.descripcion}</TableCell>
              <TableCell>{vacante.salario}</TableCell>
              <TableCell>{vacante.ciudadano ? "Ocupada" : "Libre"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CrearVacante open={formulario} cerrarFormulario={() => {setFormulario(false); setVacanteSelecta()}} vacanteSelecta={vacanteSelecta} />
    </div>
  );
}

export default Vacantes;