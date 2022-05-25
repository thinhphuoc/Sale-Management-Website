import {createSlice} from '@reduxjs/toolkit'

const hash_table = {
	1: 'eraser',
	2: 'pen',
	3: 'notebook',
}

export const tableSlice = createSlice({
	name: 'sell table',
	initialState: {
		value: [],
	},
	reducers: {
		add_new_product: (state, action) => {
			let k = state.value.findIndex((x) => x.id === action.payload)
			if (k >= 0) {
				return state.value.map((y) =>
					y.id === action.payload
						? {
								...y,
								quantity: y.quantity + 1,
						  }
						: y
				)
			} else {
				return [
					...state.value,
					{
						id: action.payload,
						product_name: hash_table[action.payload],
						quantity: 1,
					},
				]
			}
		},
	},
})

// Action creators are generated for each case reducer function
export const {add_new_product} = tableSlice.actions

export default tableSlice.reducer
