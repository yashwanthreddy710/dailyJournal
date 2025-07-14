import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../axios";


export const fetchEntries = createAsyncThunk("journal/fetchEntries", async () => {
  const res = await API.get("/journals");
  return res.data;
});

export const filterEntries = createAsyncThunk(
  "journal/filterEntries",
  async (queryParams) => {
    const queryString = new URLSearchParams(queryParams).toString();
    const res = await API.get(`/journals/filter?${queryString}`);
    return res.data;
  }
);


const journalSlice = createSlice({
  name: "journal",
  initialState: {
    entries: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEntries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEntries.fulfilled, (state, action) => {
        state.loading = false;
        state.entries = action.payload;
      })
      .addCase(fetchEntries.rejected, (state) => {
        state.loading = false;
      })
      .addCase(filterEntries.pending, (state) => {
        state.loading = true;
        })
        .addCase(filterEntries.fulfilled, (state, action) => {
        state.loading = false;
        state.entries = action.payload;
        })
        .addCase(filterEntries.rejected, (state) => {
        state.loading = false;
        })

  },
});

export default journalSlice.reducer;
