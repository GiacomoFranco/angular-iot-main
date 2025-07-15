/**
 * Servidor WebSocket de Sensores IoT
 * Prueba Técnica - TechFlow Solutions Inc.
 * 
 * Este servidor simula datos de sensores IoT en tiempo real y proporciona
 * comunicación WebSocket para la prueba técnica de Angular frontend.
 */

const WebSocket = require('ws');
const express = require('express');
const cors = require('cors');
const http = require('http');

// Configuración del Servidor
const PORT = process.env.PORT || 8080;
const INTERVALO_ACTUALIZACION_SENSORES = 2000; // 2 segundos
const TASA_SIMULACION_ERRORES = 0.02; // 2% probabilidad de error por actualización

// Inicializar app Express para health checks
const app = express();
app.use(cors());
app.use(express.json());

// Endpoint de health check
app.get('/health', (req, res) => {
  res.json({
    estado: 'saludable',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    clientes: wss.clients.size
  });
});

// Crear servidor HTTP
const server = http.createServer(app);

// Crear servidor WebSocket
const wss = new WebSocket.Server({ server });

// Estadísticas del servidor
const estadisticasServidor = {
  horaInicio: Date.now(),
  conexionesTotales: 0,
  mensajesTotales: 0,
  erroresTotal: 0,
  sensoresActivos: 0 // Se actualizará con la configuración
};

// Configuración de Sensores
const CONFIGURACION_SENSORES = [
  {
    id: 'TEMP_001',
    nombre: 'Temperatura Sala de Conferencias',
    tipo: 'temperatura',
    ubicacion: { zona: 'oficina', habitacion: 'Sala de Conferencias A', edificio: 'Edificio Principal' },
    unidad: '°C',
    rango: { min: 18, max: 28 },
    rangoNormal: { min: 20, max: 25 }
  },
  {
    id: 'HUM_001',
    nombre: 'Humedad Sala de Conferencias',
    tipo: 'humedad',
    ubicacion: { zona: 'oficina', habitacion: 'Sala de Conferencias A', edificio: 'Edificio Principal' },
    unidad: '%',
    rango: { min: 30, max: 80 },
    rangoNormal: { min: 40, max: 60 }
  },
  {
    id: 'TEMP_002',
    nombre: 'Temperatura Lobby',
    tipo: 'temperatura',
    ubicacion: { zona: 'entrada', habitacion: 'Lobby Principal', edificio: 'Edificio Principal' },
    unidad: '°C',
    rango: { min: 16, max: 30 },
    rangoNormal: { min: 19, max: 26 }
  },
  {
    id: 'MOVIMIENTO_001',
    nombre: 'Detector de Movimiento Lobby',
    tipo: 'movimiento',
    ubicacion: { zona: 'entrada', habitacion: 'Lobby Principal', edificio: 'Edificio Principal' },
    unidad: 'boolean',
    rango: { min: 0, max: 1 },
    rangoNormal: { min: 0, max: 1 }
  },
  {
    id: 'LUZ_001',
    nombre: 'Sensor de Iluminación Oficina',
    tipo: 'luz',
    ubicacion: { zona: 'oficina', habitacion: 'Área Abierta', edificio: 'Edificio Principal' },
    unidad: 'lux',
    rango: { min: 0, max: 1000 },
    rangoNormal: { min: 200, max: 800 }
  }
];

// Actualizar estadísticas
estadisticasServidor.sensoresActivos = CONFIGURACION_SENSORES.length;

// Generar datos realistas de sensores
function generarLecturaSensor(configuracionSensor) {
  const { id, nombre, tipo, ubicacion, unidad, rango, rangoNormal } = configuracionSensor;
  
  let valor;
  let estado = 'normal';
  
  // Generar valor basado en el tipo de sensor
  switch (tipo) {
    case 'temperatura':
    case 'humedad':
    case 'luz':
      // 90% probabilidad de lectura normal, 10% probabilidad de fuera de rango
      const esNormal = Math.random() > 0.1;
      if (esNormal) {
        valor = rangoNormal.min + Math.random() * (rangoNormal.max - rangoNormal.min);
      } else {
        valor = rango.min + Math.random() * (rango.max - rango.min);
        estado = valor > rangoNormal.max ? 'advertencia' : 
                 valor < rangoNormal.min ? 'advertencia' : 'normal';
      }
      valor = Math.round(valor * 10) / 10; // Redondear a 1 decimal
      break;
      
    case 'movimiento':
      valor = Math.random() > 0.7 ? 1 : 0; // 30% probabilidad de movimiento
      break;
      
    default:
      valor = rango.min + Math.random() * (rango.max - rango.min);
      valor = Math.round(valor * 100) / 100;
  }
  
  // Simular errores críticos ocasionalmente
  if (Math.random() < 0.005) { // 0.5% probabilidad
    estado = 'error';
  }
  
  return {
    id: `${id}_lectura_${Date.now()}`,
    sensorId: id,
    nombreSensor: nombre,
    tipo,
    valor,
    unidad,
    timestamp: new Date().toISOString(),
    estado,
    ubicacion,
    metadata: {
      nivelBateria: Math.floor(Math.random() * 30) + 70, // 70-100%
      intensidadSenal: Math.floor(Math.random() * 20) + 80, // 80-100%
      ultimaCalibracion: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
    }
  };
}

