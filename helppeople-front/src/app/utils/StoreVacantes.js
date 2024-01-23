import axios from "axios";

const urlBase = "https://bolsaempleo-2ygp.onrender.com/api/Vacantes";

export const traerVacantes = async () => {
  const response = await axios.get(urlBase);
  const data = await response.data;
  return data;
};

export const guardarVacante = async (payload) => {
  const response = await axios.post(urlBase, payload);
  const data = await response.data;
  return data;
};

export const editarVacante = async (payload) => {
  const response = await axios.put(urlBase, payload);
  const data = await response.data;
  return data;
};

export const borrarVacante = async (id) => {
  const response = await axios.delete(`${urlBase}/${id}`);
  const data = await response.data;
  return data;
};

export const asignarCiudadanoVacantes = async ({ idCiudadano, idVacante }) => {
  const response = await axios.get(
    `${urlBase}/aplicar/${idCiudadano}/${idVacante}`
  );
  const data = await response.data;
  return data;
};

export const desertarCiudadanoVacantes = async ({ idCiudadano, idVacante }) => {
  const response = await axios.get(
    `${urlBase}/desertar/${idCiudadano}/${idVacante}`
  );
  const data = await response.data;
  return data;
};
