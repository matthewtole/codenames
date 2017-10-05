import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

interface Config {
  port: number;
}

const config: Config = {
  port: process.env.PORT !== undefined ? parseInt(process.env.PORT, 10) : 8000,
};

export default config;
