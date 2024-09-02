const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// HTTP Requests (APIs)
async function list(request, response) {
  const { movieId } = request.params;

  if(typeof movieId == 'undefined') {
    response.json({ data : await service.list() });
  }
  else {
    response.json({ data : await service.listByMovie(movieId) });
  }
}

// Exports
module.exports = {
  list: asyncErrorBoundary(list),
};
