const express = require('express');
const app = express();
const mysql = require('mysql2');
//Motor de plantilla
const hbs = require('hbs');
//Encontrar archivo
const path = require('path');
//Para enviar mails a los clientes
const nodemailer = require('nodemailer');
const { link, linkSync } = require('fs');
//Variables de entorno
require('dotenv').config();

//Configuramos el puerto
const PORT = process.env.PORT || 9000;

console.log(PORT);

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')))

//Configuramos el motor de plantillas de HBS
app.set('view engine', 'hbs');
//Configuramos la configuracion de las plantillas
app.set('views', path.join(__dirname, 'views'));
//Configuramos los parciales de los motores de las plantillas
hbs.registerPartials(path.join(__dirname, 'views/partials'));

//Conexion a la base de datos
/* const conexion =mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DBPORT
}); 

conexion.connect((err) => {
    if(err) throw err;
    console.log(`Conectado a la Database ${process.env.DB_NAME}`);
}); */  

//Rutas de la aplicacion
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/acf', (req, res) => {
    res.render('acf')
})

app.get('/contacto', (req, res) => {
    res.render('contacto')
})

app.get('/portafolio', (req, res) => {
    res.render('portafolio')
})

app.get('/sugerencias', (req, res) => {

    /* let sql = "SELECT * FROM sugerencias";
    conexion.query(sql, function(err, result){
        if (err) throw err;
            console.log(result);
            res.render('sugerencias', {
                datos: result
            })
    })  
 */
    res.render('sugerencias') 
})

app.get('/cerati', (req, res) => {
    res.render('cerati')
})

app.get('/charly', (req, res) => {
    res.render('charly')
})

app.get('/calamaro', (req, res) => {
    res.render('calamaro')
})

app.post('/contacto', (req, res) => {
    const nombre = req.body.nombre;
    const email = req.body.email;

    //Creamos una funcion para enviar emails al cliente
    async function envioMail(){
        //Coonfiguramos la cuenta del envío
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', 
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAILPASSWORD
            },
            tls:{rejectUnauthorized: false}
        });

        //Envío del mail
        let info = await transporter.sendMail({
            from: process.env.EMAIL,
            to: `${email}`,
            subject: "¡Gracias por visitar nuestra página!",
            html: 'Muchas gracias por tu visita. <br> Recibirás las novedades de nuestro sitio web en esta dirección de correo.'
        })
    }

    let datos = {
        nombre: nombre,
        email: email,
    }

    /* let sql = "INSERT INTO contacto set ?";

        conexion.query(sql, datos, function(err){
            if (err) throw err;
                console.log(`1 registro insertado`);
                //En esta instancia le mandamos el email al cliente
                envioMail().catch(console.error);
                res.render('enviado')
        })  */ 

        res.render('enviado')
})

app.post('/sugerencias', (req, res) => {
    console.log(req);

    const sugerencia = req.body.sugerencia;
    const descripcion = req.body.descripcion;

    let datos = {
        sugerencia: sugerencia,
        descripcion: descripcion
    }

    /* let sql = "INSERT INTO sugerencias set ?";

            conexion.query(sql, datos, function(err){
            if (err) throw err;
                console.log(`1 registro insertado`);
                res.redirect('/sugerencias') //Es la página a donde se va a enviar al cliente después de que envíe los datos//
        }) */ 

        res.render('sinDatos') 
})

app.post('/delete', (req, res) => {

    console.log(req.body.idSugerencia);

    /* let sql = "DELETE FROM sugerencias where idSugerencia = " + req.body.idSugerencia + "";
    console.log(sql);
    conexion.query(sql, function(err, result){
        if (err) throw err;
            console.log('Datos eliminados: ' + result.affectedRows);
            res.render('sugerencias')
    })   */

    res.json({
        prueba: 'Probando deploy sin conexion a la Database'
    }) 
})

app.post('/update', (req, res) => {

    const sugerencia = req.body.sugerencia;
    const descripcion = req.body.descripcion;
    const idSugerencia = req.body.idSugerencia;

    /* let sql = "UPDATE sugerencias SET sugerencia = '" 
    + sugerencia 
    + "', descripcion = '" 
    + descripcion 
    + "' WHERE idSugerencia = " 
    + idSugerencia;

    console.log(sql);

    conexion.query(sql, function(err, result){
        if (err) throw err;
            console.log('Datos actualizados: ' + result.affectedRows); 
            res.render('sugerencias')
    })  */
})

//Servidor a la escucha de las peticiones
app.listen(PORT, ()=>{
    console.log(`Servidor trabajando en el puerto: ${PORT}`);
    });
    