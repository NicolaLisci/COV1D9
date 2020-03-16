export const environment = {
  production: true,
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
      baseUrl: 'https://coronavirus-19-api.herokuapp.com',
      endpoints: {
        all: '/all',
        countries: '/countries',
      }
    }
  }
};
