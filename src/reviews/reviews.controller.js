const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const methodNotAllowed = require("../errors/methodNotAllowed");

// Validations
async function reviewExists(request, response, next) {
  const { reviewId } = request.params;
  const review = await service.read(reviewId);

  if(review) {
    response.locals.review = review;
    return next();
  }
  next({
    status: 404,
    message: `Review cannot be found.`
  });
}

function hasMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return next();
  }
  methodNotAllowed(request, response, next);
}

function noMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return methodNotAllowed(request, response, next);
  }
  next();
}

// HTTP Requests (APIs)
async function destroy(request, response) {
  await service.destroy(response.locals.review.review_id);
  response.sendStatus(204);
}

async function list(request, response) {
  const { movieId } = request.params;
  const results = await service.list(movieId);

  // Format `critic` as single object rather than an array of objects i.e. this is the default value when using reduceProperties()
  results.forEach(review => {
    review.critic = review.critic[0];
  });
  response.json({ data : results });
}

async function update(request, response) {

  const updatedReview = {
    ...response.locals.review,
    ...request.body.data,
    review_id: response.locals.review.review_id,
  };
  response.status(201).json({ data : await service.update(updatedReview) });
}

// Exports
module.exports = {
  destroy: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(destroy),
  ],
  list: [hasMovieIdInPath, asyncErrorBoundary(list)],
  update: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(update),
  ],
};
