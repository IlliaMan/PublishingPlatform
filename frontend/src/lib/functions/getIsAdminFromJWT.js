function getIsAdminFromJWT(jwt) {
  const object = JSON.parse(atob(jwt.split('.')[1]));
  return object.role === 'admin';
}

export default getIsAdminFromJWT;