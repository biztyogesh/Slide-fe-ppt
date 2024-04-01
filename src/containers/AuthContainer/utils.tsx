export const doLogin = (data:any) => {
    localStorage.setItem("token", data)
}

export const isLoggedIn = () =>  {
  let data  = localStorage.getItem("token") ;
  if (data === null) {
    return false;
  }else {
    return true;
  }
}

export const doLogout = () => {
  localStorage.removeItem("token")
}
