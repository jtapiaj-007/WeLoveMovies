const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Validations
async function movieExists(request, response, next) {
  const { movieId } = request.params;
  const movie = await service.read(Number(movieId));

  if(movie) {
    response.locals.movie = movie;
    return next();
  }
  next({
    status: 404,
    message: `Movie cannot be found.`
  });
}

// HTTP Requests (APIs)
async function read(request, response) {
  response.json({ data: response.locals.movie });
}

async function list(request, response) {
  const { is_showing = false } = request.query;
  response.json({ data : await service.list(is_showing) });
}

// Exports
module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
};
