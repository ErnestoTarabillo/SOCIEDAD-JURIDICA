function abrirChat() {
    var chat = document.getElementById("chatbotVentana");
    if (chat.style.display === "flex") {
        chat.style.display = "none";
    } else {
        chat.style.display = "flex";
        cargarHistorial();
    }
}

function cerrarChat() {
    document.getElementById("chatbotVentana").style.display = "none";
}

function enviarMensaje() {
    var input = document.querySelector('#chatbotVentana input');
    var mensaje = input.value.trim();
    
    if (mensaje !== "") {
        var areaMensajes = document.getElementById('areaMensajes');
        areaMensajes.innerHTML += '<p style="margin:5px 0;padding:8px;background:#e3f2fd;border-radius:10px;color:black;"><strong>Tú:</strong> ' + mensaje + '</p>';
        
        var respuesta = obtenerRespuesta(mensaje);
        areaMensajes.innerHTML += '<p style="margin:5px 0;padding:8px;background:#f5f5f5;border-radius:10px;color:black;"><strong>Bot:</strong> ' + respuesta + '</p>';
        
        areaMensajes.scrollTop = areaMensajes.scrollHeight;
        input.value = "";
        
        guardarMensaje('usuario', mensaje);
        guardarMensaje('bot', respuesta);
    }
}

function guardarMensaje(tipo, texto) {
    var mensajes = JSON.parse(localStorage.getItem('chatHistorial')) || [];
    mensajes.push({tipo: tipo, texto: texto, fecha: new Date()});
    localStorage.setItem('chatHistorial', JSON.stringify(mensajes));
}

function cargarHistorial() {
    var mensajes = JSON.parse(localStorage.getItem('chatHistorial')) || [];
    var areaMensajes = document.getElementById('areaMensajes');
    
    areaMensajes.innerHTML = '<p style="color:black;">¡Hola! ¿En qué puedo ayudarte?</p>';
    
    mensajes.forEach(function(mensaje) {
        if (mensaje.tipo === 'usuario') {
            areaMensajes.innerHTML += '<p style="margin:5px 0;padding:8px;background:#e3f2fd;border-radius:10px;color:black;"><strong>Tú:</strong> ' + mensaje.texto + '</p>';
        } else {
            areaMensajes.innerHTML += '<p style="margin:5px 0;padding:8px;background:#f5f5f5;border-radius:10px;color:black;"><strong>Bot:</strong> ' + mensaje.texto + '</p>';
        }
    });
    
    areaMensajes.scrollTop = areaMensajes.scrollHeight;
}

function obtenerRespuesta(pregunta) {
    var respuestas = {
    "hola": "¡Hola! Soy el asistente del Estudio Juridico Fertar. ¿En qué puedo ayudarte?",
    "horario": "Lunes a Viernes en oficina de 09:00 a 17:00 y por llamadas 24/7 ",
    "direccion": "Estamos ubicado en la calle Aroma numero 772 casi esquina Avenida uruguay edificio Aroma III, primer piso oficina 11, santa cruz bolivia",
    "servicios": "Atendemos procesos penales, civiles, familiares, laborales y asuntos administrativos.",
    "contacto,": "Telefono piloto: 74929635",
    "precios": "Para conocer los precios del servicio comunicarse con el numero piloto: 74929635.",
    "default": "Lo siento, no entendí. ¿Puedes reformularla?",
    "soy": "soy un chatbot automatico de ayuda para consultas por servicios"
    };
    
    var preguntaLower = pregunta.toLowerCase();
    if (preguntaLower.includes("hola") || preguntaLower.includes("holas") || preguntaLower.includes("buenas") || preguntaLower.includes("saludos")) return respuestas.hola;
    if (preguntaLower.includes("horario") || preguntaLower.includes("horas") || preguntaLower.includes("hora")) return respuestas.horario;
    if (preguntaLower.includes("direccion") || preguntaLower.includes("ubicacion") || preguntaLower.includes("localizacion")) return respuestas.direccion;
    if (preguntaLower.includes("servicios")) return respuestas.servicios;
    if (preguntaLower.includes("contacto") || preguntaLower.includes("contactos")) return respuestas.contacto;
    if (preguntaLower.includes("precios") || preguntaLower.includes("precio") || preguntaLower.includes("costos") || preguntaLower.includes("costo")) return respuestas.precios;
    if (preguntaLower.includes("que eres") || preguntaLower.includes("que sos") || preguntaLower.includes("quien sos") || preguntaLower.includes("quien eres") || preguntaLower.includes("que realizas")) return respuestas.soy;
    
    return respuestas.default;
}

document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            var chat = document.getElementById('chatbotVentana');
            if (chat && chat.style.display === 'flex') {
                enviarMensaje();
            }
        }
    });
});