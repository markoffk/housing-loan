import { BootstrapConsole } from 'nestjs-console';

import { ConsoleAppModule } from './console-app.module';

const bootstrap = new BootstrapConsole({
  module: ConsoleAppModule,
  useDecorators: true,
});
bootstrap.init().then(async (app) => {
  try {
    // init your app
    await app.init();
    // boot the cli
    await bootstrap.boot();
    process.exit(0);
  } catch (e) {
    process.exit(1);
  }
});
