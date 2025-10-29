<<<<<<< HEAD
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
    "contacto": "Telefono piloto: 74929635",
    "precios": "Para conocer los precios del servicio comunicarse con el numero piloto: 74929635.",
    "default": "Lo siento, no entendí. ¿Puedes reformularla?",
    "soy": "soy un chatbot automatico de ayuda para consultas por servicios",
    "demando por despido injustificado": "Art. 55 LGT: Debe presentar demanda en el Ministerio de Trabajo en 90 días. La indemnización es de 1 mes de salario por cada año trabajado",
    "indemnización": "Art. 55 LGT: Le corresponde 1 mes de salario por cada año de servicio. Incluye beneficios sociales adeudados",
    "empleador no paga horas extras": "Art. 47 LGT: Debe reclamar ante el Ministerio de Trabajo. Las horas extras pagan 100% de recargo",
    "inicio un divorcio": "Arts. 150-165 CF: Puede ser divorcio voluntario o contencioso en Juzgados de Familia",
    "solicito pensión alimentos": "Arts. 182-195 CF: Demanda en Juzgado de Familia. El monto según necesidades del hijo y capacidad del padre",
    "derechos unión libre": "Art. 66 CF: Después de 2 años de convivencia tiene derechos patrimoniales y sucesorios",
    "gano tenencia hijos": "Arts. 102-115 CF: El juez decide según el interés superior del niño y su estabilidad",
    "reclamo deuda": "Arts. 1555-1565 CC: Juicio ejecutivo con título ejecutivo. Prescripción: 5 años",
    "contrato compraventa": "Arts. 810-835 CC: Para inmuebles requiere escritura pública y registro en Derechos Reales",
    "vecino invade terreno": "Arts. 390-395 CC: Demanda por perturbación de posesión. Necesita título de propiedad",
    "robaron cómo denuncio": "Arts. 300-302 CP: Denuncia inmediata en Fiscalía con detalles del hecho y testigos",
    "acusan delito": "Arts. 118-125 CPP: No declare sin abogado. Tiene derecho a defensa técnica",
    "gano caso injurias": "Arts. 286-287 CP: Querella por injurias. Necesita pruebas del daño moral",
    "licencia funcionamiento": "Ley 1178: Solicitud en Municipalidad con formulario, planos y certificado de bomberos",
    "municipio clausuró": "Ley 1178: Recurso de reconsideración en 5 días hábiles ante la Alcaldía",
    "documentos necesito trámite": "Depende del trámite. General: cédula y documentos del caso específico",
    "atienden fines semana": "Lunes a Viernes 8:30-16:30. Urgencias: contacto telefónico disponible"
    
    };
    
    var preguntaLower = pregunta.toLowerCase();
    if (preguntaLower.includes("hola") || preguntaLower.includes("holas") || preguntaLower.includes("buenas") || preguntaLower.includes("saludos") || preguntaLower.includes("chatbot")) return respuestas.hola;
    if (preguntaLower.includes("horario") || preguntaLower.includes("horas") || preguntaLower.includes("hora")) return respuestas.horario;
    if (preguntaLower.includes("direccion") || preguntaLower.includes("ubicacion") || preguntaLower.includes("localizacion")) return respuestas.direccion;
    if (preguntaLower.includes("servicios")) return respuestas.servicios;
    if (preguntaLower.includes("contacto") || preguntaLower.includes("contactos")) return respuestas.contacto;
    if (preguntaLower.includes("precios") || preguntaLower.includes("precio") || preguntaLower.includes("costos") || preguntaLower.includes("costo")) return respuestas.precios;
    if (preguntaLower.includes("que eres") || preguntaLower.includes("que sos") || preguntaLower.includes("quien sos") || preguntaLower.includes("quien eres") || preguntaLower.includes("que realizas")) return respuestas.soy;
    if (preguntaLower.includes("demando") || preguntaLower.includes("despido injustificado") || preguntaLower.includes("demanda despido")) return respuestas["demando por despido injustificado"];
    if (preguntaLower.includes("indemnización") || preguntaLower.includes("indemnizacion") || preguntaLower.includes("pago despido")) return respuestas.indemnización;
    if (preguntaLower.includes("horas extras") || preguntaLower.includes("horas extra") || preguntaLower.includes("empleador no paga")) return respuestas["empleador no paga horas extras"];
    if (preguntaLower.includes("inicio divorcio") || preguntaLower.includes("cómo divorcio") || preguntaLower.includes("como divorcio")) return respuestas["inicio un divorcio"];
    if (preguntaLower.includes("pensión alimentos") || preguntaLower.includes("pension alimentos") || preguntaLower.includes("solicito pension")) return respuestas["solicito pensión alimentos"];
    if (preguntaLower.includes("derechos unión libre") || preguntaLower.includes("derechos union libre") || preguntaLower.includes("unión libre")) return respuestas["derechos unión libre"];
    if (preguntaLower.includes("tenencia hijos") || preguntaLower.includes("gano tenencia") || preguntaLower.includes("custodia hijos")) return respuestas["gano tenencia hijos"];
    if (preguntaLower.includes("reclamo deuda") || preguntaLower.includes("reclamar deuda") || preguntaLower.includes("cobrar deuda")) return respuestas["reclamo deuda"];
    if (preguntaLower.includes("contrato compraventa") || preguntaLower.includes("contrato compra-venta") || preguntaLower.includes("hacer contrato")) return respuestas["contrato compraventa"];
    if (preguntaLower.includes("vecino invade") || preguntaLower.includes("vecino terreno") || preguntaLower.includes("invasión terreno")) return respuestas["vecino invade terreno"];
    if (preguntaLower.includes("robaron") || preguntaLower.includes("cómo denuncio robo") || preguntaLower.includes("denunciar robo")) return respuestas["robaron cómo denuncio"];
    if (preguntaLower.includes("acusan delito") || preguntaLower.includes("acusaron") || preguntaLower.includes("delito acusación")) return respuestas["acusan delito"];
    if (preguntaLower.includes("caso injurias") || preguntaLower.includes("gano injurias") || preguntaLower.includes("injurias caso")) return respuestas["gano caso injurias"];
    if (preguntaLower.includes("licencia funcionamiento") || preguntaLower.includes("obtener licencia") || preguntaLower.includes("licencia municipal")) return respuestas["licencia funcionamiento"];
    if (preguntaLower.includes("municipio clausuró") || preguntaLower.includes("municipio clausuro") || preguntaLower.includes("clausura municipal")) return respuestas["municipio clausuró"];
    if (preguntaLower.includes("documentos necesito") || preguntaLower.includes("documentos trámite") || preguntaLower.includes("papeles necesito")) return respuestas["documentos necesito trámite"];
    if (preguntaLower.includes("atienden fines") || preguntaLower.includes("fines de semana") || preguntaLower.includes("horario fin de semana")) return respuestas["atienden fines semana"];

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
=======
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
    "contacto": "Telefono piloto: 74929635",
    "precios": "Para conocer los precios del servicio comunicarse con el numero piloto: 74929635.",
    "default": "Lo siento, no entendí. ¿Puedes reformularla?",
    "soy": "soy un chatbot automatico de ayuda para consultas por servicios",
    "demando por despido injustificado": "Art. 55 LGT: Debe presentar demanda en el Ministerio de Trabajo en 90 días. La indemnización es de 1 mes de salario por cada año trabajado",
    "indemnización": "Art. 55 LGT: Le corresponde 1 mes de salario por cada año de servicio. Incluye beneficios sociales adeudados",
    "empleador no paga horas extras": "Art. 47 LGT: Debe reclamar ante el Ministerio de Trabajo. Las horas extras pagan 100% de recargo",
    "inicio un divorcio": "Arts. 150-165 CF: Puede ser divorcio voluntario o contencioso en Juzgados de Familia",
    "solicito pensión alimentos": "Arts. 182-195 CF: Demanda en Juzgado de Familia. El monto según necesidades del hijo y capacidad del padre",
    "derechos unión libre": "Art. 66 CF: Después de 2 años de convivencia tiene derechos patrimoniales y sucesorios",
    "gano tenencia hijos": "Arts. 102-115 CF: El juez decide según el interés superior del niño y su estabilidad",
    "reclamo deuda": "Arts. 1555-1565 CC: Juicio ejecutivo con título ejecutivo. Prescripción: 5 años",
    "contrato compraventa": "Arts. 810-835 CC: Para inmuebles requiere escritura pública y registro en Derechos Reales",
    "vecino invade terreno": "Arts. 390-395 CC: Demanda por perturbación de posesión. Necesita título de propiedad",
    "robaron cómo denuncio": "Arts. 300-302 CP: Denuncia inmediata en Fiscalía con detalles del hecho y testigos",
    "acusan delito": "Arts. 118-125 CPP: No declare sin abogado. Tiene derecho a defensa técnica",
    "gano caso injurias": "Arts. 286-287 CP: Querella por injurias. Necesita pruebas del daño moral",
    "licencia funcionamiento": "Ley 1178: Solicitud en Municipalidad con formulario, planos y certificado de bomberos",
    "municipio clausuró": "Ley 1178: Recurso de reconsideración en 5 días hábiles ante la Alcaldía",
    "documentos necesito trámite": "Depende del trámite. General: cédula y documentos del caso específico",
    "atienden fines semana": "Lunes a Viernes 8:30-16:30. Urgencias: contacto telefónico disponible"
    
    };
    
    var preguntaLower = pregunta.toLowerCase();
    if (preguntaLower.includes("hola") || preguntaLower.includes("holas") || preguntaLower.includes("buenas") || preguntaLower.includes("saludos") || preguntaLower.includes("chatbot")) return respuestas.hola;
    if (preguntaLower.includes("horario") || preguntaLower.includes("horas") || preguntaLower.includes("hora")) return respuestas.horario;
    if (preguntaLower.includes("direccion") || preguntaLower.includes("ubicacion") || preguntaLower.includes("localizacion")) return respuestas.direccion;
    if (preguntaLower.includes("servicios")) return respuestas.servicios;
    if (preguntaLower.includes("contacto") || preguntaLower.includes("contactos")) return respuestas.contacto;
    if (preguntaLower.includes("precios") || preguntaLower.includes("precio") || preguntaLower.includes("costos") || preguntaLower.includes("costo")) return respuestas.precios;
    if (preguntaLower.includes("que eres") || preguntaLower.includes("que sos") || preguntaLower.includes("quien sos") || preguntaLower.includes("quien eres") || preguntaLower.includes("que realizas")) return respuestas.soy;
    if (preguntaLower.includes("demando") || preguntaLower.includes("despido injustificado") || preguntaLower.includes("demanda despido")) return respuestas["demando por despido injustificado"];
    if (preguntaLower.includes("indemnización") || preguntaLower.includes("indemnizacion") || preguntaLower.includes("pago despido")) return respuestas.indemnización;
    if (preguntaLower.includes("horas extras") || preguntaLower.includes("horas extra") || preguntaLower.includes("empleador no paga")) return respuestas["empleador no paga horas extras"];
    if (preguntaLower.includes("inicio divorcio") || preguntaLower.includes("cómo divorcio") || preguntaLower.includes("como divorcio")) return respuestas["inicio un divorcio"];
    if (preguntaLower.includes("pensión alimentos") || preguntaLower.includes("pension alimentos") || preguntaLower.includes("solicito pension")) return respuestas["solicito pensión alimentos"];
    if (preguntaLower.includes("derechos unión libre") || preguntaLower.includes("derechos union libre") || preguntaLower.includes("unión libre")) return respuestas["derechos unión libre"];
    if (preguntaLower.includes("tenencia hijos") || preguntaLower.includes("gano tenencia") || preguntaLower.includes("custodia hijos")) return respuestas["gano tenencia hijos"];
    if (preguntaLower.includes("reclamo deuda") || preguntaLower.includes("reclamar deuda") || preguntaLower.includes("cobrar deuda")) return respuestas["reclamo deuda"];
    if (preguntaLower.includes("contrato compraventa") || preguntaLower.includes("contrato compra-venta") || preguntaLower.includes("hacer contrato")) return respuestas["contrato compraventa"];
    if (preguntaLower.includes("vecino invade") || preguntaLower.includes("vecino terreno") || preguntaLower.includes("invasión terreno")) return respuestas["vecino invade terreno"];
    if (preguntaLower.includes("robaron") || preguntaLower.includes("cómo denuncio robo") || preguntaLower.includes("denunciar robo")) return respuestas["robaron cómo denuncio"];
    if (preguntaLower.includes("acusan delito") || preguntaLower.includes("acusaron") || preguntaLower.includes("delito acusación")) return respuestas["acusan delito"];
    if (preguntaLower.includes("caso injurias") || preguntaLower.includes("gano injurias") || preguntaLower.includes("injurias caso")) return respuestas["gano caso injurias"];
    if (preguntaLower.includes("licencia funcionamiento") || preguntaLower.includes("obtener licencia") || preguntaLower.includes("licencia municipal")) return respuestas["licencia funcionamiento"];
    if (preguntaLower.includes("municipio clausuró") || preguntaLower.includes("municipio clausuro") || preguntaLower.includes("clausura municipal")) return respuestas["municipio clausuró"];
    if (preguntaLower.includes("documentos necesito") || preguntaLower.includes("documentos trámite") || preguntaLower.includes("papeles necesito")) return respuestas["documentos necesito trámite"];
    if (preguntaLower.includes("atienden fines") || preguntaLower.includes("fines de semana") || preguntaLower.includes("horario fin de semana")) return respuestas["atienden fines semana"];

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
>>>>>>> 968eecbd62217d29a5edaf2783d34845031c2dc1
});