import { IRace } from '../models/raceModel'
import { appTest } from './index'
let raceId: string

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
    const response = await appTest
      .get('/api/races')
      .query({ limit: 5, page: 1 })
    console.log(response.error)
    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
    // Additional checks depending on your data structure, e.g.,
    // expect(response.body).toHaveLength(5);
  }, 20000)

  //it('GET /api/races/:raceId - should retrieve a race by ID', async () => {
  //  const response = await request(app).get(`/api/races/${raceId}`)
  //  expect(response.statusCode).toBe(200)
  //  expect(response.body).toHaveProperty('id', raceId)
  //})

  //it('PUT /api/races/:raceId - should update a race by ID', async () => {
  //  const updatedRace = { name: 'Updated Race', location: 'Updated Location' }
  //  const response = await request(app)
  //    .put(`/api/races/${raceId}`)
  //    .send(updatedRace)
  //  expect(response.statusCode).toBe(200)
  //  expect(response.body).toMatchObject(updatedRace)
  //})

  //it('DELETE /api/races/:raceId - should delete a race by ID', async () => {

  //  const response = await request(app).delete(`/api/races/${raceId}`)
  //  expect(response.statusCode).toBe(200)
  //  expect(response.body).toMatchObject({
  //    message: 'Race deleted successfully',
  //    id: raceId
  //  })
  //})
})
