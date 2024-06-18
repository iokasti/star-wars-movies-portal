import { render, screen } from "@testing-library/react";
import { describe } from "vitest";
import MovieDetails from "../src/components/MovieDetails";

const movie = {
  Title: "Star Wars: A New Hope",
  Poster: "https://en.wikipedia.org/wiki/Star_Wars_(film)#/media/File:StarWarsMoviePoster1977.jpg",
  opening_crawl: "A long time ago in a galaxy far, far away...",
  director: "George Lucas",
  averageRating: 8.5,
  Ratings: [
    { Source: "Internet Movie Database", Value: "8.6/10" },
    { Source: "Rotten Tomatoes", Value: "92%" },
  ],
};

describe("MovieDetails", () => {
  it("renders movie details correctly", () => {
    render(
      <MovieDetails
        movie={movie}
        movieDetailsList={[
          "Poster",
          "opening_crawl",
          "director",
          "averageRating",
          "Ratings",
        ]}
      />
    );

    expect(screen.getByText(/Star Wars: A New Hope/i)).toBeInTheDocument();
    expect(
      screen.getByAltText(/Star Wars: A New Hope poster/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/A long time ago in a galaxy far, far away.../i)
    ).toBeInTheDocument();

    expect(screen.getByText(/Average rating:/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Internet Movie Database: 8.6\/10/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Rotten Tomatoes: 92%/i)).toBeInTheDocument();
  });
});
