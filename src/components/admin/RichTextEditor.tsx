"use client";

import { useEditor, EditorContent, Extension } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import { Highlight } from "@tiptap/extension-highlight";
import { Image } from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";
import { Youtube } from "@tiptap/extension-youtube";
import { FontFamily } from "@tiptap/extension-font-family";
import { useEffect, useState } from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Minus,
  Undo2,
  Redo2,
  Eraser,
  Table as TableIcon,
  Plus,
  Trash2,
  Image as ImageIcon,
  Video as VideoIcon,
  Palette,
  Highlighter,
  Type,
  ChevronDown
} from "lucide-react";

// 1. Custom Font Size Extension for Tiptap
const FontSize = Extension.create({
  name: "fontSize",
  addOptions() {
    return {
      types: ["textStyle"],
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize.replace(/['"]+/g, ""),
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize:
        (fontSize: string) =>
        ({ chain }) => {
          return chain().setMark("textStyle", { fontSize }).run();
        },
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain().setMark("textStyle", { fontSize: null }).run();
        },
    };
  },
});

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ content, onChange, placeholder = "Start writing..." }: RichTextEditorProps) {
  // Dropdown visibility states
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3]
        }
      }),
      Underline,
      TextStyle,
      Color,
      FontFamily,
      FontSize,
      Highlight.configure({ multicolor: true }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Youtube.configure({
        width: 640,
        height: 480,
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose-base focus:outline-none max-w-none w-full min-h-[450px] max-h-[650px] overflow-y-auto px-8 py-8 font-sans leading-relaxed text-zinc-800 dark:text-zinc-200 outline-none"
      }
    }
  });

  // Sync value from outside if it changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleOutsideClick = () => setActiveDropdown(null);
    if (activeDropdown) {
      window.addEventListener("click", handleOutsideClick);
    }
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [activeDropdown]);

  if (!editor) return null;

  const toggleDropdown = (e: React.MouseEvent, dropdown: string) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const ButtonClass = (isActive: boolean) =>
    `h-9 w-9 rounded-lg flex items-center justify-center transition-all cursor-pointer border shadow-sm ${
      isActive
        ? "bg-primary text-white border-primary"
        : "bg-white hover:bg-gray-100 border-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700"
    }`;

  const DropdownButtonClass = "h-9 px-3 rounded-lg flex items-center justify-between transition-all cursor-pointer border shadow-sm bg-white hover:bg-gray-100 border-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700 text-xs font-bold gap-2 relative";

  // Actions
  const addImage = () => {
    const url = prompt("Enter the absolute URL of the image:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addYoutubeVideo = () => {
    const url = prompt("Enter the YouTube Video URL (e.g., https://www.youtube.com/watch?v=...)");
    if (url) {
      editor.chain().focus().setYoutubeVideo({ src: url }).run();
    }
  };

  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  // Configurations
  const fontFamilies = [
    { label: "Default", value: "" },
    { label: "Inter", value: "Inter" },
    { label: "Playfair", value: "Playfair Display" },
    { label: "Georgia", value: "Georgia" },
    { label: "Monospace", value: "Courier New" },
    { label: "Comic Sans", value: "Comic Sans MS" },
    { label: "Impact", value: "Impact" }
  ];

  const fontSizes = [
    { label: "Default", value: "" },
    { label: "12px", value: "12px" },
    { label: "14px", value: "14px" },
    { label: "16px", value: "16px" },
    { label: "18px", value: "18px" },
    { label: "20px", value: "20px" },
    { label: "24px", value: "24px" },
    { label: "30px", value: "30px" },
    { label: "36px", value: "36px" }
  ];

  const colors = [
    { name: "Default", value: "" },
    { name: "Black", value: "#000000" },
    { name: "Dark Gray", value: "#374151" },
    { name: "Crimson", value: "#430917" },
    { name: "Emerald", value: "#10b981" },
    { name: "Royal Blue", value: "#1d4ed8" },
    { name: "Gold", value: "#d97706" },
    { name: "Saffron", value: "#ea580c" }
  ];

  const highlights = [
    { name: "None", value: "" },
    { name: "Yellow", value: "#fef08a" },
    { name: "Green", value: "#bbf7d0" },
    { name: "Pink", value: "#fbcfe8" },
    { name: "Blue", value: "#bfdbfe" },
    { name: "Orange", value: "#fed7aa" }
  ];

  return (
    <div className="border rounded-2xl overflow-hidden focus-within:border-primary transition-colors bg-white dark:bg-gray-900 shadow-sm flex flex-col relative">
      {/* Dynamic Inline Editor Table Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .ProseMirror table {
          border-collapse: collapse;
          table-layout: fixed;
          width: 100%;
          margin: 1.5rem 0;
          overflow: hidden;
        }
        .ProseMirror td, .ProseMirror th {
          min-width: 1em;
          border: 1px solid #e4e4e7;
          padding: 8px 12px;
          vertical-align: top;
          box-sizing: border-box;
          position: relative;
        }
        .ProseMirror th {
          font-weight: 800;
          text-align: left;
          background-color: #f4f4f5;
        }
        .ProseMirror .selectedCell:after {
          z-index: 2;
          position: absolute;
          content: "";
          left: 0; right: 0; top: 0; bottom: 0;
          background: rgba(214, 13, 44, 0.08);
          pointer-events: none;
        }
        .ProseMirror iframe {
          border-radius: 1.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          margin: 2rem auto;
          max-width: 100%;
        }
        .ProseMirror img {
          border-radius: 1.5rem;
          margin: 2rem auto;
        }
      `}} />

      {/* Editor Toolbar */}
      <div className="bg-zinc-50 dark:bg-zinc-800/80 px-4 py-3 border-b flex flex-wrap gap-2 items-center z-40 select-none">
        
        {/* Basic Text Formatting */}
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={ButtonClass(editor.isActive("bold"))}
            title="Bold (Ctrl+B)"
          >
            <Bold size={15} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={ButtonClass(editor.isActive("italic"))}
            title="Italic (Ctrl+I)"
          >
            <Italic size={15} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={ButtonClass(editor.isActive("underline"))}
            title="Underline (Ctrl+U)"
          >
            <UnderlineIcon size={15} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={ButtonClass(editor.isActive("strike"))}
            title="Strikethrough"
          >
            <Strikethrough size={15} />
          </button>
        </div>

        <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-700 mx-1" />

        {/* Dropdown: Font Family */}
        <div className="relative">
          <button
            type="button"
            onClick={(e) => toggleDropdown(e, "fontFamily")}
            className={DropdownButtonClass}
            title="Font Family"
          >
            <Type size={14} />
            <span>Font Family</span>
            <ChevronDown size={12} />
          </button>
          {activeDropdown === "fontFamily" && (
            <div className="absolute left-0 mt-1 w-48 bg-white dark:bg-zinc-800 border rounded-xl shadow-xl z-50 py-1.5 animate-in fade-in slide-in-from-top-1 duration-150">
              {fontFamilies.map((font) => (
                <button
                  key={font.label}
                  type="button"
                  onClick={() => {
                    if (font.value === "") {
                      editor.chain().focus().unsetFontFamily().run();
                    } else {
                      editor.chain().focus().setFontFamily(font.value).run();
                    }
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-gray-50 dark:hover:bg-zinc-700 ${
                    editor.isActive("textStyle", { fontFamily: font.value }) ? "text-primary" : "text-zinc-700 dark:text-zinc-200"
                  }`}
                  style={{ fontFamily: font.value || "inherit" }}
                >
                  {font.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dropdown: Font Size */}
        <div className="relative">
          <button
            type="button"
            onClick={(e) => toggleDropdown(e, "fontSize")}
            className={DropdownButtonClass}
            title="Font Size"
          >
            <span className="text-[10px] font-black leading-none border border-zinc-400 rounded-sm px-0.5">A+</span>
            <span>Size</span>
            <ChevronDown size={12} />
          </button>
          {activeDropdown === "fontSize" && (
            <div className="absolute left-0 mt-1 w-32 bg-white dark:bg-zinc-800 border rounded-xl shadow-xl z-50 py-1.5 animate-in fade-in slide-in-from-top-1 duration-150">
              {fontSizes.map((size) => (
                <button
                  key={size.label}
                  type="button"
                  onClick={() => {
                    if (size.value === "") {
                      // @ts-ignore
                      editor.chain().focus().unsetFontSize().run();
                    } else {
                      // @ts-ignore
                      editor.chain().focus().setFontSize(size.value).run();
                    }
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-gray-50 dark:hover:bg-zinc-700 ${
                    editor.isActive("textStyle", { fontSize: size.value }) ? "text-primary font-black" : "text-zinc-700 dark:text-zinc-200"
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-700 mx-1" />

        {/* Dropdown: Text Color */}
        <div className="relative">
          <button
            type="button"
            onClick={(e) => toggleDropdown(e, "textColor")}
            className={DropdownButtonClass}
            title="Text Color"
          >
            <Palette size={14} className="text-rose-500" />
            <span>Color</span>
            <ChevronDown size={12} />
          </button>
          {activeDropdown === "textColor" && (
            <div className="absolute left-0 mt-1 w-36 bg-white dark:bg-zinc-800 border rounded-xl shadow-xl z-50 p-2 grid grid-cols-4 gap-1.5 animate-in fade-in slide-in-from-top-1 duration-150">
              {colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => {
                    if (color.value === "") {
                      editor.chain().focus().unsetColor().run();
                    } else {
                      editor.chain().focus().setColor(color.value).run();
                    }
                  }}
                  className="w-6 h-6 rounded-md border border-zinc-200 relative flex items-center justify-center overflow-hidden hover:scale-110 transition-transform shadow-sm"
                  style={{ backgroundColor: color.value || "#ffffff" }}
                  title={color.name}
                >
                  {color.value === "" && <span className="text-[10px] text-red-500 font-bold">✖</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dropdown: Highlight / Background Color */}
        <div className="relative">
          <button
            type="button"
            onClick={(e) => toggleDropdown(e, "textHighlight")}
            className={DropdownButtonClass}
            title="Highlight Color"
          >
            <Highlighter size={14} className="text-amber-500" />
            <span>Bg Color</span>
            <ChevronDown size={12} />
          </button>
          {activeDropdown === "textHighlight" && (
            <div className="absolute left-0 mt-1 w-36 bg-white dark:bg-zinc-800 border rounded-xl shadow-xl z-50 p-2 grid grid-cols-4 gap-1.5 animate-in fade-in slide-in-from-top-1 duration-150">
              {highlights.map((hl) => (
                <button
                  key={hl.name}
                  type="button"
                  onClick={() => {
                    if (hl.value === "") {
                      editor.chain().focus().unsetHighlight().run();
                    } else {
                      editor.chain().focus().toggleHighlight({ color: hl.value }).run();
                    }
                  }}
                  className="w-6 h-6 rounded-md border border-zinc-200 relative flex items-center justify-center overflow-hidden hover:scale-110 transition-transform shadow-sm"
                  style={{ backgroundColor: hl.value || "#ffffff" }}
                  title={hl.name}
                >
                  {hl.value === "" && <span className="text-[10px] text-red-500 font-bold">✖</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-700 mx-1" />

        {/* Bullet and Numbered Lists */}
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={ButtonClass(editor.isActive("bulletList"))}
            title="Bullet List"
          >
            <List size={15} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={ButtonClass(editor.isActive("orderedList"))}
            title="Numbered List"
          >
            <ListOrdered size={15} />
          </button>
        </div>

        {/* Headings & Blockquote */}
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={ButtonClass(editor.isActive("heading", { level: 1 }))}
            title="Heading 1"
          >
            <Heading1 size={15} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={ButtonClass(editor.isActive("heading", { level: 2 }))}
            title="Heading 2"
          >
            <Heading2 size={15} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={ButtonClass(editor.isActive("heading", { level: 3 }))}
            title="Heading 3"
          >
            <Heading3 size={15} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={ButtonClass(editor.isActive("blockquote"))}
            title="Blockquote"
          >
            <Quote size={15} />
          </button>
        </div>

        <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-700 mx-1" />

        {/* Dropdown: Dynamic Table Creation & Cells Editing */}
        <div className="relative">
          <button
            type="button"
            onClick={(e) => toggleDropdown(e, "tableOps")}
            className={DropdownButtonClass}
            title="Table Tools"
          >
            <TableIcon size={14} className="text-zinc-500" />
            <span>Table</span>
            <ChevronDown size={12} />
          </button>
          {activeDropdown === "tableOps" && (
            <div className="absolute left-0 mt-1 w-52 bg-white dark:bg-zinc-800 border rounded-xl shadow-xl z-50 py-1.5 animate-in fade-in slide-in-from-top-1 duration-150">
              <button
                type="button"
                onClick={insertTable}
                className="w-full text-left px-4 py-2 text-xs font-semibold hover:bg-gray-50 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 flex items-center gap-2"
              >
                <TableIcon size={12} className="text-primary" />
                <span>Insert Table (3x3 Grid)</span>
              </button>
              
              {editor.isActive("table") && (
                <>
                  <div className="h-px bg-zinc-100 dark:bg-zinc-700 my-1.5" />
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().addRowBefore().run()}
                    className="w-full text-left px-4 py-2 text-xs font-semibold hover:bg-gray-50 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 flex items-center gap-2"
                  >
                    <Plus size={12} />
                    <span>Add Row Above</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().addRowAfter().run()}
                    className="w-full text-left px-4 py-2 text-xs font-semibold hover:bg-gray-50 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 flex items-center gap-2"
                  >
                    <Plus size={12} />
                    <span>Add Row Below</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().deleteRow().run()}
                    className="w-full text-left px-4 py-2 text-xs font-semibold hover:bg-gray-50 dark:hover:bg-zinc-700 text-red-600 flex items-center gap-2"
                  >
                    <Trash2 size={12} />
                    <span>Delete Row</span>
                  </button>
                  <div className="h-px bg-zinc-100 dark:bg-zinc-700 my-1.5" />
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().addColumnBefore().run()}
                    className="w-full text-left px-4 py-2 text-xs font-semibold hover:bg-gray-50 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 flex items-center gap-2"
                  >
                    <Plus size={12} />
                    <span>Add Column Left</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().addColumnAfter().run()}
                    className="w-full text-left px-4 py-2 text-xs font-semibold hover:bg-gray-50 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 flex items-center gap-2"
                  >
                    <Plus size={12} />
                    <span>Add Column Right</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().deleteColumn().run()}
                    className="w-full text-left px-4 py-2 text-xs font-semibold hover:bg-gray-50 dark:hover:bg-zinc-700 text-red-600 flex items-center gap-2"
                  >
                    <Trash2 size={12} />
                    <span>Delete Column</span>
                  </button>
                  <div className="h-px bg-zinc-100 dark:bg-zinc-700 my-1.5" />
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().deleteTable().run()}
                    className="w-full text-left px-4 py-2 text-xs font-bold hover:bg-gray-50 dark:hover:bg-zinc-700 text-red-600 flex items-center gap-2"
                  >
                    <Trash2 size={12} />
                    <span>Delete Entire Table</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Media Inserts */}
        <div className="flex gap-1">
          <button
            type="button"
            onClick={addImage}
            className={ButtonClass(false)}
            title="Insert Image Link"
          >
            <ImageIcon size={15} />
          </button>
          <button
            type="button"
            onClick={addYoutubeVideo}
            className={ButtonClass(false)}
            title="Embed YouTube Video"
          >
            <VideoIcon size={15} />
          </button>
        </div>

        <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-700 mx-1" />

        {/* Horizontal Rule & Clear & History */}
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className={ButtonClass(false)}
            title="Horizontal Line"
          >
            <Minus size={15} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
            className={ButtonClass(false)}
            title="Clear Formatting"
          >
            <Eraser size={15} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className={ButtonClass(false) + " disabled:opacity-50 disabled:cursor-not-allowed"}
            title="Undo"
          >
            <Undo2 size={15} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className={ButtonClass(false) + " disabled:opacity-50 disabled:cursor-not-allowed"}
            title="Redo"
          >
            <Redo2 size={15} />
          </button>
        </div>

      </div>

      {/* Editor Content Area */}
      <div className="flex-1 bg-transparent flex min-h-[450px]">
        <EditorContent editor={editor} className="flex-1 flex outline-none" />
      </div>
    </div>
  );
}
