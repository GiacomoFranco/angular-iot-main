# Dashboard IoT

## **ESTRUCTURA DEL PROYECTO**

```
sensors/
├── 📄 README.md                    # Este archivo
├── 📁 server/                    # SERVIDOR COMPLETO Y FUNCIONAL
│   ├── package.json               # Dependencias del servidor
│   ├── server.js                 # Servidor WebSocket con 5 sensores simulados
│   └── README.md                  # Documentación del servidor
└── 📁 frontend/                   # 🛠️ ESQUELETO BÁSICO (Implementar funcionalidad)
    ├── package.json               # Dependencias Angular 17+ configuradas
    ├── angular.json               # Configuración del proyecto
    ├── src/
    │   ├── index.html             # HTML base
    │   ├── main.ts                # Bootstrap temporal con componente placeholder
    │   ├── styles.css             # Archivo de estilos vacío
    │   └── app/
    │       ├── components/        # 📁 VACÍA - Crear todos los componentes
    │       │   └── README.md      # Guía de componentes a crear
    │       ├── services/          # 📁 VACÍA - Crear WebSocket service, state, etc.
    │       │   └── README.md      # Guía de servicios a implementar
    │       ├── interceptors/      # 📁 VACÍA - Crear HTTP interceptors
    │       ├── types/             # Interfaces TypeScript con esqueleto
    │       │   └── sensor.types.ts # Tipos básicos definidos
    │       └── utils/             # 📁 VACÍA - Utilidades opcionales
    └── README.md                  # Instrucciones técnicas del frontend
```

---

## **INICIO RÁPIDO**

### **1. Instalación**
```bash
# Navegar al proyecto
cd sensors

# Instalar dependencias del servidor
cd server
npm install

# Instalar dependencias del frontend
cd ../frontend
npm install
```

### **2. Ejecutar**
```bash
# Terminal 1 - Servidor WebSocket
cd server
npm start
# Servidor corriendo en ws://localhost:8080

# Terminal 2 - Frontend Angular
cd frontend
ng serve
# 📱 Frontend en http://localhost:4200
```

### **3. Verificar**
- **Servidor Health:** http://localhost:8080/health (debe responder JSON con status)
- **Frontend:** http://localhost:4200 (verás página placeholder con instrucciones)
- **WebSocket:** `ws://localhost:8080` (para conectar desde tu servicio)

---

## **SERVIDOR IMPLEMENTADO**

### **WebSocket Endpoint:** `ws://localhost:8080`

El servidor ya está **completamente implementado** con:
- **5 Sensores Simulados:** Temperatura (2), Humedad (1), Movimiento (1), Luz (1)
- **Datos en Tiempo Real:** Actualizaciones cada 2 segundos
- **Simulación de Errores:** 2% probabilidad de errores por sensor
- **API Completa:** Múltiples tipos de mensajes y comandos
- **Health Check:** Endpoint HTTP para monitoreo

### **Sensores Disponibles:**
```typescript
[
  {
    id: 'TEMP_001',
    nombre: 'Temperatura Sala de Conferencias',
    tipo: 'temperatura',
    ubicacion: { zona: 'oficina', habitacion: 'Sala de Conferencias A' },
    unidad: '°C',
    rango: { min: 18, max: 28 }
  },
  {
    id: 'HUM_001', 
    nombre: 'Humedad Sala de Conferencias',
    tipo: 'humedad',
    ubicacion: { zona: 'oficina', habitacion: 'Sala de Conferencias A' },
    unidad: '%',
    rango: { min: 30, max: 80 }
  },
  {
    id: 'TEMP_002',
    nombre: 'Temperatura Lobby',
    tipo: 'temperatura', 
    ubicacion: { zona: 'entrada', habitacion: 'Lobby Principal' },
    unidad: '°C',
    rango: { min: 16, max: 30 }
  },
  {
    id: 'MOVIMIENTO_001',
    nombre: 'Detector de Movimiento Lobby',
    tipo: 'movimiento',
    ubicacion: { zona: 'entrada', habitacion: 'Lobby Principal' },
    unidad: 'boolean',
    rango: { min: 0, max: 1 }
  },
  {
    id: 'LUZ_001',
    nombre: 'Sensor de Iluminación Oficina',
    tipo: 'luz',
    ubicacion: { zona: 'oficina', habitacion: 'Área Abierta' },
    unidad: 'lux',
    rango: { min: 0, max: 1000 }
  }
]
```

