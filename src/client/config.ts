interface Config {
  apiRoot: string;
  enableServiceWorker: boolean;
}

const config: Config = {
  apiRoot: `http://localhost:8800`,
  enableServiceWorker: false,
};

export default config;
