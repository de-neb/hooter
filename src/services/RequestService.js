import axios from "axios";

const db = axios.create({
  baseURL: "/api/hooter/users_db",
});

const trend = axios.create({
  baseURL: "/api/hooter/trends",
});

const auth = axios.create({
  baseURL: "/api/auth",
});

//all users
export async function getHomeData(page) {
  const res = await db.get(`?page=${page}`);
  const data = await res.data;
  return data;
}

//hoot status
export async function updateHootStats(uid, hootId, actionName, otherData) {
  //uid of the user where 'comment' is added
  const res = await db.patch(`/${uid}/hoot/${hootId}?action=${actionName}`, {
    otherData,
  });
  const data = await res.data;
  return data;
}

export async function getHootComments(uid, hootId) {
  //uid of the user where 'comment' is added
  const res = await db.get(`/${uid}/hoot/${hootId}/comments`);
  const data = await res.data;
  return data;
}

//user by username
export async function getUser(username) {
  const res = await db.get(`/user/${username}`);
  const user = await res.data;
  return user;
}

//user by uid
export async function getUserById(uid) {
  const res = await db.get(`/user?id=${uid}`);
  const user = await res.data;
  return user;
}

export async function createUser(user) {
  const req = await auth.post(`/signup`, user);
  const res = await req.data;
  return res;
}

export async function loginUser(userObj) {
  const req = await auth.post(`/login`, userObj);
  const res = await req.data;
  return res;
}

export async function logoutUser(userObj) {
  const res = await auth.post(`/logout`, userObj);
  return res;
}

export async function userExists(user) {
  const req = await auth.post(`/check-user`, user);
  const res = await req.data;
  return res;
}

//trends
export async function getTrends() {
  const res = await trend.get("");
  const trends = await res.data;
  return trends;
}
