var date = new Date();
var precioDolar = 20.33;
var nombreCompañia = "Santander";
var registros = [];
var nameList;
var precioClientes = 22;
var precioInversores = 20;
var precioEmpleados = 17;
var descuentoCompraMayor1000 = 0.03;
var descuentoCompraMayor2000 = 0.05;


var Cliente = function(nombre, correo, telefono){
    this.id= crearUUID();
    this.nombre = nombre;
    this.correo = correo; 
    this.telefono = telefono; 
}

function crearUUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}


var Solicitud = function(nombre, correo, telefono, tipoCliente, numeroAcciones){
    Cliente.call(this, nombre, correo, telefono);
    this.activo = true;
    this.tipoCliente = tipoCliente;
    this.numeroAcciones = numeroAcciones;
}

var PrecioAccion = function(tipoCliente, numeroAcciones, precioAlCliente, descuentoAdicional) {
    Solicitud.call(this, tipoCliente, numeroAcciones);
    this.precioAlCliente = function(){
    if (tipoCliente === "Clientes") {
        precioAlCliente = precioClientes;
      } else if (tipoCliente === "Inversores") {
        precioAlCliente = precioInversores;
      } else if (tipoCliente === "Empleados"){
        precioAlCliente = precioEmpleados;
      } else {
        precioAlCliente = 'no disponible'
      }
    };
    this.descuentoAdicional = function(){
    if (numeroAcciones >= 1000) {
        descuentoAdicional = descuentoCompraMayor1000;
      } else if (numeroAcciones >= 2000) {
        descuentoAdicional = descuentoCompraMayor2000;
      } else {
        descuentoAdicional = 0;
      } 
    };
}

var PrecioFinal = function(nombre,precioAlCliente,descuentoAdicional,precioReal) {
    Solicitud.call(this, nombre);
    PrecioAccion.call(this, precioAlCliente, descuentoAdicional);
    this.precioReal = function()
    {
    var calculoPrecio = precioAlCliente - (precioAlCliente*descuentoAdicional);
    precioReal=calculoPrecio
    };
}


PrecioFinal.prototype.toString = function registroToString(){
    var val=  this.nombre + " "+ this.precioAlCliente + " " + this.descuentoAdicional + " " + this.precioReal;
    return val;
}

function registrarNuevoCliente(){
    document.getElementById("name").innerHTL ="";
    var nombre = document.getElementById("nombre").value;
    var edad = document.getElementById("correo").value;
    var telefono = document.getElementById("telefono").value;
    var sucursal = document.getElementById("tipoCliente").value;
    var tipo = document.getElementById("numeroAcciones").value;
    event.preventDefault();
    registros.push(new Solicitud(nombre, correo, telefono, tipoCliente, numeroAcciones));

    for (var I = 0; I < registros.length; I++){
       nameList = "<li>" + registros[I] + "</li>";
       document.getElementById("name").innerHTML += nameList;
    }

}

const form = document.getElementById('registro');
const log = document.getElementById('log');
form.addEventListener('submit', registrarNuevoCliente);






