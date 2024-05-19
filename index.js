const express = require('express');
const fs = require('fs/promises');

const app = express();

app.listen(3000, () => {
   console.log("APP INICIALIZANDO EN EL PUERTO 3000")
});

//ruta para el index.html
app.get("/", (req, res) => {
   res.sendFile(__dirname + "/index.html")
});

//ruta para obtener los deportes
app.get("/deportes", (req, res) => {
   fs.readFile("./data/deportes.json", "utf8")
      .then(data => {
         const deportesJson = JSON.parse(data)
         res.send(deportesJson)
      })
});

//ruta para agregar un depporte
app.get("/agregar", async (req, res) => {
   const { nombre, precio } = req.query;

   fs.readFile("./data/deportes.json", "utf-8")
      .then(data => {
         const deportesJson = JSON.parse(data)
         // Creación de deporte
         const deporte = { 
            nombre,
            precio
         }
         // Agregamos nuevo deporte al JSON Parseado
         deportesJson.deportes.push(deporte);
         
         fs.writeFile("./data/deportes.json", JSON.stringify(deportesJson, null, 2))
         .then (() => {
            console.log('archivo actualizado exitosamente')
            res.send(deportesJson)
         })
      })
})  

//ruta para editar un deporte
app.get("/editar", (req, res) => {
   
   const { nombre, precio } = req.query;

   fs.readFile("./data/deportes.json", "utf-8")
      .then(data => { 
         const deportesJson = JSON.parse(data)
      
         const deportesModificados = deportesJson.deportes.map(d => {
            if(d.nombre === nombre) { 
         d.precio = precio; 
      }
      return d;
   });

   deportesJson.deportes = deportesModificados;
   
   fs.writeFile("./data/deportes.json", JSON.stringify(deportesJson, null, 2)) 
      .then(() => {
         console.log('deporte actualizado exitosamente')
         res.send(deportesJson);
      })
   })
})

//ruta para eliminar un deporte
app.get("/eliminar", async (req, res) => {
   const { nombre } = req.query

   fs.readFile("./data/deportes.json", "utf-8")
      .then(data => { 
         const deportesJson = JSON.parse(data)

         const deportesFiltrados = deportesJson.deportes.filter(d => d.nombre !== nombre)
         
         deportesJson.deportes = deportesFiltrados
         
         fs.writeFile("./data/deportes.json", JSON.stringify(deportesJson, null, 2))
            .then (() => {
               console.log('deporte eliminado exitosamente')
               res.send(deportesJson)
            })
      })
   })  
   
      
      
      
  

