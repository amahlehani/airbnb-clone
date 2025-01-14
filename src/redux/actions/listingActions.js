import axios from "axios";

export const fetchListings = () => async (dispatch) => {
    dispatch({ type: "FETCH_LISTINGS_REQUEST" });
    try {
        const response = await axios.get("http://localhost:5000/listings");
        dispatch({ type: "FETCH_LISTINGS_SUCCESS", payload: response.data });
    } catch (error) {
        dispatch({ type: "FETCH_LISTINGS_FAILURE", payload: error.message });
    }
};