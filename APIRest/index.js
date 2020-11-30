'use strict'

//Initiallising node modules
const express = require("express");
const bodyParser = require("body-parser");
const sql = require("mssql");
const app = express();
const http = require("http");
const socketIo = require("socket.io");
// Body Parser Middleware
app.use(bodyParser.json());

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Setting up server
const server = app.listen(process.env.PORT || 1434, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

//Initiallising connection string
const dbConfig = {
    user: 'sa',
    password: 'MiPassw0rd!1521',
    server: 'localhost',
    database: 'TestGrability'
};

const resp = {
    status: '',
    message:''
}

/*--------Conecta a la Base de datos y ejecuta una Query */
var executeQuery = function (res, query) {
    sql.connect(dbConfig, function (err) {
        if (err) {
            console.log("Error while connecting database :- " + err);
            res.send(err);
        }
        else {
            var request = new sql.Request();
            request.query(query, function (err, result) {
                if (err) {
                    console.log("Error while querying database :- " + err);
                    res.send(err);
                }
                else {
                    
                    res.send(result);
                }
            });
        }
    });
}

var executeTransaction = function (res, query, messageReturned='Success') {
    sql.connect(dbConfig, function (err) {
        if (err) {
            console.log("Error while connecting database :- " + err);
            resp.status = "error"
            resp.message = "Error while connecting database :- " + err
            res.send(resp)
        }
        else {
            var transaction = new sql.Transaction()
            transaction.begin(err => {
                if (err){
                    resp.status = "error"
                    resp.message = err
                    res.send(resp)
                    console.log('begin')
                }
             
                const request = new sql.Request(transaction)
                request.query(query, (err, result) => {
                    if (err){
                        resp.status = "error"
                        resp.message = err
                        res.send(resp)
                    }
             
                    transaction.commit(err => {
                        if (err){
                            resp.status = "error"
                            resp.message = err
                            res.send(resp)
                        }
                        resp.status = "success"
                        resp.message = messageReturned
                        
                        res.send(resp)
                    })
                })
            })
        
        }
    });
}

/*------GET tags------*/
app.get("/api/v1/tags", function (req, res) {
    var query = "SELECT * FROM [tags] ORDER BY id DESC";
    executeQuery(res, query);
});

/*------PUT Tags----- */
app.put("/api/v1/tags", function (req, res) {

    var query = `INSERT INTO [tags] 
                                (tag)
                                 VALUES 
                                 ('${req.body.tag}')`;
    executeTransaction(res, query,'Tag added');
   
});

/*------POST tag----- */
app.post("/api/v1/tags", function (req, res) {

    var query = `UPDATE tags
    SET tag = ${req.body.tag}
    WHERE id = ${req.body.id};`;

    executeTransaction(res, query, 'Tag Updated')
});

/*------POST tag----- */
app.delete("/api/v1/tags", function (req, res) {

    var query = `DELETE FROM tags
    WHERE id = ${req.body.id};`;

    executeTransaction(res, query, 'Tag deleted')
});


/*------GET Client------*/
app.get("/api/v1/clients/:document", function (req, res) {
    let document = req.params.document;
    var query = `SELECT * FROM [Clientes] WHERE Documento='${document}'`;
    executeQuery(res, query);
});

/*------POST Client----- */
app.post("/api/v1/clients", function (req, res) {

    var query = `INSERT INTO [Clientes] 
                                (Documento, Nombre, Apellidos, FechaNacimiento, FechaRegistro)
                                 VALUES 
                                 ('${req.body.Document}', '${req.body.Name}', '${req.body.LastName}', '${req.body.BirthDate}', GETDATE())`;

    //executeQuery(res, query);
    executeTransaction(res, query)
});



/*------GET Aproval------*/
app.get("/api/v1/aproval", function (req, res) {
    var query = "SELECT * FROM [SolicitudyAprobacion]";
    executeQuery(res, query);
});

/*------GET Aproval------*/
app.get("/api/v1/aproval/:id", function (req, res) {
    let id = req.params.id;
    var query = `SELECT * FROM [SolicitudyAprobacion] WHERE IdCliente='${id}'`;
    executeQuery(res, query);
});

/*------POST Aproval----- */
app.post("/api/v1/aproval", function (req, res) {

    var query = `INSERT INTO [SolicitudyAprobacion] 
                                (IdCliente,FechaIngresoEmpresa,SalarioMensual,NombreEmpresa,NitEmpresa,CreditoAprobado)
                                 VALUES 
                                 ('${req.body.IdClient}', '${req.body.AdmissionDate}', '${req.body.Salary}', '${req.body.NameCompany}', '${req.body.NitCompany}', '${req.body.CreditAproval}')`;

    //executeQuery(res, query);
    executeTransaction(res, query)
});

var executeQuerySocket = function (query, socket) {
    sql.connect(dbConfig, function (err) {
        if (err) {
            console.log("Error while connecting database :- " + err);
           
        }
        else {
            var request = new sql.Request();
            request.query(query, function (err, result) {
                if (err) {
                    console.log("Error while querying database :- " + err);
                    socket.emit("Tags", err);
                }
                else {
                    
                    socket.emit("Tags", result);
                }
            });
        }
    });
}


const getTags = socket => {
    var query = "SELECT * FROM [tags] ORDER BY id DESC";
    executeQuerySocket(query, socket);
    
};

const portSocket = process.env.PORT || 4001;
const serverSocket = http.createServer(app);
const io = socketIo(serverSocket);

io.on("connection", (socket) => {
    console.log("New client connected");
    
    getTags(socket)
    io.on("addTag", () => {
        socket.emit("addTag", "Hola"); 
    });
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });


  });


  
serverSocket.listen(portSocket, () => console.log(`Listening on port ${portSocket}`));