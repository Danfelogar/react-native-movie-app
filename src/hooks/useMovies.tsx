import { useEffect, useState } from 'react';

import movieDB from '../api/movieDB';
import { Movie, MovieDBMovieResponse } from '../interfaces/movieInterfaces';

interface MoviesState {
    nowPlaying: Movie[];
    popular: Movie[];
    topRated: Movie[];
    upcoming: Movie[];
}

export const useMovies = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [moviesState,setMoviesState ] = useState<MoviesState>({
        nowPlaying: [],
        popular: [],
        topRated: [],
        upcoming: [],
    });

    const getMovies =async () => {

        const nowPlayingPromise = movieDB.get<MovieDBMovieResponse>('/now_playing');
        const popularPromise = movieDB.get<MovieDBMovieResponse>('/popular');
        const topRatedPromise = movieDB.get<MovieDBMovieResponse>('/top_rated');
        const upcomingPromise = movieDB.get<MovieDBMovieResponse>('/upcoming');

        const resp = await Promise.all([
            nowPlayingPromise,
            popularPromise,
            topRatedPromise,
            upcomingPromise
        ]);

        setMoviesState({
            nowPlaying: resp[0].data.results,
            popular: resp[1].data.results,
            topRated: resp[2].data.results,
            upcoming: resp[3].data.results
        });

        setIsLoading(false);
    }

    useEffect(() => {
        // Now_playing
        getMovies();
    }, []);

    return{
        //con esto tendremos las propiedades mas facilmente...supuestamente es uan desestructuracion
        ...moviesState,
        isLoading
    }
};
