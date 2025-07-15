import { computed, Injectable, Signal, signal } from '@angular/core';
import { MensajeLecturaSensor, MensajeListaSensores, SensorDatosDetail } from '../types/sensor.types';

@Injectable({
  providedIn: "root",
})
export class SensorStateService {
  private lightMessage = signal<MensajeLecturaSensor>({} as MensajeLecturaSensor);
  private humedadMessage = signal<MensajeLecturaSensor>({} as MensajeLecturaSensor);
  private movementMessage = signal<MensajeLecturaSensor>({} as MensajeLecturaSensor);
  private sensorsListMessage = signal<MensajeListaSensores>({} as MensajeListaSensores);
  private lobbyTemperatureMessage = signal<MensajeLecturaSensor>({} as MensajeLecturaSensor);
  private conferenceTemperatureMessage = signal<MensajeLecturaSensor>({} as MensajeLecturaSensor);

  public light = computed(() => this.lightMessage().datos);
  public humedad = computed(() => this.humedadMessage().datos);
  public movement = computed(() => this.movementMessage().datos);
  public sensorsList = computed(() => this.sensorsListMessage().sensores);
  public lobbyTemperature = computed(() => this.lobbyTemperatureMessage().datos);
  public conferenceTemperature = computed(() => this.conferenceTemperatureMessage().datos);

  public handleSensorList(message: any) {
    this.sensorsListMessage.set(message!);
  }

  public handleSensorReading(message: MensajeLecturaSensor) {
    const sensorId = message.datos.sensorId;
    if (sensorId === "LUZ_001") this.lightMessage.set(message!);
    if (sensorId === "HUM_001") this.humedadMessage.set(message!);
    if (sensorId === "MOVIMIENTO_001") this.movementMessage.set(message!);
    if (sensorId === "TEMP_002") this.lobbyTemperatureMessage.set(message!);
    if (sensorId === "TEMP_001")
      this.conferenceTemperatureMessage.set(message!);
  }

  public getSensorbById(sensorId: string): Signal<SensorDatosDetail> {
    if (sensorId === "LUZ_001") return this.light;
    if (sensorId === "HUM_001") return this.humedad;
    if (sensorId === "MOVIMIENTO_001") return this.movement;
    if (sensorId === "TEMP_002") return this.lobbyTemperature;
    if (sensorId === "TEMP_001") return this.conferenceTemperature;
    
    return signal<any>({});
  }

  public getSensorList(socket: WebSocket): void {
    socket.send(JSON.stringify({ tipo: "obtener_sensores" }));
  }
}
