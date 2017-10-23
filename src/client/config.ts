declare var CONFIG: any;

interface Config {
  apiRoot: string;
  enableServiceWorker: boolean;
}

const config: Config = {
  apiRoot: CONFIG.API_ROOT,
  enableServiceWorker: false,
};

export default config;
