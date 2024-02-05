import { FunctionTypeT, MultiSelectT, SelectT, StatusT } from './PageT'

export type DBTypeT =
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

export type NumberFormatT =
  | 'argentine_peso'
  | 'baht'
  | 'australian_dollar'
  | 'canadian_dollar'
  | 'chilean_peso'
  | 'colombian_peso'
  | 'danish_krone'
  | 'dirham'
  | 'dollar'
  | 'euro'
  | 'forint'
  | 'franc'
  | 'hong_kong_dollar'
  | 'koruna'
  | 'krona'
  | 'leu'
  | 'lira'
  | 'mexican_peso'
  | 'new_taiwan_dollar'
  | 'new_zealand_dollar'
  | 'norwegian_krone'
  | 'number'
  | 'number_with_commas'
  | 'percent'
  | 'philippine_peso'
  | 'pound'
  | 'peruvian_sol'
  | 'rand'
  | 'real'
  | 'ringgit'
  | 'riyal'
  | 'ruble'
  | 'rupee'
  | 'rupiah'
  | 'shekel'
  | 'singapore_dollar'
  | 'uruguayan_peso'
  | 'yen,'
  | 'yuan'
  | 'won'
  | 'zloty'

export interface NumberDBT {
  format: NumberFormatT
}

export interface RelationDBT {
  database_id: string
  synced_property_id: string
  synced_property_name: string
}

export interface RollupDBT {
  function?: FunctionTypeT
  relation_property_id: string
  relation_property_name: string
  rollup_property_id: string
  rollup_property_name: string
}

export interface GroupsT extends StatusT {
  option_ids: string[]
}
export interface StatusDBT {
  options: StatusT[]
  groups: GroupsT[]
}

export interface DBPropertiesT {
  id: string
  name: string
  type: DBTypeT
  checkbox?: {}
  created_by?: {}
  created_time?: {}
  date?: {}
  email?: {}
  files?: {}
  formula?: { expression: string }
  last_edited_by?: {}
  last_edited_time?: {}
  multi_select?: MultiSelectT
  number?: NumberDBT
  people?: {}
  phone_number?: {}
  relation?: RelationDBT
  rich_text?: {}
  rollup?: RollupDBT
  select?: SelectT
  status?: StatusDBT
  title?: {}
  url?: {}
}
