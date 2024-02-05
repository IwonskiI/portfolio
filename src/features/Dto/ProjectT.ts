export interface Contents {
  main_content: string
  sub_content?: string | string[]
}

export interface Blocks {
  title: string
  contents: Contents[]
}