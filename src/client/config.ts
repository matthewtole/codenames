// tslint:disable-next-line:import-name
import serverConfig from '../server/config';

interface Config {
  apiRoot: string;
  enableServiceWorker: boolean;
}

const config: Config = {
  apiRoot: `http://localhost:${serverConfig.port}`,
  enableServiceWorker: false,
};

export default config;
