interface Config {
  apiRoot: string;
  enableServiceWorker: boolean;
}

const config: Config = {
  apiRoot: 'http://localhost:7777',
  enableServiceWorker: false,
};

export default config;
