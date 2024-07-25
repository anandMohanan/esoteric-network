import type { Editor as TiptapEditor } from '@tiptap/core';
import { useEditor, EditorContent, ReactNodeViewRenderer, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Link } from '@tiptap/extension-link';
import { Image } from '@tiptap/extension-image';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import SectionOne from './section-1';
import SectionTwo from './section-2';
import SectionThree from './section-3';
import SectionFour from './section-4';
import { ImageViewBlock } from './image/image-view-block';
import { LinkBubbleMenu } from './bubble-menu/link-bubble-menu';
import { Plugin, TextSelection } from '@tiptap/pm/state';
import { getMarkRange } from '@tiptap/core';
import { getOutput } from '../utils';
import { ImageBubbleMenu } from './bubble-menu/image-bubble-menu';
import { forwardRef, useEffect } from 'react';
import ImageResize from 'tiptap-extension-resize-image';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { FontBoldIcon } from '@radix-ui/react-icons';
import { ItalicIcon, Strikethrough } from 'lucide-react';
import CodeBlock from '@tiptap/extension-code-block';
import Youtube from '@tiptap/extension-youtube';
import { YoutubeComponent } from './youtube';

export interface MinimalTiptapProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: string | null;
    outputValue?: 'html' | 'json' | 'text';
    disabled?: boolean;
    contentClass?: string;
    onValueChange: (value: string) => void;
    initialContent?: string | null;
}

const MinimalTiptapEditor = forwardRef<HTMLDivElement, MinimalTiptapProps>(
    ({ value, outputValue = 'html', disabled, initialContent, contentClass, onValueChange, className, ...props }, ref) => {
        const editor = useEditor({
            extensions: [
                StarterKit,
                ImageResize,
                CodeBlock,
                Youtube.configure({
                    controls: true,
                    nocookie: true,
                }),
                Link.configure({
                    openOnClick: false,
                }).extend({
                    inclusive: false,
                    addProseMirrorPlugins() {
                        return [
                            new Plugin({
                                props: {
                                    handleClick(view, pos) {
                                        const { schema, doc, tr } = view.state;
                                        const range = getMarkRange(doc.resolve(pos), schema.marks.link);
                                        if (!range) return;
                                        const { from, to } = range;
                                        const start = Math.min(from, to);
                                        const end = Math.max(from, to);
                                        if (pos < start || pos > end) return;
                                        const $start = doc.resolve(start);
                                        const $end = doc.resolve(end);
                                        const transaction = tr.setSelection(new TextSelection($start, $end));
                                        view.dispatch(transaction);
                                    },
                                },
                            }),
                        ];
                    },
                }),
            ],
            editorProps: {
                attributes: {
                    class: 'prose mx-auto focus:outline-none max-w-none prose-stone dark:prose-invert',
                },
            },
            onUpdate: ({ editor }) => {
                onValueChange(getOutput(editor, outputValue));
            },
            editable: !disabled,
        });

        // Set content after editor is created
        useEffect(() => {
            if (editor && initialContent) {
                try {
                    const parsedContent = JSON.parse(initialContent);
                    editor.commands.setContent(parsedContent);
                } catch (error) {
                    console.error('Error parsing initial content', error);
                }
            }
        }, [editor, initialContent]);

        return (
            <div
                className={cn(
                    'flex h-auto min-h-72 w-full flex-col rounded-md  shadow-sm focus-within:border-primary',
                    disabled ? 'border-none' : 'border border-input',
                    className
                )}
                {...props}
                ref={ref}
            >
                {editor && !disabled && (
                    <>
                        <LinkBubbleMenu editor={editor} />
                        <ImageBubbleMenu editor={editor} />
                        <Toolbar editor={editor} />
                        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
                            <ToggleGroup type="multiple" className="bg-primary-foreground">
                                <ToggleGroupItem
                                    value="bold"
                                    aria-label="Toggle Bold"
                                    onClick={() => editor.chain().focus().toggleBold().run()}
                                    className={editor.isActive('bold') ? 'is-active' : ''}
                                >
                                    <FontBoldIcon className="h-4 w-4" />
                                </ToggleGroupItem>
                                <ToggleGroupItem
                                    value="italic"
                                    aria-label="Toggle Italic"
                                    onClick={() => editor.chain().focus().toggleItalic().run()}
                                    className={editor.isActive('italic') ? 'is-active' : ''}
                                >
                                    <ItalicIcon className="h-4 w-4" />
                                </ToggleGroupItem>
                                <ToggleGroupItem
                                    value="strike"
                                    aria-label="Toggle Strike"
                                    onClick={() => editor.chain().focus().toggleStrike().run()}
                                    className={editor.isActive('strike') ? 'is-active' : ''}
                                >
                                    <Strikethrough className="h-4 w-4" />
                                </ToggleGroupItem>
                            </ToggleGroup>
                        </BubbleMenu>
                    </>
                )}
                <div className="h-full grow" onClick={() => editor?.chain().focus().run()}>
                    <EditorContent editor={editor} className={cn('p-5', contentClass)} />
                </div>
            </div>
        );
    }
);

MinimalTiptapEditor.displayName = 'MinimalTiptapEditor';

const Toolbar = ({ editor }: { editor: TiptapEditor }) => {
    return (
        <div className="border-b border-border p-2">
            <div className="flex w-full flex-wrap items-center">
                <SectionOne editor={editor} />
                <Separator orientation="vertical" className="mx-2 h-7" />
                <SectionTwo editor={editor} />
                <Separator orientation="vertical" className="mx-2 h-7" />
                <SectionThree editor={editor} />
                <Separator orientation="vertical" className="mx-2 h-7" />
                <SectionFour editor={editor} />
                <Separator orientation="vertical" className="mx-2 h-7" />
                <YoutubeComponent editor={editor} />
            </div>
        </div>
    );
};

export { MinimalTiptapEditor };

