import { BlockT, ColorT, EmojiT, FileT, LanguageT, UserT } from './NotionT'
import { DateT } from './PageT'
import { RichTextT } from './RichTextT'

export interface BookmarkT {
  caption?: RichTextT[]
  url: string
}

export interface BulletedListItemT {
  rich_text: RichTextT[]
  color?: ColorT
  children?: BlockT[]
}

export interface CalloutT {
  rich_text: RichTextT[]
  icon?: EmojiT | FileT
}

export interface ChildDatabaseT {
  title: string
}

export interface ChildPageT {
  title: string
}

export interface CodeT {
  caption?: RichTextT[]
  rich_text: RichTextT[]
  language?: LanguageT
}

export interface EmbedT {
  url: string
}

export interface EquationT {
  expression: string
}

export interface FileBlockT {
  caption?: RichTextT[]
  type: 'file' | 'external'
  file: {
    url: string
    expiry_time?: string
  }
  name?: string
}

export interface HeadingsT {
  rich_text: RichTextT[]
  color?: ColorT
  is_toggleable?: boolean
}

export interface ImageT extends FileT {
  /* bmp/gif/heic/jpeg/jpg/png/svg/tif/tiff supported */
}

export interface LinkPreviewT {
  url: string
}

export type MentionTypeT =
  | 'database'
  | 'date'
  | 'link_preview'
  | 'page'
  | 'template_mention'
  | 'user'
export interface MentionT {
  type: MentionTypeT
  database?: { id?: string }
  date?: DateT
  link_preview?: { url?: string }
  page?: { id?: string }
  template_mention?:
    | {
        type?: 'template_mention_date'
        template_mention_date?: 'today' | 'now'
      }
    | { type?: 'template_mention_user'; template_mention_user?: 'me' }
  user?: UserT
}

export interface NumberedListItemT {
  rich_text: RichTextT[]
  color?: ColorT
  children?: BlockT[]
}

export interface ParagraphT {
  rich_text: RichTextT[]
  color?: ColorT
  children?: BlockT[]
}

export interface PdfT extends FileT {
  caption?: RichTextT[]
}

export interface QuoteT {
  rich_text: RichTextT[]
  color?: ColorT
  children?: BlockT[]
}

export interface SyncedBlockT {
  synced_from?: null | { block_id: string }
  children?: BlockT[]
}

export interface TableT {
  table_width?: number
  has_column_header?: boolean
  has_row_header?: boolean
}

export interface TableRowsT {
  cells: RichTextT[]
}

export interface TableOfContentsT {
  color: ColorT
}

export interface TemplateT {
  rich_text: RichTextT[]
  children: BlockT[]
}

export interface ToDoT {
  rich_text: RichTextT[]
  checked: boolean
  color: ColorT
  children: BlockT[]
}

export interface ToggleT {
  rich_text: RichTextT[]
  color: ColorT
  children: BlockT[]
}

export interface VideoT extends FileT {
  /* amv/asf/avi/f4v/flv/gifv/mkv/mov/mpg/mpeg/mpv/mp4/m4v/qt/wmv supported */
  /* Youtube Link include 'embed' or 'watch' supported */
}
