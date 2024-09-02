const db = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const reduceReviews = reduceProperties("review_id", {
  preferred_name: ["critic", null, "preferred_name"],
  surname: ["critic", null, "surname"],
  organization_name: ["critic", null, "organization_name"],
});

// DB Operations
async function destroy(reviewId) {
  return db("reviews")
    .where({ review_id: reviewId })
    .del();
}

async function list(movieId) {
  return db("reviews")
    .join(
      "critics",
      "reviews.critic_id",
      "critics.critic_id"
    )
    .join(
      "movies",
      "reviews.movie_id",
      "movies.movie_id"
    )
    .select("reviews.*", "critics.*", "movies.movie_id")
    .where({ "reviews.movie_id": movieId })
    .then(reduceReviews);
}

async function read(reviewId) {
  return db("reviews")
    .select("*")
    .where({ review_id: reviewId })
    .first();
}

async function readCritic(critic_id) {
  return db("critics").where({ critic_id }).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function update(review) {
  return db("reviews")
    .where({ review_id: review.review_id })
    .update(review, "*")
    .then(() => read(review.review_id))
    .then(setCritic);
}

// Exports
module.exports = {
  destroy,
  list,
  read,
  update,
};
