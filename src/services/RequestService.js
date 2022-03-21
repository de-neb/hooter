import axios from "axios";

const dburl = "/api/hooter/users_db";
const trendurl = "/api/hooter/trends";

//all users
export async function getHomeData(page) {
  const res = await axios.get(`${dburl}?page=${page}`);
  const data = await res.data;
  return data;
}

//hoot status
export async function updateHootStats(uid, hootId, actionName) {
  const res = await axios.patch(
    `${dburl}/${uid}/hoot/${hootId}?action=${actionName}`
  );
  const data = await res.data;
  return data;
}

//user
export async function getUser(username) {
  const res = await axios.get(`${dburl}/user/${username}`);
  const user = await res.data;
  return user;
}

export async function createUser(user) {
  const req = await axios.post(`${dburl}/signup`, user);
  const res = await req.data;
  return res;
}

//trends
export async function getTrends() {
  const res = await axios.get(trendurl);
  const trends = await res.data;
  return trends;
}
