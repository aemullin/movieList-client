export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET-USER';

export function setMovies(value) {
    return { type: SET_MOVIES, value};
}

export function setFilter(value) {
    return { type: SET-FILTER, value};
}

export function setUser(value) {
    return { type: SET_USER, value};
}