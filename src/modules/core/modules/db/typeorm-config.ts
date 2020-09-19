import { ConnectionOptions } from 'typeorm';
import { configReader } from '../../../config/utils/config-reader';

// Check typeORM documentation for more information.

const config: ConnectionOptions = {
  type: 'postgres',
  host: configReader.get('POSTGRES_HOST'),
  port: 5432,
  username: configReader.get('POSTGRES_USERNAME'),
  password: configReader.get('POSTGRES_PASSWORD'),
  database: configReader.get('POSTGRES_DATABASE'),
  entities: [__dirname + '/**/*.entity{.ts,.js}'],

  // We are using migrations, synchronize should be set to false.
  synchronize: false,

  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: false,
  logging: true,
  logger: 'file',

  // Allow both start:prod and start:local to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev.
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: 'src/modules/core/modules/db/migrations',
  },
};

export = config;
