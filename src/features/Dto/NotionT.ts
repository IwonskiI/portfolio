import {
    BookmarkT, BulletedListItemT, CalloutT, ChildDatabaseT, ChildPageT, EmbedT, EquationT, FileBlockT, HeadingsT,
    ImageT, LinkPreviewT, MentionT, NumberedListItemT, ParagraphT, PdfT, QuoteT, SyncedBlockT, TableOfContentsT, TableRowsT, TableT, TemplateT, ToDoT, ToggleT, VideoT
} from "./BlockT";
import { RichTextT } from "./RichTextT";

export interface ResponseT {
    object: string;
    results: [];
    next_cursor: string | null;
    has_more: boolean;
    type: "page_or_database";
    page_or_database: any;
    developer_survey: string;
    request_id: string;
}

export interface BlockT {
    object: string;
    id: string;
    parent?: ParentT;
    created_time?: string;
    created_by?: UserT;
    last_edited_time?: string;
    last_edited_by?: UserT;
    archived?: boolean;
    has_children?: boolean;
    type?: DataT;
    bookmark?: BookmarkT;
    breadcrumb?: {};
    bulleted_list_item?: BulletedListItemT;
    callout?: CalloutT;
    child_database?: ChildDatabaseT;
    child_page?: ChildPageT;
    column?: {};
    column_list?: {};
    divider?: {};
    embed?: EmbedT;
    equation?: EquationT;
    file?: FileBlockT;
    heading_1?: HeadingsT;
    heading_2?: HeadingsT;
    heading_3?: HeadingsT;
    image?: ImageT;
    link_preview?: LinkPreviewT;
    link_to_page?: any;
    numbered_list_item?: NumberedListItemT;
    paragraph?: ParagraphT;
    pdf?: PdfT;
    quote?: QuoteT;
    synced_block?: SyncedBlockT;
    table?: TableT;
    table_of_contents?: TableOfContentsT;
    table_row?: TableRowsT;
    template?: TemplateT;
    to_do?: ToDoT;
    toggle?: ToggleT;
    video?: VideoT;
}

export interface PageT {
    object: "page";
    id: string;
    created_time?: string;
    created_by?: UserT;
    last_edited_time?: string;
    last_edited_by?: string;
    archived?: boolean;
    icon?: EmojiT | { type: "external"; external: { url: string; } } | null;
    cover?: { type: "external"; external: { url: string; } };
    parent?: ParentT;
    url?: string;
    public_url?: string | null;
    properties?: any;
}

export interface DatabaseT {
    object: "database";
    id: string;
    created_time?: string;
    created_by?: UserT;
    lasted_edited_time?: string;
    lasted_edited_by?: UserT;
    title?: RichTextT[];
    description?: RichTextT[];
    icon?: FileT | EmojiT | null;
    cover?: FileT;
    parent?: ParentT;
    url?: string;
    archived?: boolean;
    is_inline?: boolean;
    public_url?: string;
    properties: any;
}

export interface ParentT {
    type: "database_id" | "page_id" | "workspace" | "block_id";
    page_id?: string;
    database_id?: string;
    workspace?: boolean;
    block_id?: string;
}

export interface UserT {
    object: "user";
    id: string;
    type?: "person" | "bot";
    name?: string;
    avatar_url?: string;
    bot?: {
        owner?: { type: "workspace" | "user"; workspace: boolean; };
        workspace_name?: string | null;
    };
    person?: { email?: string; };
}

export interface CommentT {
    object: "comment";
    id: string;
    parent: ParentT;
    discussion_id: string;
    created_time: string;
    last_edited_time: string;
    created_by: UserT;
    rich_text: RichTextT;
}

export interface FileT {
    type: "external" | "file";
    external?: { url: string; };
    file: { url: string; expiry_time: string; };
    name?: string;
}

export interface EmojiT {
    type: "emoji";
    emoji: string;
}

export type DataT =
    "bookmark" | "breadcrumb" | "bulleted_list_item" |
    "callout" | "child_database" | "child_page" | "column" | "column_list" |
    "divider" | "embed" | "equation" | "file" | "heading_1" | "heading_2" | "heading_3" |
    "image" | "link_preivew" | "link_to_page" |
    "numbered_list_item" | "paragraph" | "pdf" | "quote" | "synced_block" |
    "table" | "table_of_contents" | "table_row" | "template" | "to_do" | "toggle" | "video" | "unsupported";

export type ColorT =
    "blue" | "brown" | "gray" | "green" | "orange" | "pink" | "purple" | "red" | "yellow" |
    "blue_background" | "brown_background" | "gray_background" | "green_background" | "orange_background" |
    "pink_background" | "purple_background" | "red_background" | "yellow_background" | "default"

export type LanguageT =
    "abap" | "arduino" | "bash" | "basic" | "c" | "clojure" | "coffeescript" | "c++" | "c#" | "css" |
    "dart" | "diff" | "docker" | "elixir" | "elm" | "erlang" | "flow" | "fortran" | "f#" | "gherkin" |
    "glsl" | "go" | "graphql" | "groovy" | "haskell" | "html" | "java" | "javascript" | "json" |
    "julia" | "kotlin" | "latex" | "less" | "lisp" | "livescript" | "lua" | "makefile" | "markdown" |
    "markup" | "matlab" | "mermaid" | "nix" | "objective-c" | "ocaml" | "pascal" | "perl" |
    "php" | "plain text" | "powershell" | "prolog" | "protobuf" | "python" | "r" | "reason" |
    "ruby" | "rust" | "sass" | "scala" | "scheme" | "scss" | "shell" | "sql" | "swift" |
    "typescript" | "vb.net" | "verilog" | "vhdl" | "visual basic" | "webassembly" | "xml" | "yaml" |
    "java/c/c++/c#";

