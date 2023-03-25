import { useState, useEffect } from 'react';
import { useSearchParams} from 'react-router-dom';
import { getMovieByName } from 'services/fetchMovies';
import { SearchBox } from 'components/SearchBox/SearchBox';
import { MoviesList } from 'components/MoviesList/MoviesList';


export const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const query = searchParams.get('query') ?? '';

        if (!query) {
            return;
        }

        getMovieByName(query).then(setMovies);
    }, [searchParams]);

    const handleCange = e => {
        setQuery(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        setSearchParams(query !== '' ? { query } : {});
    };

    return (
        <>
            <SearchBox onSubmit={handleSubmit} onChange={handleCange} />
            <MoviesList movies={movies} />
        </>
    );
};