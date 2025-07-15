import { AlertsService } from './alerts.service';
import { SensorStateService } from './sensor-state.service';
import { MensajeWebSocketReceived } from '../types/sensor.types';
import { inject, Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: "root",
})
export class WebSocketService {
  constructor() {
    this.openWebSocket();
  }
  
  private socket!: WebSocket;
  private alertsService: AlertsService = inject(AlertsService);
  private sensorStateService: SensorStateService = inject(SensorStateService);
  private webSocketMessageSignal = signal<MensajeWebSocketReceived | undefined>(
    undefined
  );

  public webSocketMessage: Signal<MensajeWebSocketReceived | undefined> =
    this.webSocketMessageSignal.asReadonly();

  openWebSocket() {
    this.socket = new WebSocket("ws://localhost:8080");

    this.socket.onopen = () => {
      console.log("Conexión abierta");
      this.sensorStateService.getSensorList(this.socket);
    };

    this.socket.onmessage = (event: MessageEvent<string>) => {
      const message = JSON.parse(event.data);
      const messageType = message.tipo;

      if (messageType === "error_sensor") this.alertsService.handleError(message);
      if (messageType === "lista_sensores") this.sensorStateService.handleSensorList(message);
      if (messageType === "lectura_sensor") this.sensorStateService.handleSensorReading(message);
    };

    this.socket.onerror = (error: Event) => {
      console.error("Ocurrió un error con el WebSocket:", error);
    };

    this.socket.onclose = (event: CloseEvent) => {
      console.log("Conexión cerrada:", event.reason);
    };
  }

  public closeWebSocket() {
    this.socket?.close();
  }
}
