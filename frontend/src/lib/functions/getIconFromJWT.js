function getIconFromJWT(jwt) {
  const object = JSON.parse(atob(jwt.split('.')[1]));
  return object.icon;
}

export default getIconFromJWT;