import{c as v,f as E,i as I,k,u as F,r as m,j as e,B as S,L as C}from"./index-B_8ijzOe.js";import{z as t,u as B,F as R,a as d,b as h,c as u,d as g,e as x,t as q}from"./form-lXkKRTJr.js";import{N as M,F as z}from"./Footer-CCG5yLN0.js";import{I as p}from"./input-ubP1seug.js";import{E as A}from"./eye-off-BxcJEmwe.js";import{E as D}from"./eye-gQD-GB1D.js";import"./label-7s8BKSBJ.js";import"./search-yXaF56WI.js";import"./user-DhePmqPS.js";import"./shopping-cart-CYd_g7ZI.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=v("LogIn",[["path",{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",key:"u53s6r"}],["polyline",{points:"10 17 15 12 10 7",key:"1ail0h"}],["line",{x1:"15",x2:"3",y1:"12",y2:"12",key:"v6grx8"}]]),_=()=>{var l,c;const{login:w}=E(),j=I(),f=k(),{language:b}=F(),[o,P]=m.useState(!1),[i,n]=m.useState(!1),L=((c=(l=f.state)==null?void 0:l.from)==null?void 0:c.pathname)||"/",s=(()=>{switch(b){case"pt":return{title:"Entrar na sua conta",emailLabel:"Email",emailPlaceholder:"Digite seu email",passwordLabel:"Senha",passwordPlaceholder:"Digite sua senha",loginButton:"Entrar",registerPrompt:"Não tem uma conta?",registerLink:"Cadastre-se",errorRequired:"Este campo é obrigatório",errorEmail:"Por favor insira um email válido",errorPassword:"A senha deve ter pelo menos 6 caracteres",loggingIn:"Entrando...",showPassword:"Mostrar senha",hidePassword:"Ocultar senha"};case"es":return{title:"Inicia sesión en tu cuenta",emailLabel:"Correo electrónico",emailPlaceholder:"Ingresa tu correo electrónico",passwordLabel:"Contraseña",passwordPlaceholder:"Ingresa tu contraseña",loginButton:"Iniciar sesión",registerPrompt:"¿No tienes una cuenta?",registerLink:"Regístrate",errorRequired:"Este campo es obligatorio",errorEmail:"Por favor ingresa un correo electrónico válido",errorPassword:"La contraseña debe tener al menos 6 caracteres",loggingIn:"Iniciando sesión...",showPassword:"Mostrar contraseña",hidePassword:"Ocultar contraseña"};default:return{title:"Log in to your account",emailLabel:"Email",emailPlaceholder:"Enter your email",passwordLabel:"Password",passwordPlaceholder:"Enter your password",loginButton:"Log in",registerPrompt:"Don't have an account?",registerLink:"Register",errorRequired:"This field is required",errorEmail:"Please enter a valid email",errorPassword:"Password must be at least 6 characters",loggingIn:"Logging in...",showPassword:"Show password",hidePassword:"Hide password"}}})(),y=t.object({email:t.string().min(1,{message:s.errorRequired}).email({message:s.errorEmail}),password:t.string().min(6,{message:s.errorPassword})}),a=B({resolver:q(y),defaultValues:{email:"",password:""}}),N=async r=>{n(!0),await w(r.email,r.password)&&j(L,{replace:!0}),n(!1)};return e.jsxs("div",{className:"flex flex-col min-h-screen",children:[e.jsx(M,{}),e.jsx("main",{className:"flex-grow pt-24 pb-16 flex items-center justify-center",children:e.jsxs("div",{className:"w-full max-w-md p-8 space-y-8 bg-card rounded-xl shadow-sm mx-4",children:[e.jsx("div",{className:"text-center",children:e.jsx("h1",{className:"text-2xl font-bold",children:s.title})}),e.jsx(R,{...a,children:e.jsxs("form",{onSubmit:a.handleSubmit(N),className:"space-y-6",children:[e.jsx(d,{control:a.control,name:"email",render:({field:r})=>e.jsxs(h,{children:[e.jsx(u,{children:s.emailLabel}),e.jsx(g,{children:e.jsx(p,{type:"email",placeholder:s.emailPlaceholder,...r})}),e.jsx(x,{})]})}),e.jsx(d,{control:a.control,name:"password",render:({field:r})=>e.jsxs(h,{children:[e.jsx(u,{children:s.passwordLabel}),e.jsx(g,{children:e.jsxs("div",{className:"relative",children:[e.jsx(p,{type:o?"text":"password",placeholder:s.passwordPlaceholder,...r}),e.jsx("button",{type:"button",className:"absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500",onClick:()=>P(!o),tabIndex:-1,children:o?e.jsx(A,{className:"h-5 w-5","aria-label":s.hidePassword}):e.jsx(D,{className:"h-5 w-5","aria-label":s.showPassword})})]})}),e.jsx(x,{})]})}),e.jsx(S,{type:"submit",className:"w-full",disabled:i,children:i?e.jsxs("span",{className:"flex items-center",children:[e.jsxs("svg",{className:"animate-spin -ml-1 mr-2 h-4 w-4 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[e.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),e.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),s.loggingIn]}):e.jsxs("span",{className:"flex items-center",children:[e.jsx(O,{className:"mr-2 h-4 w-4"}),s.loginButton]})})]})}),e.jsx("div",{className:"text-center mt-4",children:e.jsxs("p",{children:[s.registerPrompt," ",e.jsx(C,{to:"/register",className:"text-primary hover:underline",children:s.registerLink})]})})]})}),e.jsx(z,{})]})};export{_ as default};
