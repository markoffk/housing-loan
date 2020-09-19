import { Injectable } from '@nestjs/common';

import { configReader } from '../utils/config-reader';

@Injectable()
export class ConfigService {
  get(key: string): string {
    return configReader.get(key);
  }
}
