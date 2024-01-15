function getEmailFromJWT(jwt) {
  const object = JSON.parse(atob(jwt.split('.')[1]));
  return object.email;
}

export default getEmailFromJWT;