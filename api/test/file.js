const chai = require('chai')
const chaiHttp = require('chai-http')
const chaiLike = require('chai-like')
const server = require('../index')


chai.should()
chai.use(chaiLike)
chai.use(chaiHttp)

describe('Files API', () => {
    /** 
     * TEST /files/data
    */
    describe("GET /files/data", () => {
        it("It must get the files with the specified structure", function (done) {
            this.timeout(5000);
            chai.request(server).get('/files/data').end((error, response) => {
                response.should.have.status(200)
                response.body.should.be.a('array')
                response.body.should.be.a('array')
                response.body[0].should.deep.have.property('file','test1.csv')
                response.body[0].should.deep.have.property('lines')
                done()
            })
        })
    })
})