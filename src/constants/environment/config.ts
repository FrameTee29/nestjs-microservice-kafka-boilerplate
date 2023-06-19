export interface NestConfig {
  NODE_ENV: string | undefined;
  PORT: number;
}

export interface DatabaseConfig {
  POSTGRES_HOST: string | undefined;
  POSTGRES_PORT: number;
  POSTGRES_USER: string | undefined;
  POSTGRES_PASSWORD: string | undefined;
  POSTGRES_DATABASE: string | undefined;
}

export interface KafkaConfig {
  BROKER_KAFKA_1: string | undefined;
  BROKER_KAFKA_2: string | undefined;
  BROKER_KAFKA_3: string | undefined;
}

export interface Config {
  nest: NestConfig;
  database: any;
  kafka: KafkaConfig;
  winstonTransportCombine: WinstonConfigTransports;
  winstonTransportError: WinstonConfigTransports;
}

export interface WinstonConfigTransports {
  filename: string | undefined;
  datePattern: string | undefined;
  zippedArchive: boolean | undefined;
  maxFiles: string | undefined;
  level?: string | undefined;
}

const configuration = (): Config => ({
  nest: {
    NODE_ENV: process.env.NODE_ENV,
    PORT: Number(process.env.PORT || 3000),
  },
  database: {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || '1234',
    database: process.env.POSTGRES_DATABASE || 'postgres',
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*.js'],
    synchronize: process.env.SYNCHRONIZE === 'true' ? true : false,
    logging: true,
  },
  kafka: {
    BROKER_KAFKA_1: process.env.BROKER_KAFKA_1,
    BROKER_KAFKA_2: process.env.BROKER_KAFKA_2,
    BROKER_KAFKA_3: process.env.BROKER_KAFKA_3,
  },
  winstonTransportCombine: {
    filename: process.env.WINTON_FILENAME_COMBINE,
    datePattern: process.env.DATE_PATTERN,
    zippedArchive: false,
    maxFiles: process.env.MAX_FILES_EXPIRES,
  },
  winstonTransportError: {
    filename: process.env.WINTON_FILENAME_ERROR,
    level: 'error',
    datePattern: process.env.DATE_PATTERN,
    zippedArchive: false,
    maxFiles: process.env.MAX_FILES_EXPIRES,
  },
});

export default configuration;
