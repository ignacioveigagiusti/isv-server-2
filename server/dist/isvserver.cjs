!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o=e();for(var i in o)("object"==typeof exports?exports:t)[i]=o[i]}}(global,(()=>(()=>{"use strict";var t={601:function(t,e,o){var i=this&&this.__awaiter||function(t,e,o,i){return new(o||(o=Promise))((function(r,s){function d(t){try{c(i.next(t))}catch(t){s(t)}}function n(t){try{c(i.throw(t))}catch(t){s(t)}}function c(t){var e;t.done?r(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(d,n)}c((i=i.apply(t,e||[])).next())}))},r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const s=r(o(147));e.default=class{constructor(t){this.fileToWork=t}save(t){return i(this,void 0,void 0,(function*(){try{let e=yield s.default.promises.readFile(`${this.fileToWork}`,"utf8");""==e&&(e="[]");const o=JSON.parse(e);let i=[];for(const t in o)i.push(o[t].id);let r=i.length+1;if(i.length>0){i=i.sort(((t,e)=>t-e));for(let t=0;t<i.length;t++)if(i[t]-t!=1){r=t+1;break}}const d=Object.assign({id:r},t);let n=o;return n.push(d),yield n.sort(((t,e)=>t.id>e.id?1:e.id>t.id?-1:0)),yield s.default.promises.writeFile(`${this.fileToWork}`,JSON.stringify(n,null,2)),console.log("Succesful write!"),d.id}catch(t){throw new Error(`${t}`)}}))}edit(t){return i(this,void 0,void 0,(function*(){try{let e=yield s.default.promises.readFile(`${this.fileToWork}`,"utf8");""==e&&(e="[]");let o=JSON.parse(e),i=0;for(const e in o)o[e].id==t.id&&(i=1,o[e]=t);if(0==i)throw"ID was not found";return yield s.default.promises.writeFile(`${this.fileToWork}`,JSON.stringify(o,null,2)),console.log("Succesful write!"),t}catch(t){throw new Error(`${t}`)}}))}getById(t){return i(this,void 0,void 0,(function*(){try{const e=yield s.default.promises.readFile(`${this.fileToWork}`,"utf8"),o=JSON.parse(e);let i=0;for(const e in o)if(o[e].id==t)return i=1,o[e];if(0==i)throw"ID does not exist!"}catch(t){throw new Error(`${t}`)}}))}getAll(){return i(this,void 0,void 0,(function*(){try{const t=yield s.default.promises.readFile(`${this.fileToWork}`,"utf-8");return JSON.parse(t)}catch(t){throw new Error(`${t}`)}}))}deleteById(t){return i(this,void 0,void 0,(function*(){try{const e=yield s.default.promises.readFile(`${this.fileToWork}`,"utf-8"),o=JSON.parse(e),i=[];let r=0;for(let e=0;e<o.length;e++)o[e].id!=t?i.push(o[e]):o[e].id==t&&(r=1);if(0==r)throw"ID does not exist!";yield s.default.promises.writeFile(`${this.fileToWork}`,JSON.stringify(i,null,2)),console.log("Succesful write!")}catch(t){throw new Error(`${t}`)}}))}deleteAll(){return i(this,void 0,void 0,(function*(){try{yield s.default.promises.writeFile(`${this.fileToWork}`,"[]"),console.log("Succesful write!")}catch(t){throw new Error(`${t}`)}}))}}},190:function(t,e,o){var i=this&&this.__awaiter||function(t,e,o,i){return new(o||(o=Promise))((function(r,s){function d(t){try{c(i.next(t))}catch(t){s(t)}}function n(t){try{c(i.throw(t))}catch(t){s(t)}}function c(t){var e;t.done?r(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(d,n)}c((i=i.apply(t,e||[])).next())}))},r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const s=r(o(147));e.default=class{constructor(t){this.fileToWork=t}save(t){return i(this,void 0,void 0,(function*(){try{let e=yield s.default.promises.readFile(`${this.fileToWork}`,"utf8");""==e&&(e="[]");const o=JSON.parse(e);let i=[];for(const t in o)i.push(o[t].id);let r=i.length+1;if(i.length>0){i=i.sort(((t,e)=>t-e));for(let t=0;t<i.length;t++)if(i[t]-t!=1){r=t+1;break}}const d=Object.assign({id:r.toString()},t);let n=o;return n.push(d),yield n.sort(((t,e)=>t.id>e.id?1:e.id>t.id?-1:0)),yield s.default.promises.writeFile(`${this.fileToWork}`,JSON.stringify(n,null,2)),console.log("Escritura exitosa!"),d}catch(t){throw new Error(`${t}`)}}))}edit(t,e){return i(this,void 0,void 0,(function*(){try{let o=yield s.default.promises.readFile(`${this.fileToWork}`,"utf8");""==o&&(o="[]");let i=JSON.parse(o),r=0;for(const o in i)i[o].id==t&&(r=1,i[o]=Object.assign({id:parseInt(t)},e));if(0==r)throw"ID was not found";return yield s.default.promises.writeFile(`${this.fileToWork}`,JSON.stringify(i,null,2)),console.log("Escritura exitosa!"),Object.assign({id:parseInt(t)},e)}catch(t){throw new Error(`${t}`)}}))}getById(t){return i(this,void 0,void 0,(function*(){try{const e=yield s.default.promises.readFile(`${this.fileToWork}`,"utf8"),o=JSON.parse(e);let i=0;for(const e in o)if(o[e].id==t)return i=1,o[e];if(0==i)throw"ID does not exist!"}catch(t){throw new Error(`${t}`)}}))}getAll(){return i(this,void 0,void 0,(function*(){try{const t=yield s.default.promises.readFile(`${this.fileToWork}`,"utf-8");return JSON.parse(t)}catch(t){throw new Error(`${t}`)}}))}deleteById(t){return i(this,void 0,void 0,(function*(){try{const e=yield s.default.promises.readFile(`${this.fileToWork}`,"utf-8"),o=JSON.parse(e),i=[];let r=0;for(let e=0;e<o.length;e++)o[e].id!=t?i.push(o[e]):o[e].id==t&&(r=1);if(0==r)throw"ID does not exist!";yield s.default.promises.writeFile(`${this.fileToWork}`,JSON.stringify(i,null,2)),console.log("Escritura exitosa!")}catch(t){throw new Error(`${t}`)}}))}deleteAll(){return i(this,void 0,void 0,(function*(){try{yield s.default.promises.writeFile(`${this.fileToWork}`,"[]"),console.log("Escritura exitosa!")}catch(t){throw new Error(`${t}`)}}))}}},401:function(t,e,o){var i=this&&this.__awaiter||function(t,e,o,i){return new(o||(o=Promise))((function(r,s){function d(t){try{c(i.next(t))}catch(t){s(t)}}function n(t){try{c(i.throw(t))}catch(t){s(t)}}function c(t){var e;t.done?r(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(d,n)}c((i=i.apply(t,e||[])).next())}))},r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const s=r(o(860)),{Router:d}=s.default,n=r(o(147)),c=r(o(582)),l=o(952),a=o(685),u=(0,s.default)(),y=new a.Server(u),f=new l.Server(y,{cors:{origin:"*"}});u.use((0,c.default)());const p=d(),h=d(),b=r(o(190)),g=r(o(601)),v=new b.default("./api/products.json"),m=new g.default("./api/carts.json");function w(t,e,o){o()}u.use(s.default.json()),u.use(s.default.urlencoded({extended:!1})),p.use(s.default.json()),p.use(s.default.urlencoded({extended:!1})),h.use(s.default.json()),h.use(s.default.urlencoded({extended:!1})),u.post("/",w,((t,e)=>i(void 0,void 0,void 0,(function*(){try{if(null==t.body.title||null===t.body.price||null==t.body.thumbnail||null==t.body.category||null==t.body.stock||""==t.body.title||""===t.body.price||""==t.body.thumbnail||""==t.body.category||""==t.body.stock)throw"Missing data. Product needs Title, Price, Thumbnail, Category and Stock.";let o=String(new Date).slice(0,33),i=t.body.category,r=t.body.subcategory||" ",s=t.body.title,d=t.body.description||" ",n=t.body.price,c=t.body.stock,l=t.body.thumbnail;if(n=parseFloat(n),c=parseInt(c),n<=0||c<0)throw"Error 400: Price and stock must be positive numbers";const a={timestamp:o,category:i,subcategory:r,title:s,description:d,price:n,stock:c,thumbnail:l},u=yield v.save(a);e.send(JSON.stringify(u))}catch(t){e.status(400).send(t)}})))),u.post("/edit",w,((t,e)=>i(void 0,void 0,void 0,(function*(){try{let o;if(null==t.body.id||""===t.body.id)throw"No ID was provided";o=t.body.id;const i=yield v.getById(o);let r=String(new Date).slice(0,33),s=i.category,d=i.subcategory,n=i.title,c=i.description,l=i.price,a=i.stock,u=i.thumbnail;if("string"==typeof t.body.category&&""!==t.body.category&&(s=t.body.category),"string"==typeof t.body.subcategory&&""!==t.body.subcategory&&(d=t.body.subcategory),"string"==typeof t.body.title&&""!==t.body.title&&(n=t.body.title),"string"==typeof t.body.description&&""!==t.body.description&&(c=t.body.description),!isNaN(t.body.price)&&t.body.price&&""!==t.body.price&&(l=parseFloat(t.body.price)),!isNaN(t.body.stock)&&t.body.stock&&""!==t.body.stock&&(a=parseInt(t.body.stock)),"string"==typeof t.body.thumbnail&&""!==t.body.thumbnail&&(u=t.body.thumbnail),l<=0||a<0)throw"Error 400: Price and stock must be positive numbers";const y={timestamp:r,category:s,subcategory:d,title:n,description:c,price:l,stock:a,thumbnail:u},f=yield v.edit(o,y).catch((t=>{throw t}));e.send(f)}catch(t){e.status(400).send(t.message||t)}})))),p.get("/",((t,e)=>i(void 0,void 0,void 0,(function*(){try{const t=yield v.getAll();e.json(t)}catch(t){e.status(400).send(`${t}`)}})))),p.get("/:id",((t,e)=>i(void 0,void 0,void 0,(function*(){try{const o=t.params.id,i=yield v.getById(o);e.json(i)}catch(t){e.status(404).send(`${t}`)}})))),p.post("/",w,((t,e)=>i(void 0,void 0,void 0,(function*(){try{if(null==t.body.title||null===t.body.price||null==t.body.thumbnail||null==t.body.category||null==t.body.stock||""==t.body.title||""===t.body.price||""==t.body.thumbnail||""==t.body.category||""==t.body.stock)throw"Missing data. Product needs Title, Price, Thumbnail, Category and Stock.";let o=String(new Date).slice(0,33),i=t.body.category,r=t.body.subcategory||" ",s=t.body.title,d=t.body.description||" ",n=t.body.price,c=t.body.stock,l=t.body.thumbnail;if(n=parseFloat(n),c=parseInt(c),n<=0||c<0)throw"Error 400: Price and stock must be positive numbers";const a={timestamp:o,category:i,subcategory:r,title:s,description:d,price:n,stock:c,thumbnail:l},u=yield v.save(a);e.send(`Producto añadido: ${JSON.stringify(u)}`)}catch(t){e.status(400).send(`${t}`)}})))),p.put("/:id",w,((t,e)=>i(void 0,void 0,void 0,(function*(){try{const o=t.params.id,i=yield v.getById(o);let r=String(new Date).slice(0,33),s=i.category,d=i.subcategory||"",n=i.title,c=i.description||"",l=i.price,a=i.stock,u=i.thumbnail;if("string"==typeof t.body.category&&""!==t.body.category&&(s=t.body.category),"string"==typeof t.body.subcategory&&""!==t.body.subcategory&&(d=t.body.subcategory),"string"==typeof t.body.title&&""!==t.body.title&&(n=t.body.title),"string"==typeof t.body.description&&""!==t.body.description&&(c=t.body.description),null!=parseFloat(t.body.price)&&""!==t.body.price&&(l=parseFloat(t.body.price)),null!=parseFloat(t.body.stock)&&""!==t.body.stock&&(a=parseInt(t.body.stock)),"string"==typeof t.body.thumbnail&&""!==t.body.thumbnail&&(u=t.body.thumbnail),l<=0||a<0)throw"Error 400: Price and stock must be positive numbers";const y={timestamp:r,category:s,subcategory:d,title:n,description:c,price:l,stock:a,thumbnail:u};yield v.edit(o,y),e.json(Object.assign({id:o},y))}catch(t){e.status(400).send(`${t}`)}})))),p.delete("/:id",w,((t,e)=>i(void 0,void 0,void 0,(function*(){try{const o=t.params.id;yield v.deleteById(o),e.send(`producto con id: ${o} eliminado exitosamente`)}catch(t){e.status(404).send(`${t}`)}})))),h.get("/",((t,e)=>i(void 0,void 0,void 0,(function*(){try{const t=yield m.getAll();e.json(t)}catch(t){e.status(400).send(`${t}`)}})))),h.get("/:id/products",((t,e)=>i(void 0,void 0,void 0,(function*(){try{const o=t.params.id,i=yield m.getById(o);e.json(i)}catch(t){e.status(404).send(`${t}`)}})))),h.post("/",((t,e)=>i(void 0,void 0,void 0,(function*(){try{let o=String(new Date).slice(0,33);t.body.products||(t.body.products=[]);const i={timestamp:o,products:t.body.products},r=yield m.save(i);e.json(r)}catch(t){e.status(400).send(`${t}`)}})))),h.delete("/:id",((t,e)=>i(void 0,void 0,void 0,(function*(){try{const o=t.params.id;yield m.deleteById(o),e.send(`carrito con id: ${o} eliminado exitosamente`)}catch(t){e.status(404).send(`${t}`)}})))),h.post("/:id/products/:prod_id",((t,e)=>i(void 0,void 0,void 0,(function*(){try{const o=t.params.id,i=t.params.prod_id;let r=yield m.getById(o),s=yield v.getById(i);r.products.push(s);let d=yield m.edit(r);e.json(d)}catch(t){e.status(400).send(`${t}`)}})))),h.delete("/:id/products/:prod_id",((t,e)=>i(void 0,void 0,void 0,(function*(){try{const o=t.params.id,i=t.params.prod_id;let r=yield m.getById(o),s=r.products.map((t=>t.id)).indexOf(i);if(s<0)throw"Product not found in cart";~s&&r.products.splice(s,1);let d=yield m.edit(r);e.json(d)}catch(t){e.status(404).send(`${t}`)}})))),u.use("/api/products",p),u.use("/api/cart",h);const k=process.env.PORT||8080;y.listen(k,(()=>{console.log(`Servidor inicializado en el puerto ${k}`)})),y.on("error",(t=>console.log(`Error en el servidor (500): ${t}`))),f.on("connection",(t=>i(void 0,void 0,void 0,(function*(){console.log("Client connected");const e=JSON.parse(yield n.default.promises.readFile("./api/messages.json","utf8"));try{t.emit("messages",e)}catch(t){f.sockets.emit("msgError",t.message)}let o;try{o=yield v.getAll(),t.emit("products",o)}catch(t){f.sockets.emit("prodError",t.message)}t.on("newMessage",(t=>i(void 0,void 0,void 0,(function*(){try{e.push(t),yield n.default.promises.writeFile("./api/messages.json",JSON.stringify(e,null,2)),f.sockets.emit("messages",e)}catch(t){f.sockets.emit("msgError",t.message)}})))),t.on("productEvent",(()=>i(void 0,void 0,void 0,(function*(){try{o=yield v.getAll(),f.sockets.emit("products",o)}catch(t){f.sockets.emit("prodError",t.message)}}))))}))))},582:t=>{t.exports=require("cors")},860:t=>{t.exports=require("express")},952:t=>{t.exports=require("socket.io")},147:t=>{t.exports=require("fs")},685:t=>{t.exports=require("http")}},e={};return function o(i){var r=e[i];if(void 0!==r)return r.exports;var s=e[i]={exports:{}};return t[i].call(s.exports,s,s.exports,o),s.exports}(401)})()));