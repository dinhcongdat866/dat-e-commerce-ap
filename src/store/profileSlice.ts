import { ProfileAddress } from "@/models/ProfileAddress";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Profile {
    id: number;
    name: string;
    email: string;
    phone: string;
    addresses: ProfileAddress[];
    image: string;
}

const fetchProfile = async (): Promise<Profile> => {
    return new Promise<Profile>((resolve) => {
        setTimeout(() => {
            resolve({
                id: 1,
                name: "John Doe",
                email: "john.doe@example.com",
                phone: "1234567890",
                addresses: [
                    {
                        id: 1,
                        type: "Home",
                        address: "123 Main St, Apt 4B",
                        city: "New York",
                        state: "NY",
                        zip: "10001",
                    },
                    {
                        id: 2,
                        type: "Office",
                        address: "456 Business Ave",
                        city: "New York",
                        state: "NY",
                        zip: "10002",
                    }
                ],
                image: ""
            });
        }, 1000);
    });
}

const updateAddress = async (address: ProfileAddress): Promise<ProfileAddress> => {
    return new Promise<ProfileAddress>((resolve) => {
        setTimeout(() => {
            resolve(address);
        }, 1000);
    });
}

const postUpdateProfile = async (profile: Profile): Promise<Profile> => {
    return new Promise<Profile>((resolve) => {
        setTimeout(() => {
            resolve(profile);
        }, 1000);
    });
}

export const updateProfile = createAsyncThunk('profile/updateProfile', async (profile: Profile) => {
    const response = await postUpdateProfile(profile);
    return response;
});

export const getProfile = createAsyncThunk('profile/fetchProfile', async () => {
    const response = await fetchProfile();
    return response;
});

export const updateProfileAddress = createAsyncThunk('profile/updateProfileAddress', async (address: ProfileAddress) => {
    const response = await updateAddress(address);
    return response;
});

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profile: null as Profile | null,
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProfile.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = action.payload;
        });
        builder.addCase(getProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });

        builder.addCase(updateProfileAddress.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateProfileAddress.fulfilled, (state, action) => {
            state.loading = false;
            if (state.profile) {
                const index = state.profile.addresses.findIndex(
                    (address) => address.id === action.payload.id
                );
                if (index !== -1) {
                    state.profile.addresses[index] = action.payload;
                } else {
                    state.profile.addresses = [...state.profile.addresses, action.payload];
                }
            }
        });
        builder.addCase(updateProfileAddress.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });

        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = action.payload;
        });
        builder.addCase(updateProfile.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
    },
});

export default profileSlice.reducer;
