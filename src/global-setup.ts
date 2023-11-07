import * as dotenv from 'dotenv';

export const BASE_URL = process.env.BASE_URL ?? '[NOT_SET]';
export const USER_EMAIL = process.env.USER_EMAIL ?? '[NOT_SET]';
export const USER_PASSWORD = process.env.USER_PASSWORD ?? '[NOT_SET]';

async function globalSetup(): Promise<void> {
  dotenv.config({ override: true });
}

export default globalSetup;
