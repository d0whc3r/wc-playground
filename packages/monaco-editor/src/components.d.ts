/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  editor,
} from 'monaco-editor';

export namespace Components {
  interface MonacoEditor {
    'height': string;
    'model': { filename: string; content: string; language: string; options?: any; };
    'options'?: editor.IEditorConstructionOptions;
    'readonly': boolean;
    'runSave': () => Promise<void>;
    'theme'?: string;
    'width': string;
  }
}

declare global {


  interface HTMLMonacoEditorElement extends Components.MonacoEditor, HTMLStencilElement {}
  var HTMLMonacoEditorElement: {
    prototype: HTMLMonacoEditorElement;
    new (): HTMLMonacoEditorElement;
  };
  interface HTMLElementTagNameMap {
    'monaco-editor': HTMLMonacoEditorElement;
  }
}

declare namespace LocalJSX {
  interface MonacoEditor {
    'height'?: string;
    'model': { filename: string; content: string; language: string; options?: any; };
    'onEditorChanged'?: (event: CustomEvent<any>) => void;
    'onEditorInit'?: (event: CustomEvent<any>) => void;
    'onEditorSave'?: (event: CustomEvent<any>) => void;
    'onEditorWillLoad'?: (event: CustomEvent<any>) => void;
    'options'?: editor.IEditorConstructionOptions;
    'readonly'?: boolean;
    'theme'?: string;
    'width'?: string;
  }

  interface IntrinsicElements {
    'monaco-editor': MonacoEditor;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'monaco-editor': LocalJSX.MonacoEditor & JSXBase.HTMLAttributes<HTMLMonacoEditorElement>;
    }
  }
}


