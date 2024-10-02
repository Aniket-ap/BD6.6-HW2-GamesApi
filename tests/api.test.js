const request = require('supertest');
const { app } = require('../index');
const { getAllGames, getGameById } = require('../games');
const http = require('http');

jest.mock('../games', () => ({
  ...jest.requireActual('../games'),
  getAllGames: jest.fn(),
  getGameById: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe('Game API Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET /games should return all games with status 200', async () => {
    const mockGames = [
      {
        gameId: 1,
        title: 'The Legend of Zelda: Breath of the Wild',
        genre: 'Adventure',
        platform: 'Nintendo Switch',
      },
      {
        gameId: 2,
        title: 'Red Dead Redemption 2',
        genre: 'Action',
        platform: 'PlayStation 4',
      },
    ];
    getAllGames.mockReturnValue(mockGames);

    const response = await request(server).get('/games');
    expect(response.status).toBe(200);
    expect(response.body.games).toEqual(mockGames);
  });

  it('GET /games/details/:id should return a specific game by ID with status 200', async () => {
    const mockGame = {
      gameId: 1,
      title: 'The Legend of Zelda: Breath of the Wild',
      genre: 'Adventure',
      platform: 'Nintendo Switch',
    };
    getGameById.mockReturnValue(mockGame);

    const response = await request(server).get('/games/details/1');
    expect(response.status).toBe(200);
    expect(response.body.game).toEqual(mockGame);
  });

  it('GET /games should correctly invoke the getAllGames function', async () => {
    const mockGames = [
      {
        gameId: 1,
        title: 'The Legend of Zelda: Breath of the Wild',
        genre: 'Adventure',
        platform: 'Nintendo Switch',
      },
    ];
    getAllGames.mockReturnValue(mockGames);

    const response = await request(server).get('/games');
    expect(getAllGames).toHaveBeenCalled();
    expect(response.body.games).toEqual(mockGames);
  });
});
