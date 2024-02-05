import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import { BlockT, PageT } from '../Dto/NotionT'
import { Blocks } from '../Dto/ProjectT'

interface ProjectDetails {
  project: PageT
  page: BlockT[]
}

const initialDetailState = {
  project: {} as PageT,
  page: [] as BlockT[],
}

const initialState = {
  details: { ...initialDetailState },
  contents: [] as Blocks[],
}

export const project = createSlice({
  name: 'project', // slice 이름으로 쓸 문자열!
  initialState, // 아직 정의되지 않음!
  reducers: {
    setProject: (state, action: PayloadAction<ProjectDetails>) => {
      state.details = action.payload
    },
    resetProject: (state) => {
      state.details = initialDetailState
    },
    setContent: (state, action: PayloadAction<Blocks[]>) => {
      state.contents = action.payload
    },
  },
})

export const projectStates = (state: RootState) => state.project
export const projectDetails = (state: RootState) => state.project.details
export const projectContents = (state: RootState) => state.project.contents
export const { setProject, resetProject, setContent } = project.actions
export default project.reducer
