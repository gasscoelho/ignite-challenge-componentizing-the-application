import "../styles/content.scss";

import IMovie from "../dtos/MovieDTO";

import { MovieCard } from "./MovieCard";
import { Header } from "./Header";

interface ContentProps {
  movies: IMovie[];
  headerTitle: string;
}

export function Content(props: ContentProps) {
  return (
    <div className="container">
      <Header title={props.headerTitle} />

      <main>
        <div className="movies-list">
          {props.movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
