import "../styles/sidebar.scss";

import { useCallback, useState } from "react";

import IGenre from "../dtos/GenreDTO";

import { Button } from "./Button";

interface SideBarProps {
  genres: IGenre[];
  onSelectedGenre(id: number): void;
}

export function SideBar(props: SideBarProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const handleClickButton = useCallback((id: number) => {
    setSelectedGenreId(id);
    props.onSelectedGenre(id);
  }, []);

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {props.genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
