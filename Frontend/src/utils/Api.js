import axios from "axios";

let baseurl = "https://tericsoft-assignment-production.up.railway.app";
export async function getBmiValue(data) {
  const res = await axios.post(`${baseurl}/calculate-bmi`, data);
  return res.data;
}

export async function getHistory(id) {
  const res = await axios.get(`${baseurl}/bmi-history/${id}`);
  return res.data;
}

export async function getProfile(id) {
  const res = await axios.get(`${baseurl}/getProfile/${id}`);
  return res.data;
}
