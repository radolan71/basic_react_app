declare global {
  interface Window {
    RickyAndMortyApp: any;
  }
}

export const getGlobalObject = (): any => {
  if (typeof window.RickyAndMortyApp === "undefined") {
    window.RickyAndMortyApp = {};
  }

  return window.RickyAndMortyApp;
};

export const globalObject = getGlobalObject();

export interface GlobalConfiguration {
  rickyAndMortyApi: string;
}

export function getAppConfig(): GlobalConfiguration {
  return globalObject.config;
}

export function setAppConfig(config: GlobalConfiguration): void {
  globalObject.config = config;
}
