const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../app')

describe('Play store ....', () => {
    it('App returns an array of objects', () => {
        return supertest(app)
          .get('/apps')
          .expect(200)
          .expect('Content-Type', /json/)
          .then(res => {
              expect(res.body).to.be.an('array')
              expect(res.body[0]).to.include.all.keys(
                  'App', 'Rating', 
              )
          })
    })
    it('App returns status coode 400 if query param is not rating or app', () =>{
      return supertest(app)
          .get('/apps')
          .query({sort: 'something'})
          .expect(400, { message: 'sort must be either Rating or App' })
    })
    it(`should show rating's above target rating`, () => {
      let curRating = 6
      

      return supertest(app)
        .get('/apps')
        .query({sort: "Rating"})
        .then( res => {
          let sortedRank = res.body.sort((a,b) => {
            return a.Rating - b.Rating
          })
          expect(res.body).to.eql(sortedRank)
          
        })

    })
    it('If genre does not not exisit return 400 and you suck', () =>{
      return supertest(app)
      .get('/apps')
      .query({genres : 'Actionerjsrgoipheruiopgh'})
      .expect(400, { message: `this genre doesn't exist yet, dummy.` })
      
    })
})