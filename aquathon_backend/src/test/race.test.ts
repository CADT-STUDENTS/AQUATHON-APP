import request from 'supertest'
import { IRace, Race } from '../models/raceModel'
import app from '../app'
import { initializeDB } from '../configs/db'
let raceId: string

beforeAll(async () => {
  await initializeDB()
})
afterAll(async () => {
  await Race.deleteMany({}, null)
})
const newRace: IRace = {
  title: 'testing',
  date: new Date(),
  startTime: null,
  swimDistance: 10,
  runDistance: 10,
  colours: [],
  segments: [
    {
      type: 'swimming',
      totalCompleted: 0
    }
  ],
  status: 'upcoming'
}
describe('Race API test suite', () => {
  test('GET /api/races - should retrieve a list of races', async () => {
    const response = await request(app)
      .get('/api/races')
      .query({ limit: 5, page: 1 })
    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
    // Additional checks depending on your data structure, e.g.,
    // expect(response.body).toHaveLength(5);
  }, 20000)
  let tmp_race: IRace | null
  it('POST /api/races - should create a race', async () => {
    const response = await request(app).post(`/api/races`).send(newRace)
    expect(response.statusCode).toBe(200)
    raceId = response.body._id
    tmp_race = response.body
  })

  it('GET /api/races/:raceId - should retrieve a race by ID', async () => {
    const response = await request(app).get(`/api/races/${raceId}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('_id', raceId)
  })

  it('PUT /api/races/:raceId - should update a race by ID', async () => {
    const updatedRace: IRace = {
      title: 'testing1',
      date: new Date(),
      startTime: new Date(),
      swimDistance: 100,
      runDistance: 100,
      colours: [],
      segments: [
        {
          type: 'swimming',
          totalCompleted: 0
        }
      ],
      status: 'upcoming'
    }

    const response = await request(app)
      .put(`/api/races/${raceId}`)
      .send(updatedRace)
    expect(response.statusCode).toBe(200)
  })

  it('DELETE /api/races/:raceId - should delete a race by ID', async () => {
    const response = await request(app).delete(`/api/races/${raceId}`)
    expect(response.statusCode).toBe(200)
    //expect(response.body).toMatchObject({
    //  message: 'Race deleted successfully'
    //})
  })
})