// Generar error de sensor
function generarErrorSensor(configuracionSensor) {
  const tiposError = [
    {
      codigo: 'SENSOR_OFFLINE',
      mensaje: 'El sensor no responde',
      severidad: 'alta',
      solucionProblemas: [
        'Verificar conexión de energía del sensor',
        'Verificar conectividad de red',
        'Reiniciar sensor si es necesario'
      ]
    },
    {
      codigo: 'DERIVA_CALIBRACION',
      mensaje: 'Las lecturas del sensor están fuera del rango de calibración',
      severidad: 'media',
      solucionProblemas: [
        'Recalibrar sensor usando referencia estándar',
        'Verificar ambiente del sensor por interferencias',
        'Programar mantenimiento si el problema persiste'
      ]
    },
    {
      codigo: 'BATERIA_BAJA',
      mensaje: 'El nivel de batería del sensor está críticamente bajo',
      severidad: 'media',
      solucionProblemas: [
        'Reemplazar batería del sensor',
        'Verificar compartimento de batería por corrosión',
        'Verificar compatibilidad del tipo de batería'
      ]
    },
    {
      codigo: 'ERROR_COMUNICACION',
      mensaje: 'Fallo al comunicarse con el sensor',
      severidad: 'alta',
      solucionProblemas: [
        'Verificar conexión de red',
        'Verificar que el sensor esté dentro del rango de comunicación',
        'Reiniciar módulo de comunicación'
      ]
    }
  ];
  
  const tipoError = tiposError[Math.floor(Math.random() * tiposError.length)];
  
  return {
    tipo: 'error_sensor',
    codigoError: tipoError.codigo,
    sensorId: configuracionSensor.id,
    nombreSensor: configuracionSensor.nombre,
    mensaje: tipoError.mensaje,
    severidad: tipoError.severidad,
    timestamp: new Date().toISOString(),
    ubicacion: configuracionSensor.ubicacion,
    solucionProblemas: tipoError.solucionProblemas,
    metadata: {
      errorId: `ERR_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`,
      reintentoAutomatico: tipoError.severidad !== 'alta',
      resolucionEstimada: tipoError.severidad === 'alta' ? '15-30 minutos' : '5-10 minutos'
    }
  };
}

// Manejador de conexión WebSocket
wss.on('connection', (ws, request) => {
  console.log(`✓ Nuevo cliente conectado desde ${request.socket.remoteAddress}`);
  estadisticasServidor.conexionesTotales++;
  
  // Enviar mensaje de bienvenida
  const mensajeBienvenida = {
    tipo: 'conexion_establecida',
    mensaje: 'Conectado al Servidor de Sensores IoT',
    clienteId: generarIdCliente(),
    timestamp: new Date().toISOString(),
    infoServidor: {
      version: '1.0.0',
      totalSensores: CONFIGURACION_SENSORES.length,
      intervaloActualizacion: INTERVALO_ACTUALIZACION_SENSORES
    }
  };
  
  ws.send(JSON.stringify(mensajeBienvenida));
  
  // Manejar mensajes entrantes
  ws.on('message', (data) => {
    try {
      const mensaje = JSON.parse(data.toString());
      manejarMensajeCliente(ws, mensaje);
      estadisticasServidor.mensajesTotales++;
    } catch (error) {
      console.error('Error parseando mensaje del cliente:', error);
      enviarError(ws, 'ERROR_PARSEO_MENSAJE', 'Formato JSON inválido');
    }
  });
  
  // Manejar desconexión del cliente
  ws.on('close', (code, reason) => {
    console.log(`✗ Cliente desconectado: ${code} - ${reason}`);
  });
  
  // Manejar errores de WebSocket
  ws.on('error', (error) => {
    console.error('Error de WebSocket:', error);
  });
});

