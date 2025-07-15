import { SensorStateService } from './sensor-state.service';
import { computed, inject, Injectable, signal } from '@angular/core';
import { SENSOR_LOCATIONS, SENSOR_STATES, SENSOR_TYPES } from '../constants/constants';
import { parseSelectFilter, parseTextFilter } from '../utilities/parse-filters';
@Injectable({
  providedIn: "root",
})
export class SensorFilterService {
  readonly selectableSensorTypes = SENSOR_TYPES;
  readonly selectableSensorStates = SENSOR_STATES;
  readonly selectableSensorLocations = SENSOR_LOCATIONS;

  private currentSensorType = signal<string>("");
  private currentSensorState = signal<string>("");
  private currentsensorSearch = signal<string>("");
  private currentSensorLocation = signal<string>("");

  private sensors = inject(SensorStateService).sensorsList;

  public filteredSensors = computed(() => {
    const state = this.currentSensorState();
    const type = this.currentSensorType();
    const location = this.currentSensorLocation();
    const search = this.currentsensorSearch().toLowerCase();

    return (
      this.sensors()?.filter((sensor) => {
        const parsedId = parseTextFilter(sensor.id);
        const parsedName = parseTextFilter(sensor.nombre);
        const filterType = parseSelectFilter(sensor.tipo);
        const filterState = parseSelectFilter(sensor.estado);
        const filterLocation = parseSelectFilter(sensor.ubicacion.zona);

        return (
          (type === "" || filterType === type) &&
          (state === "" || filterState === state) &&
          (location === "" || filterLocation === location) &&
          (parsedName.includes(search) || parsedId.includes(search))
        );
      }) ?? null
    );
  });

  filterByIdOrName(value: string) {
    this.currentsensorSearch.set(value);
  }

  selectSensorType(value: string) {
    this.currentSensorType.set(value);
  }

  selectSensorLocation(value: string) {
    this.currentSensorLocation.set(value);
  }

  slectSensorState(value: string) {
    this.currentSensorState.set(value);
  }
}
