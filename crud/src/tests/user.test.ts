import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../index'

chai.use(chaiHttp)
const expect = chai.expect

describe('GET /api/v1/products', () => {
  it('should return array of products on GET /', (done) => {
    chai
      .request(app)
      .get('/api/v1/products')
      .end((err, res) => {
        expect(res).to.have.status(200)

        chai.expect(res.body.data).to.be.an('array')

        res.body.data.forEach((item: any) => {
          chai.expect(item).to.be.an('object')
          chai.expect(item).to.have.property('_id').that.is.a('string')
          chai.expect(item).to.have.property('title').that.is.a('string')
          chai.expect(item).to.have.property('qty').that.is.a('number')
          chai.expect(item).to.have.property('__v').that.is.a('number')
        })
        done()
      })
  })
})

describe('POST /api/v1/products', () => {
  it('should create a new product and return success message with data', (done) => {
    const requestBody = {
      title: 'ini title',
      qty: 1
    }

    chai
      .request(app)
      .post('/api/v1/products')
      .send(requestBody)
      .end((err, res) => {
        chai.expect(err).to.be.null
        chai.expect(res).to.have.status(201)
        chai.expect(res).to.be.json

        // Assert specific types for the properties
        chai.expect(res.body.message).to.be.a('string')
        chai.expect(res.body.data.title).to.be.a('string')
        chai.expect(res.body.data.qty).to.be.a('number')
        chai.expect(res.body.data._id).to.be.a('string')
        chai.expect(res.body.data.__v).to.be.a('number')

        done()
      })
  })
})

describe('GET /api/v1/products/:id', () => {
  let createdProductId: string

  // Run the POST request to create a product before running the GET request
  before((done) => {
    const requestBody = {
      title: 'ini title',
      qty: 1
    }

    chai
      .request(app)
      .post('/api/v1/products')
      .send(requestBody)
      .end((err, res) => {
        chai.expect(err).to.be.null
        chai.expect(res).to.have.status(201)
        chai.expect(res).to.be.json

        // Store the created product ID for later use
        createdProductId = res.body.data._id

        done()
      })
  })

  it('should get a product by ID and return success message with data', (done) => {
    chai
      .request(app)
      .get(`/api/v1/products/${createdProductId}`)
      .end((err, res) => {
        chai.expect(err).to.be.null
        chai.expect(res).to.have.status(200)
        chai.expect(res).to.be.json

        chai.expect(res.body.message).to.be.a('string')
        chai.expect(res.body.data.title).to.be.a('string')
        chai.expect(res.body.data.qty).to.be.a('number')
        chai.expect(res.body.data._id).to.be.a('string')
        chai.expect(res.body.data.__v).to.be.a('number')

        done()
      })
  })
})

describe('PATCH /api/v1/products/:id', () => {
  let createdProductId: string

  // Run the POST request to create a product before updating
  before((done) => {
    const postRequestBody = {
      title: 'ini title',
      qty: 1
    }

    chai
      .request(app)
      .post('/api/v1/products')
      .send(postRequestBody)
      .end((postErr, postRes) => {
        chai.expect(postErr).to.be.null
        chai.expect(postRes).to.have.status(201)
        chai.expect(postRes).to.be.json

        // Store the created product ID for later use
        createdProductId = postRes.body.data._id

        done()
      })
  })

  it('should update a product by ID using PATCH and return success message with data', (done) => {
    const patchRequestBody = {
      title: 'updated title',
      qty: 2
    }

    chai
      .request(app)
      .patch(`/api/v1/products/${createdProductId}`)
      .send(patchRequestBody)
      .end((patchErr, patchRes) => {
        chai.expect(patchErr).to.be.null
        chai.expect(patchRes).to.have.status(200)
        chai.expect(patchRes).to.be.json

        chai.expect(patchRes.body).to.deep.equal({
          message: 'success',
          data: {
            _id: createdProductId,
            title: 'updated title',
            qty: 2,
            __v: 0
          }
        })

        done()
      })
  })
})

describe('DELETE /api/v1/products/:id', () => {
  let createdProductId: string

  // Run the POST request to create a product before deleting
  before((done) => {
    const postRequestBody = {
      title: 'ini title',
      qty: 1
    }

    chai
      .request(app)
      .post('/api/v1/products')
      .send(postRequestBody)
      .end((postErr, postRes) => {
        chai.expect(postErr).to.be.null
        chai.expect(postRes).to.have.status(201)
        chai.expect(postRes).to.be.json

        // Store the created product ID for later use
        createdProductId = postRes.body.data._id

        done()
      })
  })

  it('should delete a product by ID and return status 204', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/products/${createdProductId}`)
      .end((deleteErr, deleteRes) => {
        chai.expect(deleteErr).to.be.null
        chai.expect(deleteRes).to.have.status(204)

        done()
      })
  })
})

describe('Update, Find, and Delete by ID with Non-Existent ID', () => {
  const nonExistentId = '6568b93d42fa4f6815d1f0b2'

  it('should return status code 400 for updating with a non-existent ID', (done) => {
    const updateRequestBody = {
      title: 'updated title',
      qty: 2
    }

    chai
      .request(app)
      .patch(`/api/v1/products/${nonExistentId}`)
      .send(updateRequestBody)
      .end((updateErr, updateRes) => {
        chai.expect(updateRes).to.have.status(400)

        done()
      })
  })

  it('should return status code 400 for finding with a non-existent ID', (done) => {
    chai
      .request(app)
      .get(`/api/v1/products/${nonExistentId}`)
      .end((findErr, findRes) => {
        console.log(findErr)
        chai.expect(findRes).to.have.status(400)

        done()
      })
  })

  it('should return status code 400 for deleting with a non-existent ID', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/products/${nonExistentId}`)
      .end((deleteErr, deleteRes) => {
        chai.expect(deleteRes).to.have.status(400)

        done()
      })
  })
})
