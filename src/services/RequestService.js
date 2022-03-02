import axios from "axios";

const dburl = "http://localhost:3000/api/hooter/users_db";

export async function getHomeData(page) {
  const res = await axios.get(`${dburl}?page=${page}`);
  const data = await res.data;
  return data;
}

export async function updateHootStats(uid, hootId, actionName) {
  const res = await axios.patch(
    `${dburl}/${uid}/hoot/${hootId}?action=${actionName}`
  );
  const data = await res.data;
  return data;
}
