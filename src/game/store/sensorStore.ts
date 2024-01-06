export type Sensor = {
  x: number;
  y: number;
  width: number;
  id: number;
};

let sensorStore: Sensor[];

export const getSensorStore = () => {
  return sensorStore;
};

export const setSensorStore = (sensors: Sensor[]) => {
  sensorStore = sensors;
};

export const removeSensor = (sensor: Sensor) => {
  const index = sensorStore.indexOf(sensor);
  sensorStore.splice(index, 1);
};

export const removeAllSensors = () => {
  sensorStore = [];
};
