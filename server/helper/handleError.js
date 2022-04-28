const handleError = (e) => {
  let err = { username: "", password: "", email: "" };

  if (e.message == "Incorrect password") err.password = "Wrong password!";
  if (e.message == "No user or email found") {
    err.username = "Sorry, we could not find your account.";
    err.email = "Sorry, we could not find your account.";
  }
  if (e.code === 11000) err.username = "Username already exists";
  if (e.message.includes("user validation failed")) {
    Object.values(e.errors).forEach(({ properties: prop }) => {
      err[prop.path] = prop.message;
    });
  }
  return err;
};

module.exports = handleError;