### **Mensajes WebSocket Implementados:**

#### **Mensajes que Recibirás:**
```typescript
// 1. Conexión establecida
{
  tipo: 'conexion_establecida',
  mensaje: 'Conectado al Servidor de Sensores IoT',
  clienteId: 'cliente_xxx',
  timestamp: '2024-01-15T10:30:00.000Z',
  infoServidor: {
    version: '1.0.0',
    totalSensores: 5,
    intervaloActualizacion: 2000
  }
}

// 2. Lectura de sensor en tiempo real (cada 2 segundos por sensor)
{
  tipo: 'lectura_sensor',
  datos: {
    id: 'TEMP_001_lectura_1704444600000',
    sensorId: 'TEMP_001',
    nombreSensor: 'Temperatura Sala de Conferencias',
    tipo: 'temperatura',
    valor: 23.5,
    unidad: '°C',
    timestamp: '2024-01-15T10:30:00.000Z',
    estado: 'normal', // 'normal', 'advertencia', 'error'
    ubicacion: {
      zona: 'oficina',
      habitacion: 'Sala de Conferencias A',
      edificio: 'Edificio Principal'
    },
    metadata: {
      nivelBateria: 85,
      intensidadSenal: 92,
      ultimaCalibracion: '2024-01-10T08:15:00.000Z'
    }
  },
  timestamp: '2024-01-15T10:30:00.000Z'
}

// 3. Error de sensor (2% probabilidad)
{
  tipo: 'error_sensor',
  datos: {
    codigoError: 'SENSOR_OFFLINE', // Múltiples tipos de error
    sensorId: string,
    nombreSensor: string,
    mensaje: string,
    severidad: 'baja' | 'media' | 'alta',
    timestamp: string,
    ubicacion: {
      zona: string,
      habitacion: string,
      edificio: string
    },
    solucionProblemas: string[],
    sensorId: 'TEMP_001',
    nombreSensor: 'Temperatura Sala de Conferencias',
    mensaje: 'El sensor no responde',
    severidad: 'alta', // 'baja', 'media', 'alta'
    timestamp: '2024-01-15T10:30:00.000Z',
    ubicacion: { /* ubicación del sensor */ },
    solucionProblemas: [
      'Verificar conexión de energía del sensor',
      'Verificar conectividad de red',
      'Reiniciar sensor si es necesario'
    ],
    metadata: {
      errorId: string,
      reintentoAutomatico: boolean,
      resolucionEstimada: string
      errorId: 'ERR_1704444600000_xyz',
      reintentoAutomatico: false,
      resolucionEstimada: '15-30 minutos'
    }
  },
  timestamp: '2024-01-15T10:30:00.000Z'
}

// 4. Lista de sensores (respuesta a comando)
{
  tipo: 'lista_sensores',
  sensores: [/* array de sensores */],
  timestamp: '2024-01-15T10:30:00.000Z'
}

// 5. Estadísticas del servidor (respuesta a comando)
{
  tipo: 'estadisticas_servidor',
  estadisticas: {
    horaInicio: 1704444000000,
    conexionesTotales: 5,
    mensajesTotales: 1250,
    erroresTotal: 25,
    sensoresActivos: 5,
    uptime: 3600,
    clientesActivos: 2,
    usoMemoria: { /* object memory usage */ }
  },
  timestamp: '2024-01-15T10:30:00.000Z'
}
```

#### **Comandos que Puedes Enviar:**
```typescript
{ tipo: 'ping' }                           // Verificar conexión → recibe 'pong'
{ tipo: 'obtener_sensores' }               // Lista sensores → recibe 'lista_sensores'
{ tipo: 'obtener_estadisticas_servidor' }   // Stats → recibe 'estadisticas_servidor'
{ tipo: 'suscribir_sensor', sensorId: 'TEMP_001' }  // Suscribirse a sensor específico
```
