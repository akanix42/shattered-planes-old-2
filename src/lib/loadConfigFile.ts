import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import log from '../log';

const configDirectory = 'config';
export default function loadConfigFile<T>(relativePath: string) {
  try {
    const filePath = path.join(configDirectory, relativePath);
    const data = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
    return (data as any) as T;
  } catch (err) {
    log.error(err);
    throw err;
  }
}
