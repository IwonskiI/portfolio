import { configureStore } from '@reduxjs/toolkit'
import projectReducer from './project-slice'
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    project: projectReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
