import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../index'

chai.use(chaiHttp)
describe('Not Found URL Test', () => {
  it('should return a 404 and message string', (done) => {
    chai
      .request(app)
      .get('/nonexistent-url') // Replace with a URL that does not exist in your application
      .end((err, res) => {
        chai.expect(err).to.be.null
        chai.expect(res).to.have.status(404)
        chai.expect(res).to.be.json

        chai.expect(res.body.message).to.be.a('string')

        done()
      })
  })
})
