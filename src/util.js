export   function  getUserData() {
    return   JSON.parse(localStorage.getItem("user"));
   
  } 
  //тази ф-ция взема логнатия потребител,ако има такъв
  
  export function getAccessToken() {
    const user = getUserData();
    if (user) {
      return user.accessToken;
    } else {
      return null;
    }
  } // ако имаме логнат потребител вземаме неговия токен, ако не връщаме null
  
  export function clearUserData() {
    localStorage.removeItem("user");
  } //при logout изтриваме потребителя от localstorage
  
  export function setUserData(data) {
    localStorage.setItem("user", JSON.stringify(data));
  } //при вписване на потребител, го слагаме в localestorage
  
  export function createSubmitHandler(ctx, handler) {
    return function (event) {
      event.preventDefault();
      const formData = Object.fromEntries(new FormData(event.target));
      handler(ctx, formData, event);
    };
  } //handler е фукнция/calback
  //тази функция приема контекст и друга функция
  //това е, за да спестим код от формите
  //връща трета функция
  
  export function parseQuerystring(query = "") {
    return Object.fromEntries(query.split("&").map((kvp) => kvp.split("=")));
  } //това е URL,но може да се замени със new URL
  