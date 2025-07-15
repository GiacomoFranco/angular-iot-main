/*
  TODO: Definir todas las interfaces TypeScript para el proyecto
  
  El servidor WebSocket envía estos tipos de datos:
  
  1. Mensaje de conexión establecida
  2. Lecturas de sensores en tiempo real
  3. Errores de sensores
  4. Lista de sensores disponibles
  5. Estadísticas del servidor
  
  Debes crear interfaces para todos estos tipos de datos.
  Recuerda usar union types, enums y genéricos donde sea apropiado.
*/


export type TipoSensor = 'temperatura' | 'humedad' | 'luz' | 'movimiento';

export type EstadoSensor = 'normal' | 'advertencia' | 'error' | 'offline';

export type SeveridadError = "baja" | "media" | "alta";


// Mensajes que se envían al servidor
export interface MensajeWebSocket {
  tipo:
    | "ping"
    | "obtener_sensores"
    | "obtener_estadisticas_servidor"
    | "suscribir_sensor";
  [key: string]: any;
}

// Datos que se reciben en los mensajes del servidor

export interface SensorDatosDetail {
  id: string;
  sensorId: string;
  nombreSensor: string;
  tipo: TipoSensor;
  valor: number;
  unidad: string;
  timestamp: string;
  estado: EstadoSensor;
  ubicacion: {
    zona: string;
    habitacion: string;
    edificio: string;
  };
  metadata: {
    nivelBateria: number;
    intensidadSenal: number;
    ultimaCalibracion: string;
  };
}

export interface SensorDatos {
  id: string;
  nombre: string;
  tipo: string;
  ubicacion: {
    zona: string;
    habitacion: string;
    edificio: string;
  };
  unidad: string;
  estado: string;
}


export interface ErrorSensorDatos {
  codigoError: string;
  sensorId: string;
  nombreSensor: string;
  mensaje: string;
  severidad: SeveridadError;
  solucionProblemas: string[];
  ubicacion: {
    zona: string;
    habitacion: string;
    edificio: string;
  };
  metadata: {
    errorId: string;
    reintentoAutomatico: boolean;
    resolucionEstimada: string;
  };
}

export interface EstadisticasServidor {
  horaInicio: number;
  conexionesTotales: number;
  mensajesTotales: number;
  erroresTotal: number;
  sensoresActivos: number;
  uptime: number;
  clientesActivos: number;
  usoMemoria: {
    rss: number;
    heapTotal: number;
    heapUsed: number;
  };
}

// Mensajes que se reciben del servidor

export interface MensajeConexionEstablecida {
  tipo: "conexion_establecida";
  mensaje: string;
  clienteId: string;
  timestamp: string;
  infoServidor: {
    version: string;
    totalSensores: number;
    intervaloActualizacion: number;
  };
}

export interface MensajeListaSensores {
  tipo: "lista_sensores";
  sensores: SensorDatos[];
  timestamp: string;
}

export interface MensajeLecturaSensor {
  tipo: "lectura_sensor";
  datos: SensorDatosDetail;
  timestamp: string;
}

export interface MensajeErrorSensor {
  tipo: "error_sensor";
  datos: ErrorSensorDatos;
  timestamp: string;
}

export interface MensajeEstadisticasServidor {
  tipo: "estadisticas_servidor";
  estadisticas: EstadisticasServidor;
  timestamp: string;
}

export type MensajeWebSocketReceived =
  | MensajeConexionEstablecida
  | MensajeListaSensores
  | MensajeLecturaSensor
  | MensajeErrorSensor
  | MensajeEstadisticasServidor;

  