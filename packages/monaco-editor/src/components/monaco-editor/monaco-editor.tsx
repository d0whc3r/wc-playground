import * as monaco from 'monaco-editor';
import { editor, KeyCode, KeyMod, Uri } from 'monaco-editor';
import { Component, Event, EventEmitter, h, Method, Prop, Watch } from '@stencil/core';

interface MonacoModel {
  options: any;
  model: editor.ITextModel;
}

@Component({
  tag: 'monaco-editor',
  styleUrl: 'monaco-editor.scss',
  assetsDirs: ['workers'],
  shadow: false
})
export class MonacoEditorComponent {
  @Prop() model?: {
    filename: string;
    content: string;
    language: string;
    options?: any;
  };
  @Prop() options?: editor.IEditorConstructionOptions;
  @Prop() theme?: string;
  @Prop() readonly = false;
  @Prop() width = '800px';
  @Prop() height = '600px';

  @Event() editorChanged!: EventEmitter;
  @Event() editorInit!: EventEmitter;
  @Event() editorSave!: EventEmitter;
  @Event() editorWillLoad!: EventEmitter;

  private codeEditor?: editor.IStandaloneCodeEditor;
  private monacoModel?: MonacoModel = { model: undefined, options: undefined };
  private container: HTMLDivElement;

  componentDidLoad() {
    this.editorWillLoad.emit();
    this.setupWorker(window);
    let opts = Object.assign(this.options || {}, {
      theme: this.theme || 'vs-dark',
      automaticLayout: true,
      readOnly: this.readonly,
      renderLineHighlight: 'none',
      glyphMargin: true,
      formatOnType: true,
      formatOnPaste: true
    });
    const { model, options } = this.initMonaco();
    if (model) {
      opts.model = model;
    }
    opts = { ...opts, ...options };
    this.editorInit.emit({ monaco, ...opts });
    this.codeEditor = editor.create(this.getContainer(), opts);
    this.codeEditor.addAction({
      id: 'save',
      label: 'Save',
      keybindings: [KeyMod.CtrlCmd | KeyCode.KEY_S],
      keybindingContext: '!editorReadonly',
      contextMenuGroupId: '0_navigation',
      contextMenuOrder: 0.2,
      run: this.runSave.bind(this)
    });
  }

  private getContainer() {
    return this.container;
  }

  componentDidUnload() {
    if (this.codeEditor) {
      this.monacoModel.model.dispose();
      this.codeEditor.dispose();
    }
  }

  // private _updateOptions() {
  //   const { model, options } = this.initMonaco();
  //   this.codeEditor.setModel(model);
  //   if (options) {
  //     this.codeEditor.updateOptions(options);
  //   }
  // }

  @Watch('model')
  private initMonaco() {
    if (this.model) {
      const { filename, content, language, options } = this.model;
      const info = this.monacoModel;
      if (info && info.model) {
        editor.setModelLanguage(info.model, language);
        info.model.setValue(content);
        info.options = options;
      } else {
        const model = editor.createModel(content, language, Uri.parse(`inmemory://model/${filename}`));
        model.onDidChangeContent(() => {
          const content = model && model.getValue();
          this.editorChanged.emit(content);
        });
        this.monacoModel = { options, model };
      }
    }
    return this.monacoModel;
  }

  setupWorker(win: any) {
    win.MonacoEnvironment = {
      getWorkerUrl: function(_moduleId: string, label: string) {
        if (label === 'json') {
          return './build/workers/json.worker.js';
        }
        if (label === 'css') {
          return './build/workers/css.worker.js';
        }
        if (label === 'html') {
          return './build/workers/html.worker.js';
        }
        if (label === 'typescript' || label === 'javascript') {
          return './build/workers/typescript.worker.js';
        }
        return './build/workers/editor.worker.js';
      }
    };
  }

  @Method()
  async runSave() {
    await this.codeEditor.getAction('editor.action.formatDocument').run();
    this.editorSave.emit(this.codeEditor.getValue());
  }

  render() {
    return <div style={{ width: this.width, height: this.height }} ref={(el) => (this.container = el)} />;
  }
}
