export const SENSOR_LOCATIONS = [
  { value: "", label: "Todas" },
  { value: "oficina", label: "Oficina" },
  { value: "entrada", label: "Entrada" },
  { value: "sala-de-conferencias", label: "Sala de Conferencias" },
];

export const SENSOR_STATES = [
  { value: "", label: "Todos" },
  { value: "activo", label: "Activo" },
  { value: "inactivo", label: "Inactivo" },
];

export const SENSOR_TYPES = [
  { value: "", label: "Todos" },
  { value: "temperatura", label: "Temperatura" },
  { value: "humedad", label: "Humedad" },
  { value: "luz", label: "Luz" },
  { value: "movimiento", label: "Movimiento" },
];

export const RESOURCES = {
  temperatura: {
    label: "Temperatura",
    svg: {
      path: "/assets/resources/termometro-mitad.svg",
      name: "temperature",
    },
  },
  humedad: {
    label: "Humedad",
    svg: {
      path: "/assets/resources/gotas-de-lluvia.svg",
      name: "humidity",
    },
  },
  luz: {
    label: "Luz",
    svg: {
      path: "/assets/resources/sol.svg",
      name: "light",
    },
  },
  movimiento: {
    label: "Movimiento",
    svg: {
      path: "/assets/resources/forma-de-onda.svg",
      name: "movement",
    },
  },
  alta: {
    label: "Alta",
    svg: {
      path: "/assets/resources/circulo-cruzado.svg",
      name: "alert",
    },
  },
  media: {
    label: "Media",
    svg: {
      path: "/assets/resources/advertencia-de-triangulo.svg",
      name: "alert",
    },
  },
  baja: {
    label: "Baja",
    svg: {
      path: "/assets/resources/exclamacion.svg",
      name: "alert",
    },
  },
};

