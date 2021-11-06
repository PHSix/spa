import { Router } from './router.js';
import { createApp } from './utils.js';
const initWebsite = function () {
  const router = new Router();
  router.init();
  if (document.body.children.length === 0) {
    createApp();
  }
  console.log('initWebsite');

  /**
   * 直接请求url
   * 返回结果：
   * Access to XMLHttpRequest at 'https://baidu.com/' from origin 'http://localhost:8080' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
   */
  // const xhr = new XMLHttpRequest();
  // xhr.open('GET', 'https://baidu.com');
  // xhr.send();
  // xhr.onreadystatechange = function () {
  //   if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 0)) {
  //     console.log("successful to request https://baid.com");
  //   }
  // };
  
  /**
  * 通过服务器代理请求
  */
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:8080/api/baidu');
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 0)) {
      console.log("successful to request https://baid.com");
    }
  };
};

window.onload = initWebsite;