// Manejar mensajes del cliente
function manejarMensajeCliente(ws, mensaje) {
  switch (mensaje.tipo) {
    case 'ping':
      ws.send(JSON.stringify({
        tipo: 'pong',
        timestamp: new Date().toISOString()
      }));
      break;
      
    case 'obtener_sensores':
      enviarListaSensores(ws);
      break;
      
    case 'obtener_estadisticas_servidor':
      enviarEstadisticasServidor(ws);
      break;
      
    case 'suscribir_sensor':
      // TODO: Implementar suscripciones específicas de sensor
      console.log(`Cliente suscrito al sensor: ${mensaje.sensorId}`);
      break;
      
    default:
      console.log(`Tipo de mensaje desconocido: ${mensaje.tipo}`);
      enviarError(ws, 'TIPO_MENSAJE_DESCONOCIDO', `El tipo de mensaje '${mensaje.tipo}' no es soportado`);
  }
}

// Enviar lista de sensores al cliente
function enviarListaSensores(ws) {
  const listaSensores = CONFIGURACION_SENSORES.map(sensor => ({
    id: sensor.id,
    nombre: sensor.nombre,
    tipo: sensor.tipo,
    ubicacion: sensor.ubicacion,
    unidad: sensor.unidad,
    estado: 'activo' // TODO: Implementar seguimiento real del estado del sensor
  }));
  
  ws.send(JSON.stringify({
    tipo: 'lista_sensores',
    sensores: listaSensores,
    timestamp: new Date().toISOString()
  }));
}

// Enviar estadísticas del servidor
function enviarEstadisticasServidor(ws) {
  const estadisticas = {
    ...estadisticasServidor,
    uptime: Math.floor((Date.now() - estadisticasServidor.horaInicio) / 1000),
    clientesActivos: wss.clients.size,
    usoMemoria: process.memoryUsage(),
    timestamp: new Date().toISOString()
  };
  
  ws.send(JSON.stringify({
    tipo: 'estadisticas_servidor',
    estadisticas,
    timestamp: new Date().toISOString()
  }));
}

// Enviar mensaje de error al cliente
function enviarError(ws, codigoError, mensaje) {
  const error = {
    tipo: 'error_servidor',
    codigoError,
    mensaje,
    timestamp: new Date().toISOString(),
    severidad: 'baja'
  };
  
  ws.send(JSON.stringify(error));
  estadisticasServidor.erroresTotal++;
}

// Generar ID único de cliente
function generarIdCliente() {
  return 'cliente_' + Date.now() + '_' + Math.random().toString(36).substr(2, 8);
}

// Transmitir datos de sensores a todos los clientes conectados
function transmitirDatosSensores() {
  if (wss.clients.size === 0) return;
  
  CONFIGURACION_SENSORES.forEach(configuracionSensor => {
    // Generar lectura de sensor
    const lectura = generarLecturaSensor(configuracionSensor);
    
    const mensaje = {
      tipo: 'lectura_sensor',
      datos: lectura,
      timestamp: new Date().toISOString()
    };
    
    // Transmitir a todos los clientes conectados
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(mensaje));
      }
    });
    
    // Simular errores ocasionalmente
    if (Math.random() < TASA_SIMULACION_ERRORES) {
      const error = generarErrorSensor(configuracionSensor);
      
      const mensajeError = {
        tipo: 'error_sensor',
        datos: error,
        timestamp: new Date().toISOString()
      };
      
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(mensajeError));
        }
      });
      
      estadisticasServidor.erroresTotal++;
    }
  });
}

// Iniciar el servidor
server.listen(PORT, () => {
  console.log('🚀 Servidor WebSocket de Sensores IoT iniciado');
  console.log(`📡 Servidor WebSocket: ws://localhost:${PORT}`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
  console.log(`📊 Total de Sensores: ${CONFIGURACION_SENSORES.length}`);
  console.log(`⏱️  Intervalo de Actualización: ${INTERVALO_ACTUALIZACION_SENSORES}ms`);
  console.log('');
  console.log('¡Listo para conexiones del frontend Angular! 🎯');
});

// Iniciar transmisión de datos de sensores
const intervaloSensores = setInterval(transmitirDatosSensores, INTERVALO_ACTUALIZACION_SENSORES);

// Cierre elegante
process.on('SIGTERM', () => {
  console.log('🛑 Cerrando servidor...');
  clearInterval(intervaloSensores);
  wss.close(() => {
    server.close(() => {
      console.log('✓ Servidor cerrado elegantemente');
      process.exit(0);
    });
  });
});

process.on('SIGINT', () => {
  console.log('🛑 Cerrando servidor...');
  clearInterval(intervaloSensores);
  wss.close(() => {
    server.close(() => {
      console.log('✓ Servidor cerrado elegantemente');
      process.exit(0);
    });
  });
});