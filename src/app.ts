import IHashMap from './lib/IHashMap';

const app: IHashMap<any> = {};
export default app;
(globalThis as any).app = app;
