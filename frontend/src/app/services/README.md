# Carpeta de Servicios

Esta carpeta está vacía. Aquí debes crear todos los servicios de tu aplicación.

## Servicios Obligatorios a Crear:

### **WebSocket Service**
```typescript
// websocket.service.ts
@Injectable({ providedIn: 'root' })
export class WebSocketService {
  // TODO: Implementar conexión a ws://localhost:8080
  // TODO: Manejo de reconexión automática
  // TODO: Heartbeat/ping
  // TODO: Buffer de mensajes
  // TODO: Métricas de conexión
}
```

### **State Service** 
```typescript
// sensor-state.service.ts
@Injectable({ providedIn: 'root' })
export class SensorStateService {
  // TODO: Signals para todo el estado
  // TODO: Computed signals para datos derivados
  // TODO: Métodos para actualizar estado
}
```

### **Error Service**
```typescript
// error.service.ts
@Injectable({ providedIn: 'root' })
export class ErrorService {
  // TODO: Categorización de errores
  // TODO: Logging y telemetría
  // TODO: Recovery strategies
}
```

## Patrones Recomendados:

### **Service con Signals**
```typescript
@Injectable({ providedIn: 'root' })
export class MyService {
  private _data = signal<Data[]>([]);
  
  // Readonly signal para componentes
  data = this._data.asReadonly();
  
  // Computed signal
  filteredData = computed(() => {
    // TODO: Implementar lógica
  });
}
```

### **Service con RxJS + Signals**
```typescript
@Injectable({ providedIn: 'root' })
export class MyService {
  private dataSubject = new BehaviorSubject<Data[]>([]);
  private _data = signal<Data[]>([]);
  
  constructor() {
    // Conectar RxJS con Signals
    this.dataSubject.subscribe(data => this._data.set(data));
  }
}
```