import{c as h,f as T,i as B,u as P,r as b,R as L,j as e,P as q,B as O,S as R}from"./index-B_8ijzOe.js";import{N as I,F as H}from"./Footer-CCG5yLN0.js";import{T as N,a as S,b as m,c as r,d as C,e as i,f as E}from"./table-cuFkCkRr.js";import{C as A,a as F,b as V,c as M,d as U}from"./card-DmrTvf1n.js";import{B as z}from"./badge-0cavarL7.js";import{I as Q}from"./input-ubP1seug.js";import{S as G}from"./search-yXaF56WI.js";import{T as J}from"./truck-DhytArHN.js";import"./user-DhePmqPS.js";import"./shopping-cart-CYd_g7ZI.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=h("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=h("CircleCheckBig",[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=h("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]),k=[{id:"ORD-1234",date:"2023-08-15",total:159.99,status:"delivered",items:[{id:1,name:"Running Shoes XZ300",price:89.99,quantity:1},{id:2,name:"Sports Socks",price:14.99,quantity:2},{id:3,name:"Water Bottle",price:19.99,quantity:2}]},{id:"ORD-5678",date:"2023-09-20",total:249.5,status:"shipped",items:[{id:4,name:"Trail Hiking Boots",price:129.5,quantity:1},{id:5,name:"Hiking Backpack",price:89.99,quantity:1},{id:6,name:"First Aid Kit",price:29.99,quantity:1}]},{id:"ORD-9012",date:"2023-10-05",total:174.95,status:"processing",items:[{id:7,name:"Basketball Shoes",price:119.99,quantity:1},{id:8,name:"Basketball Jersey",price:54.99,quantity:1}]},{id:"ORD-3456",date:"2023-10-12",total:79.99,status:"cancelled",items:[{id:9,name:"Swimming Goggles",price:29.99,quantity:1},{id:10,name:"Swim Cap",price:14.99,quantity:1},{id:11,name:"Towel",price:34.99,quantity:1}]}],ne=()=>{const{isAuthenticated:u}=T(),x=B(),{language:n}=P(),[p,y]=b.useState(null),[c,v]=b.useState("");L.useEffect(()=>{u||x("/login",{state:{from:{pathname:"/orders"}}})},[u,x]);const s=(()=>{switch(n){case"pt":return{title:"Meus Pedidos",subtitle:"Veja o histórico e o status dos seus pedidos",orderDetails:"Detalhes do Pedido",id:"ID do Pedido",date:"Data",total:"Total",status:"Status",items:"Itens",itemName:"Nome do Item",quantity:"Quantidade",price:"Preço",subtotal:"Subtotal",backToList:"Voltar para Lista",search:"Buscar pedido...",emptyState:"Você ainda não realizou nenhum pedido",statusDelivered:"Entregue",statusShipped:"Enviado",statusProcessing:"Processando",statusCancelled:"Cancelado",noResults:"Nenhum pedido encontrado",orderHistory:"Histórico de Pedidos"};case"es":return{title:"Mis Pedidos",subtitle:"Ver el historial y estado de tus pedidos",orderDetails:"Detalles del Pedido",id:"ID del Pedido",date:"Fecha",total:"Total",status:"Estado",items:"Artículos",itemName:"Nombre del Artículo",quantity:"Cantidad",price:"Precio",subtotal:"Subtotal",backToList:"Volver a la Lista",search:"Buscar pedido...",emptyState:"Aún no has realizado ningún pedido",statusDelivered:"Entregado",statusShipped:"Enviado",statusProcessing:"Procesando",statusCancelled:"Cancelado",noResults:"No se encontraron pedidos",orderHistory:"Historial de Pedidos"};default:return{title:"My Orders",subtitle:"View your order history and status",orderDetails:"Order Details",id:"Order ID",date:"Date",total:"Total",status:"Status",items:"Items",itemName:"Item Name",quantity:"Quantity",price:"Price",subtotal:"Subtotal",backToList:"Back to List",search:"Search order...",emptyState:"You haven't placed any orders yet",statusDelivered:"Delivered",statusShipped:"Shipped",statusProcessing:"Processing",statusCancelled:"Cancelled",noResults:"No orders found",orderHistory:"Order History"}}})(),g=t=>{const a=new Date(t);return n==="pt"?a.toLocaleDateString("pt-BR"):n==="es"?a.toLocaleDateString("es"):a.toLocaleDateString("en-US")},o=t=>n==="pt"?new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(t):n==="es"?new Intl.NumberFormat("es-ES",{style:"currency",currency:"EUR"}).format(t):new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(t),j=t=>{let a="",l="",d=null;switch(t){case"delivered":a="bg-green-100 text-green-800",l=s.statusDelivered,d=e.jsx(W,{className:"h-4 w-4 mr-1"});break;case"shipped":a="bg-blue-100 text-blue-800",l=s.statusShipped,d=e.jsx(J,{className:"h-4 w-4 mr-1"});break;case"processing":a="bg-yellow-100 text-yellow-800",l=s.statusProcessing,d=e.jsx(X,{className:"h-4 w-4 mr-1"});break;case"cancelled":a="bg-red-100 text-red-800",l=s.statusCancelled,d=e.jsx(K,{className:"h-4 w-4 mr-1"});break;default:a="bg-gray-100 text-gray-800",l=t;break}return e.jsxs(z,{variant:"outline",className:`${a} flex items-center`,children:[d,l]})},f=k.filter(t=>t.id.toLowerCase().includes(c.toLowerCase())||t.items.some(a=>a.name.toLowerCase().includes(c.toLowerCase()))),D=()=>{const t=k.find(a=>a.id===p);return t?e.jsxs(A,{children:[e.jsx(F,{children:e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsxs("div",{children:[e.jsxs(V,{className:"flex items-center",children:[e.jsx(q,{className:"mr-2 h-5 w-5"}),s.orderDetails]}),e.jsxs(M,{children:[t.id," - ",g(t.date)]})]}),e.jsx(O,{variant:"ghost",onClick:()=>y(null),children:s.backToList})]})}),e.jsxs(U,{children:[e.jsxs("div",{className:"flex justify-between items-center mb-6",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"text-sm font-medium text-muted-foreground mb-1",children:s.status}),j(t.status)]}),e.jsxs("div",{children:[e.jsx("h4",{className:"text-sm font-medium text-muted-foreground mb-1",children:s.total}),e.jsx("p",{className:"text-xl font-bold",children:o(t.total)})]})]}),e.jsx("h3",{className:"font-medium mb-3",children:s.items}),e.jsxs(N,{children:[e.jsx(S,{children:e.jsxs(m,{children:[e.jsx(r,{children:s.itemName}),e.jsx(r,{className:"text-right",children:s.price}),e.jsx(r,{className:"text-right",children:s.quantity}),e.jsx(r,{className:"text-right",children:s.subtotal})]})}),e.jsx(C,{children:t.items.map(a=>e.jsxs(m,{children:[e.jsx(i,{className:"font-medium",children:a.name}),e.jsx(i,{className:"text-right",children:o(a.price)}),e.jsx(i,{className:"text-right",children:a.quantity}),e.jsx(i,{className:"text-right",children:o(a.price*a.quantity)})]},a.id))})]})]})]}):null},w=()=>f.length===0?e.jsxs("div",{className:"text-center py-12",children:[e.jsx(R,{className:"h-12 w-12 mx-auto text-muted-foreground"}),e.jsx("h3",{className:"mt-4 text-lg font-medium",children:c?s.noResults:s.emptyState})]}):e.jsxs(N,{children:[e.jsx(E,{children:s.orderHistory}),e.jsx(S,{children:e.jsxs(m,{children:[e.jsx(r,{children:s.id}),e.jsx(r,{children:s.date}),e.jsx(r,{children:s.total}),e.jsx(r,{children:s.status}),e.jsx(r,{className:"text-right",children:s.items})]})}),e.jsx(C,{children:f.map(t=>e.jsxs(m,{className:"cursor-pointer hover:bg-muted/50",onClick:()=>y(t.id),children:[e.jsx(i,{className:"font-medium",children:t.id}),e.jsx(i,{children:g(t.date)}),e.jsx(i,{children:o(t.total)}),e.jsx(i,{children:j(t.status)}),e.jsx(i,{className:"text-right",children:t.items.length})]},t.id))})]});return u?e.jsxs("div",{className:"flex flex-col min-h-screen",children:[e.jsx(I,{}),e.jsx("main",{className:"flex-grow pt-24 pb-16",children:e.jsx("div",{className:"container max-w-5xl mx-auto px-4",children:p?D():e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"mb-8",children:[e.jsx("h1",{className:"text-2xl font-bold mb-2",children:s.title}),e.jsx("p",{className:"text-muted-foreground",children:s.subtitle})]}),e.jsxs("div",{className:"relative mb-6",children:[e.jsx(G,{className:"absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"}),e.jsx(Q,{type:"search",placeholder:s.search,className:"pl-10",value:c,onChange:t=>v(t.target.value)})]}),w()]})})}),e.jsx(H,{})]}):null};export{ne as default};
