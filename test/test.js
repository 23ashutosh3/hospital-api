const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

chai.should();

chai.use(chaiHttp);

//register doctor can only register patient so first login  the doctor
describe('POST for patient register', () => {
  it("if it returns the newly created patient or not", (done) => {

    const newlyAddedPatient = {
      name: 'Sanu',
      phone: '9090909090',
      // 5f1f059abe501f11c80a8747
    };
    chai.request(app)
      .post('/doctors/login')
      .type("form")
      .send({
        email: "1@gmail.com",
        password: "1"
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object')
        res.body.should.have.property("message");

        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjFmMDUyZmJlNTAxZjExYzgwYTg3NDYiLCJuYW1lIjoiQSIsImVtYWlsIjoiMTFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxIiwiY3JlYXRlZEF0IjoiMjAyMC0wNy0yN1QxNjo0Nzo0My4wNjJaIiwidXBkYXRlZEF0IjoiMjAyMC0wNy0yN1QxNjo0Nzo0My4wNjJaIiwiX192IjowLCJpYXQiOjE1OTU4Njg1MDAsImV4cCI6MTU5NTg3ODUwMH0.Nh5tfssvWq4LWTZImI9rXsaKqRZqubOJtWM7ByF0xFU';
        chai.request(app)
          .post("/patients/register")
          // 5f1f052fbe501f11c80a8746
          .set("Authorization", "Bearer " + token)
          .type("form")
          .send(newlyAddedPatient)
          .end((err, res) => {
           
            res.should.have.status(200);
            res.body.should.be.a('object')
        
            done();
          });
      });
  });
});


describe('POST /:id/create_report',
() => 
{
  it("check it is newly generated report", (done) => {
    const Repo = {
  
      status: 'Negative'
    }
    chai.request(app)
      .post('/doctors/login')
      .type("form")
      .send({
        email: "1@gmail.com",
        password: "1"
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object')
        res.body.should.have.property("message");
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjFmMDUyZmJlNTAxZjExYzgwYTg3NDYiLCJuYW1lIjoiQSIsImVtYWlsIjoiMTFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxIiwiY3JlYXRlZEF0IjoiMjAyMC0wNy0yN1QxNjo0Nzo0My4wNjJaIiwidXBkYXRlZEF0IjoiMjAyMC0wNy0yN1QxNjo0Nzo0My4wNjJaIiwiX192IjowLCJpYXQiOjE1OTU4Njg1MDAsImV4cCI6MTU5NTg3ODUwMH0.Nh5tfssvWq4LWTZImI9rXsaKqRZqubOJtWM7ByF0xFU';
        let id = "5f1f059abe501f11c80a8747";
        
        chai.request(app)
          .post(`/patients/${id}/create_report`)
          .set('Authorization', 'Bearer ' + token)
          .type("form")
          .send(Repo)
          .end((err, res) => {
           
            res.should.have.status(200);
            res.body.should.have.property("message");
            res.body.should.be.a('object')
            res.body.report.should.have.property('status');
         
            done();
          });
      });
  });
});


describe("/GET patient reports", () => {
  it(" all reports of a patient wheter he/she is positive or negative or quarentine", (done) => {
    let id = "5f1f059abe501f11c80a8747";
    chai.request(app)
      .get(`/patients/${id}/all_reports`)
      .end((err, res) => {
        res.should.have.status(200);
        // res.body.report.should.have.property('status');
        // res.body.report.should.have.property('doctor');

        res.body.should.be.a('object');
        // res.body.report.should.have.property('reports');

        done();
      });
  });
});