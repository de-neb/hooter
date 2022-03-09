import axios from "axios";

const dburl = "http://localhost:3000/api/hooter/users_db";
const trendurl = "http://localhost:3000/api/hooter/trends";
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

//trends
export async function getTrends() {
  const res = await axios.get(trendurl);
  const trends = await res.data;
  return trends;
}
