import * as data from "./data";

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.

let { authors, games, reviews } = data;

const genRand = () => Math.floor(Math.random() * 1000000);

export const resolvers = {
  Query: {
    games: () => games,
    authors: () => authors,
    reviews: () => reviews,
    review: (_, args) => {
      return reviews.find(({ id }) => id == args.id);
    },
    author: (_, args) => {
      return authors.find(({ id }) => id == args.id);
    },
    game: (_, args) => {
      return games.find(({ id }) => id == args.id);
    },
  },
  Game: {
    reviews: (parent) => {
      return reviews.filter(({ game_id }) => game_id === parent.id);
    },
  },
  Author: {
    reviews: (parent) => {
      return reviews.filter(({ game_id }) => game_id === parent.id);
    },
  },
  Review: {
    game: (parent) => {
      return games.find(({ id }) => id === parent.game_id);
    },
    author: (parent) => {
      return authors.find(({ id }) => id === parent.author_id);
    },
  },
  Mutation: {
    addGame: (_, args) => {
      const game = { ...args.game, id: genRand() };
      games.push(game);
      return game;
    },
    deleteGame: (_, args) => {
      games = games.filter(({ id }) => id != args.id);
      return games;
    },
    updateGame: (_, args) => {
      games = games.map((game) => {
        if (game.id === args.id) {
          return { ...game, ...args.edits };
        }

        return game;
      });

      return games.find(({ id }) => id === args.id);
    },
  },
};
