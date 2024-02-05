import { ColorT, FileT, UserT } from './NotionT'
import { RichTextT } from './RichTextT'

export type PageTypeT =
  | 'checkbox'
  | 'created_by'
  | 'created_time'
  | 'date'
  | 'email'
  | 'files'
  | 'formula'
  | 'last_edited_by'
  | 'last_edited_time'
  | 'multi_select'
  | 'number'
  | 'people'
  | 'phone_number'
  | 'relation'
  | 'rollup'
  | 'rich_text'
  | 'select'
  | 'status'
  | 'title'
  | 'url'
  | 'unique_id'
  | 'verification'

export interface CheckboxT {
  checkbox: boolean
}

export interface CreatedByT {
  created_by: UserT
}

export interface CreatedTimeT {
  created_time: string
}

export interface DateT {
  end: string
  start: string
}

export interface EmailT {
  email: string
}

export interface FilesT {
  files: FileT[]
}

export interface FormulaT {
  type: 'boolean' | 'date' | 'number' | 'string'
  boolean?: boolean
  date?: DateT
  number?: number
  string?: string
}

export interface LastEditedByT {
  last_edited_by: UserT
}

export interface LastEditedTimeT {
  last_edited_time: string
}

export interface MultiSelectT {
  color: ColorT
  id: string
  name: string
}

export interface NumberT {
  number: number
}

export interface PeopleT {
  people: UserT[]
}

export interface PhoneNumberT {
  phone_number: string
}

export interface RelationT {
  has_more: boolean
  relation: { id: string }[]
}

export type RollupTypeT = [] | DateT | number
export type FunctionTypeT =
  | 'average'
  | 'checked'
  | 'count'
  | 'count_per_group'
  | 'count_values'
  | 'date_range'
  | 'earliest_date'
  | 'empty'
  | 'latest_date'
  | 'max'
  | 'median'
  | 'min'
  | 'not_empty'
  | 'percent_checked'
  | 'percent_empty'
  | 'percent_not_empty'
  | 'percent_per_group'
  | 'percent_unchecked'
  | 'range'
  | 'show_original'
  | 'show_unique'
  | 'sum'
  | 'unchecked'
  | 'unique'
export interface RollupT {
  type?: RollupTypeT
  array?: []
  date?: DateT
  incomplete?: any
  number?: number
  unsupported?: any
  function?: FunctionTypeT
}

export interface RichTextTypeT {
  rich_text: RichTextT[]
}

export interface SelectT {
  color: ColorT
  id: string
  name: string
}

export interface StatusT {
  color: ColorT
  id: string
  name: string
}

export interface TitleT {
  title: RichTextT[]
}
export interface URLT {
  url: string
}

export interface UniqueIdT {
  number: number
  prefix: string | null
}

export interface VerificationT {
  state: 'verified' | 'unverified'
  verified_by: UserT | null
  date: { start: string; end: string | null; time_zone?: string | null } | null
}

export interface PagingtedPagePropertiesT {
  object: 'list'
  type: 'property_item'
  result: []
  property_item: any
  next_url: string | null
}

export interface PagePropertiesT {
  id: string
  type: PageTypeT
  checkbox?: CheckboxT
  created_by?: CreatedByT
  created_time?: CreatedTimeT
  date?: DateT
  email?: EmailT
  files?: FilesT
  formula?: FormulaT
  last_edited_by?: LastEditedByT
  last_edited_time?: LastEditedTimeT
  multi_select?: MultiSelectT
  number?: NumberT
  people?: PeopleT
  phone_number?: PhoneNumberT
  relation?: RelationT
  rollup?: RollupT
  rich_text?: RichTextT
  select?: SelectT
  status?: StatusT
  title?: TitleT
  url?: URLT
  unique_id?: UniqueIdT
  verification?: VerificationT
}