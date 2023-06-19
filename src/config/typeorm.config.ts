import configuration from '@constants/environment/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const typeOrmOptions: DataSourceOptions = configuration().database;

const typeOrmSource = new DataSource(typeOrmOptions);
export default typeOrmSource;
