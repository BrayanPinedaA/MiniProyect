const express=require('express')
const bodyParser=require('body-parser')
const mysql2=require('mysql2/promise')
const path = require('path'); 

const app=express()

app.use(bodyParser.urlencoded({extended:true})) //leer url
app.use(bodyParser.json()) //converit los datos en json

app.use(express.static(path.join(__dirname, 'RESTAURANTE')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'RESTAURANTE/pagina/index.html'));
});

const db=mysql2.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'Restaurante'
})
app.post('/insertar',async(req,res)=>{
    const {Num_Orden, Fecha, Hora_Cobro, Mesa, Propina, Mesero_Fk, Cliente_Fk}=req.body

    try{
    const [rows]=await db.query('INSERT INTO Ordenes (Num_Orden, Fecha, Hora_Cobro, Mesa, Propina, Mesero_Fk, Cliente_Fk) VALUES (?,?,?,?,?,?,?)',[Num_Orden, Fecha, Hora_Cobro, Mesa, Propina, Mesero_Fk, Cliente_Fk])

    console.log(rows)
    /*  res.send('Mi perro se insertaron los datos')  */
     res.redirect('/pagina/Facturas.html'); 
    
    }
    catch(error)
    { 
        console.error('El error empieza aqui ',error)
    }
})


app.listen(3000,()=>{
    console.log('servidor activo')
})