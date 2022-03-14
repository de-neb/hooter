const handleError = (e) => {
  let err = { username: "", password: "", email: "" };

  if (e.message.includes("user validation failed")) {
    Object.values(e.errors).forEach(({ properties: prop }) => {
      err[prop.path] = prop.message;
    });
  }
  if (e.code === 11000) {
    err.username = "Username already exists";
  }

  return err;
};

module.exports = handleError;
