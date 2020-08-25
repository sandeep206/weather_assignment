export interface Weather {
  id: string;
  main: string;
  description: string;
  icon: string;
}

export interface Temperature {
  temp: string;
  pressure: string;
  humidity: number;
  temp_min: string;
  temp_max: string;
}

export interface Wind {
  speed: string;
  deg: string;
}

export interface Cloud {
  all: string;
}

export interface Coordinates {
  lon?: string;
  lat?: string;
}
export interface Climate {
  base?: string;
  coord?: Coordinates;
  weather: Weather[];
  main: Temperature;
  wind: Wind;
  clouds: Cloud;
}

export interface City extends Climate {
  name: string;
  base?: string;
  id: string;
  timezone: string;
  dt?: string;
  visibility?: string;
}

export interface Hourly extends Climate {
  dt_txt: string;
}

export interface Forecast {
  list: Hourly[];
  city: City;
}
