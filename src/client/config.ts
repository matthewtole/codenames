interface Config {
  apiRoot: string;
  enableServiceWorker: boolean;
}

const config: Config = {
  apiRoot: `${window.location.protocol}//${window.location.host}`,
  enableServiceWorker: false,
};

export default config;
