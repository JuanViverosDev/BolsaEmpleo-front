import axios from "axios";

const urlBase = "https://bolsaempleo-2ygp.onrender.com/api/Ciudadanos";

export const traerCiudadanos = async () => {
  const response = await axios.get(urlBase);
  const data = await response.data;
  return data;
};

export const guardarCiudadano = async (payload) => {
  const response = await axios.post(urlBase, payload);
  const data = await response.data;
  return data;
};

export const editarCiudadano = async (payload) => {
  const response = await axios.put(urlBase, payload);
  const data = await response.data;
  return data;
};

export const borrarCiudadano = async (id) => {
  const response = await axios.delete(`${urlBase}/${id}`);
  const data = await response.data;
  return data;
};
