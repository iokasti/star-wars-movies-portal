import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { fetchMovies, fetchPostersAndRatings } from "../src/utils/api";

const SW_API_URL = "https://swapi.dev/api/films/?format=json";
const OMD_API_URL = "http://www.omdbapi.com/?apikey=23216786&";

describe("API utility functions", () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  it("fetchMovies successfully fetches movies", async () => {
    const mockData = {
      results: [
        { title: "A New Hope", episode_id: 4 },
        { title: "The Empire Strikes Back", episode_id: 5 },
      ],
    };

    mock.onGet(SW_API_URL).reply(200, mockData);

    const movies = await fetchMovies();
    expect(movies).toEqual(mockData.results);
  });

  it("fetchPostersAndRatings successfully fetches movie details", async () => {
    const title = "A New Hope";
    const year = "1977";
    const mockData = {
      Title: "A New Hope",
      Year: "1977",
      imdbID: "tt0076759",
      Poster:
        "https://en.wikipedia.org/wiki/Star_Wars_(film)#/media/File:StarWarsMoviePoster1977.jpg",
      Ratings: [
        { Source: "Internet Movie Database", Value: "8.6/10" },
        { Source: "Rotten Tomatoes", Value: "92%" },
      ],
      Response: "True",
    };

    mock.onGet(OMD_API_URL, { params: { t: title, y: year } }).reply(200, mockData);

    const movieDetails = await fetchPostersAndRatings(title, year);
    expect(movieDetails).toEqual(mockData);
  });

  it("fetchPostersAndRatings handles error response", async () => {
    const title = "Twilight";
    const year = "2008";
    const mockError = {
      Response: "False",
      Error: "Movie not found!",
    };

    mock.onGet(OMD_API_URL, { params: { t: title, y: year } }).reply(200, mockError);

    await expect(fetchPostersAndRatings(title, year)).rejects.toThrow("Movie not found!");
  });
});
``;
