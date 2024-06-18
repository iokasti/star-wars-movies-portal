import React from 'react';
import { GridColumn, Search, Grid } from 'semantic-ui-react';
import _ from 'lodash';
import PropTypes from "prop-types";

const initialState = {
    loading: false,
    value: '',
};

function searchReducer(state, action) {
    switch (action.type) {
        case 'CLEAN_QUERY':
            return initialState;
        case 'START_SEARCH':
            return { ...state, loading: true, value: action.query };
        case 'FINISH_SEARCH':
            return { ...state, loading: false };
        case 'UPDATE_SELECTION':
            return { ...state, value: action.selection };
        default:
            throw new Error();
    }
}

const SearchBar = ({ movies , onResultsUpdate}) => {
    const [state, dispatch] = React.useReducer(searchReducer, initialState);
    const { value } = state;
    const timeoutRef = React.useRef();
    const handleSearchChange = React.useCallback(
        (e, data) => {
            clearTimeout(timeoutRef.current);
            dispatch({ type: 'START_SEARCH', query: data.value });

            timeoutRef.current = setTimeout(() => {
                if (data.value.length === 0) {
                    dispatch({ type: 'CLEAN_QUERY' });
                    onResultsUpdate(movies); // Notify parent in order to display all the initially fetched movies
                    return;
                }

                const re = new RegExp(_.escapeRegExp(data.value), 'i');
                const isMatch = (result) => re.test(result.title);

                const filteredResults = _.filter(movies, isMatch);
                dispatch({
                    type: 'FINISH_SEARCH',
                });
                onResultsUpdate(filteredResults); // Notify parent with the search results
            }, 300);
        },
        [movies, onResultsUpdate]
    );

    React.useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <Grid>
            <GridColumn width={6}>
                <Search
                    placeholder='Search...'
                    onSearchChange={handleSearchChange}
                    value={value}
                    showNoResults={false} // Hide dropdown
                />
            </GridColumn>
        </Grid>
    );
};

SearchBar.propTypes = {
    movies: PropTypes.arrayOf(
        PropTypes.shape({
            episode_id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            averageRating: PropTypes.number.isRequired,
            release_date: PropTypes.string.isRequired,
        })
    ).isRequired,
    onResultsUpdate: PropTypes.func.isRequired,
};


export default SearchBar;
