import "./styles/global.scss";

import { useCallback, useEffect, useState } from "react";

import { api } from "./services/api";

import IGenre from "./dtos/GenreDTO";
import IMovie from "./dtos/MovieDTO";

import { SideBar } from "./components/SideBar";
import { Content } from "./components/Content";

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<IGenre>({} as IGenre);

  function fetchGenres() {
    api.get<IGenre[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }

  function fetchMoviesByGenre(genreId: number) {
    api.get<IMovie[]>(`movies/?Genre_id=${genreId}`).then((response) => {
      setMovies(response.data);
    });
  }

  function refreshSelectedGenre(id: number) {
    api.get<IGenre>(`genres/${id}`).then((response) => {
      setSelectedGenre(response.data);
    });
  }

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchMoviesByGenre(selectedGenreId);
    refreshSelectedGenre(selectedGenreId);
  }, [selectedGenreId]);

  const handleSelectedGenre = useCallback((id) => {
    setSelectedGenreId(id);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar genres={genres} onSelectedGenre={handleSelectedGenre} />
      <Content movies={movies} headerTitle={selectedGenre.title} />
    </div>
  );
}
