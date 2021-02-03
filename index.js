// Inicializacion declarando librerias
const express = require('express');
const app = express();
const QRCode = require('qrcode');
const http = require('http').Server(app);
const port = 3000;
const io = require('socket.io')(http);

// Ruta

app.get("/", (req, res)=>{
    res.sendFile(__dirname +"/views/index.html");
});

//Uso de libreria sockets para con los mismos llevar a cabo el recopilado de informacion con la conexion al servidor
io.sockets.on('connect', (socket)=>{
    socket.on('reqQR', (NUM_EMP, Nombre, Escuela) => {
        QRCode.toDataURL(`NUM_EMP(numero de empleado): ${NUM_EMP}, 
                        Nombre: ${Nombre}, 
                        Escuela: ${Escuela}`,
                        (err, url) => {
                            if(err) throw err;
                            socket.emit('resQR', url);
        });
    });
});

const server = http.listen(port, ()=>{
    console.log(`Server on port: ${port}`);
});