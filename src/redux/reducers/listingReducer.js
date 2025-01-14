const initialState = {
    listings: [],
    loading: false,
    error: null,
};

const listingReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_LISTINGS_REQUEST":
            return { ...state, loading: true };
        case "FETCH_LISTINGS_SUCCESS":
            return { ...state, loading: false, listings: action.payload };
        case "FETCH_LISTINGS_FAILURE":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default listingReducer;