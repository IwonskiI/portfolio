import { EquationT, MentionT } from "./BlockT";
import { ColorT } from "./NotionT";

export interface RichTextT {
    type: "text" | "mention" | "equation";
    text?: {};
    mention?: MentionT;
    equation?: EquationT;
    annotations?: AnnotationT;
    plain_text: string;
    href?: string;
}

export interface TextT {
    content?: string;
    link?: { url: string; } | null;
}

export interface AnnotationT {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: ColorT;
}