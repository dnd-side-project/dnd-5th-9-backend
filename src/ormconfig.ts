import config from './config';
import { ConnectionOptions } from 'typeorm';

const connectionOptions: ConnectionOptions = {
    type: config.db.type as any,
    host: config.db.host,
    port: config.db.port as any,
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    synchronize: true,
    entities: [__dirname + '/entity/*.{ts,js}'],
    extra: { charset: 'utf8mb4_unicode_ci' },
};

export default connectionOptions;
