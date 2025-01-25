import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Simulate user login
export const loginUser = createAsyncThunk(
    "user/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/users"); // Adjust URL if necessary
            const users = await response.json();

            const user = users.find(
                (u) => u.email === email
            );

            if (!user) {
                throw new Error("Invalid email or password");
            }

            // Here you can handle hashed passwords (using bcrypt or similar)
            if (user.password !== password) {
                throw new Error("Invalid email or password");
            }

            return user;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    user: null,
    isAuthenticated: false,
    error: null,
    welcomeMessage: ""
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.welcomeMessage = "";
        },
        registerSuccess(state, action) {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.welcomeMessage = `Welcome, ${action.payload.name}! Your account has been successfully created.`;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.welcomeMessage = `Welcome, ${action.payload.name}!`;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { logout, registerSuccess } = userSlice.actions;

export default userSlice.reducer;