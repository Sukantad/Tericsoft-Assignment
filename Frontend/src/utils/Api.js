import axios from "axios";

let baseurl = "http://localhost:3050";
export async function getBmiValue(data) {
  const res = await axios.post(`${baseurl}/calculate-bmi`,data);
  return res.data;
}

export async function getHistory(id) {
  const res = await axios.get(`${baseurl}/bmi-history/${id}`);
  return res.data;
}
