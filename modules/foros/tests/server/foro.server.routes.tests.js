'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Foro = mongoose.model('Foro'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  foro;

/**
 * Foro routes tests
 */
describe('Foro CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Foro
    user.save(function () {
      foro = {
        name: 'Foro name'
      };

      done();
    });
  });

  it('should be able to save a Foro if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Foro
        agent.post('/api/foros')
          .send(foro)
          .expect(200)
          .end(function (foroSaveErr, foroSaveRes) {
            // Handle Foro save error
            if (foroSaveErr) {
              return done(foroSaveErr);
            }

            // Get a list of Foros
            agent.get('/api/foros')
              .end(function (forosGetErr, forosGetRes) {
                // Handle Foros save error
                if (forosGetErr) {
                  return done(forosGetErr);
                }

                // Get Foros list
                var foros = forosGetRes.body;

                // Set assertions
                (foros[0].user._id).should.equal(userId);
                (foros[0].name).should.match('Foro name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Foro if not logged in', function (done) {
    agent.post('/api/foros')
      .send(foro)
      .expect(403)
      .end(function (foroSaveErr, foroSaveRes) {
        // Call the assertion callback
        done(foroSaveErr);
      });
  });

  it('should not be able to save an Foro if no name is provided', function (done) {
    // Invalidate name field
    foro.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Foro
        agent.post('/api/foros')
          .send(foro)
          .expect(400)
          .end(function (foroSaveErr, foroSaveRes) {
            // Set message assertion
            (foroSaveRes.body.message).should.match('Please fill Foro name');

            // Handle Foro save error
            done(foroSaveErr);
          });
      });
  });

  it('should be able to update an Foro if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Foro
        agent.post('/api/foros')
          .send(foro)
          .expect(200)
          .end(function (foroSaveErr, foroSaveRes) {
            // Handle Foro save error
            if (foroSaveErr) {
              return done(foroSaveErr);
            }

            // Update Foro name
            foro.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Foro
            agent.put('/api/foros/' + foroSaveRes.body._id)
              .send(foro)
              .expect(200)
              .end(function (foroUpdateErr, foroUpdateRes) {
                // Handle Foro update error
                if (foroUpdateErr) {
                  return done(foroUpdateErr);
                }

                // Set assertions
                (foroUpdateRes.body._id).should.equal(foroSaveRes.body._id);
                (foroUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Foros if not signed in', function (done) {
    // Create new Foro model instance
    var foroObj = new Foro(foro);

    // Save the foro
    foroObj.save(function () {
      // Request Foros
      request(app).get('/api/foros')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Foro if not signed in', function (done) {
    // Create new Foro model instance
    var foroObj = new Foro(foro);

    // Save the Foro
    foroObj.save(function () {
      request(app).get('/api/foros/' + foroObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', foro.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Foro with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/foros/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Foro is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Foro which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Foro
    request(app).get('/api/foros/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Foro with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Foro if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Foro
        agent.post('/api/foros')
          .send(foro)
          .expect(200)
          .end(function (foroSaveErr, foroSaveRes) {
            // Handle Foro save error
            if (foroSaveErr) {
              return done(foroSaveErr);
            }

            // Delete an existing Foro
            agent.delete('/api/foros/' + foroSaveRes.body._id)
              .send(foro)
              .expect(200)
              .end(function (foroDeleteErr, foroDeleteRes) {
                // Handle foro error error
                if (foroDeleteErr) {
                  return done(foroDeleteErr);
                }

                // Set assertions
                (foroDeleteRes.body._id).should.equal(foroSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Foro if not signed in', function (done) {
    // Set Foro user
    foro.user = user;

    // Create new Foro model instance
    var foroObj = new Foro(foro);

    // Save the Foro
    foroObj.save(function () {
      // Try deleting Foro
      request(app).delete('/api/foros/' + foroObj._id)
        .expect(403)
        .end(function (foroDeleteErr, foroDeleteRes) {
          // Set message assertion
          (foroDeleteRes.body.message).should.match('User is not authorized');

          // Handle Foro error error
          done(foroDeleteErr);
        });

    });
  });

  it('should be able to get a single Foro that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Foro
          agent.post('/api/foros')
            .send(foro)
            .expect(200)
            .end(function (foroSaveErr, foroSaveRes) {
              // Handle Foro save error
              if (foroSaveErr) {
                return done(foroSaveErr);
              }

              // Set assertions on new Foro
              (foroSaveRes.body.name).should.equal(foro.name);
              should.exist(foroSaveRes.body.user);
              should.equal(foroSaveRes.body.user._id, orphanId);

              // force the Foro to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Foro
                    agent.get('/api/foros/' + foroSaveRes.body._id)
                      .expect(200)
                      .end(function (foroInfoErr, foroInfoRes) {
                        // Handle Foro error
                        if (foroInfoErr) {
                          return done(foroInfoErr);
                        }

                        // Set assertions
                        (foroInfoRes.body._id).should.equal(foroSaveRes.body._id);
                        (foroInfoRes.body.name).should.equal(foro.name);
                        should.equal(foroInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Foro.remove().exec(done);
    });
  });
});
