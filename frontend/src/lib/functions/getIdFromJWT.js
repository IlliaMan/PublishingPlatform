function getIdFromJWT(jwt) {
  const object = JSON.parse(atob(jwt.split('.')[1]));
  return object._id;
}

export default getIdFromJWT;