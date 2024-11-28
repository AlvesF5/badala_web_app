declare module 'react-draft-wysiwyg' {
    import { Component } from 'react';

    export interface EditorProps {
        editorState?: any;
        onEditorStateChange?: (editorState: any) => void;
        toolbarClassName?: string;
        wrapperClassName?: string;
        editorClassName?: string;
        toolbarHidden?: boolean;
        [key: string]: any; // Permite propriedades adicionais
    }

    export class Editor extends Component<EditorProps> { }
}