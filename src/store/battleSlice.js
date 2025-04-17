import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  battleCount: 0
};

export const battleSlice = createSlice({
  name: 'battle',
  initialState,
  reducers: {
    incrementBattleCount: (state) => {
      state.battleCount = state.battleCount === 10 ? 0 : state.battleCount + 1;
    },
    resetBattleCount: (state) => {
      state.battleCount = 0;
    }
  }
});

export const { incrementBattleCount, resetBattleCount } = battleSlice.actions;
export const selectBattleCount = (state) => state.battle.battleCount;
export default battleSlice.reducer;
