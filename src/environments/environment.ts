// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  paths: {
    italy: 'italy',
    world: 'world',
  },
  API: {
    italy: {
      baseUrl: 'https://covid19-it-api.herokuapp.com',
      endpoints: {
        daily: '/andamento',
        regioni: '/regioni',
        province: '/province',
        map: '/map',
      }
    },
    world: {
      baseUrl: 'https://covid19.mathdro.id/api',
      endpoints: {
        all: '',
        countries: '/confirmed',
      }
    }
  }
};
