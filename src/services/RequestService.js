import axios from "axios";

const userDbUrl = process.env.VUE_APP_HOOT_JSON_DB;
export async function getHomeData() {
  const res = await axios.get(userDbUrl);
  const data = await res.data;
  return data;
}
