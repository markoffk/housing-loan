import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigReader {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const env = process.env.NODE_ENV;

    this.envConfig = {
      ...(fs.existsSync(`.env.common`)
        ? dotenv.parse(fs.readFileSync('.env.common'))
        : {}),
      ...(fs.existsSync(`.env.${env}`)
        ? dotenv.parse(fs.readFileSync(`.env.${env}`))
        : {}),
      ...(fs.existsSync(`.env.${env}.local`)
        ? dotenv.parse(fs.readFileSync(`.env.${env}.local`))
        : {}),
      ...process.env,
    };
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}

export const configReader = new ConfigReader();
