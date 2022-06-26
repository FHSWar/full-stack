import { env } from 'process';

export const DEV = 'development';
export const PRD = 'production';
export const TEST = 'test';

export const isDev = env.NODE_ENV === DEV;
export const isPrd = env.NODE_ENV === PRD;
export const isTest = env.NODE_ENV === TEST;

export const logTarget = 'public/static/log';