import React,{Suspense} from "react";
import ReactDOM from 'react-dom'
// import ReactDOM from "react-dom";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from 'i18next-http-backend';
import  "bootstrap/dist/js/bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

import App from "./App"

// 使用了 i18next 库 
i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs:['en', 'cn', 'ar'], // 支持的语言，
    lng: document.querySelector("[lang]").lang, 
    fallbackLng: "zh",
    detection:{
      order: ['cookie','path','localStorage','htmlTag','querystring', 'sessionStorage', 'navigator', 'htmlTag','subdomain'], // 取语言 的方式，以排列顺序作为 优先级顺序
      caches: ["cookie"] // 缓存的方式，好像并不能实现
    },
    backend:{
      loadPath:'/assets/locales/{{lng}}/translate.json' // 语言包{json} 的路径； httpApi 中间件的作用
    },
  });

/* function App() {
  const { t } = useTranslation();

  return <h2>{t('welcome_to_react')}</h2>;
} */

const loadBack = ()=>{
  return (
    <div>
      <p>Loading ... </p>
    </div>
  )
}

ReactDOM.render(
  // Suspense 提供语言切换时 显示的内容， 不加会报错， 设置 false 后虽然不会报错，但是切换时显示的是变量表示的代码
  <Suspense fallback={loadBack}>
    <App />
  </Suspense>
    ,
  document.getElementById('root')
);
