import {configureStore} from '@reduxjs/toolkit'
import tableReducer from '../components/Home/tableSlice'

export default configureStore({
	reducer: {
		sellTable: tableReducer,
	},
})
