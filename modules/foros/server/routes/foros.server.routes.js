'use strict';

/**
 * Module dependencies
 */
var forosPolicy = require('../policies/foros.server.policy'),
  foros = require('../controllers/foros.server.controller');

module.exports = function(app) {
  // Foros Routes
  app.route('/api/foros').all(forosPolicy.isAllowed)
    .get(foros.list)
    .post(foros.create);

  app.route('/api/comentarios/:foroId').all(forosPolicy.isAllowed)
    .get(foros.listComentarios)
    .post(foros.createComentario); 

  app.route('/api/foros/:foroId').all(forosPolicy.isAllowed)
    .get(foros.read)
    .put(foros.update)
    .delete(foros.delete);

  // Finish by binding the Foro middleware
  app.param('foroId', foros.foroByID);
};