import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    mongodbHost: process.env.MONGODB_HOST,
    appPort: process.env.APP_PORT,
    pokeApi: process.env.POKE_API,
    jwtToken: process.env.JWT_TOKEN,
  };
});
