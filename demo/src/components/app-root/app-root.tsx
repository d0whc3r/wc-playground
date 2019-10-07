import { Component, h, Prop, State } from '@stencil/core';
import '@ionic/core';
import '@d0whc3r/monaco-editor';
import '@d0whc3r/live-code';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
  shadow: false
})
export class AppRoot {
  @Prop() code = `<div>
  <h1 style={{ background: 'red' }}>test playground</h1>
  <ion-button>test button</ion-button>
</div>`;
  @Prop() model: {
    filename: string;
    content: string;
    language: string;
    options?: any;
  } = {
    filename: 'index.html',
    language: 'html',
    content: this.code,
    options: {
      lineNumbers: 'on',
      theme: 'vs'
    }
  };
  @Prop() theme?: string;
  @Prop() readonly?: boolean;

  @State() actualCode = this.code;
  private editor?: HTMLMonacoEditorElement;

  private handleSave({ detail }: CustomEvent) {
    this.code = detail;
  }

  private handleChange({ detail }: CustomEvent) {
    this.actualCode = detail;
  }

  private isUnsaved() {
    return this.code !== this.actualCode;
  }

  private generatedLink() {
    const content = btoa(this.actualCode);
    return `${window.location.href}?content=${content}`;
  }

  private saveFile() {
    if (this.editor) {
      this.editor.runSave();
    }
  }

  render() {
    const unsaved = this.isUnsaved();
    console.log('render usaved', unsaved);
    return (
      <div>
        <p>
          {!this.isUnsaved() && (
            <a href={this.generatedLink()} target="_blank">
              Share link
            </a>
          )}
          {this.isUnsaved() && <button onClick={() => this.saveFile}>Save</button>}
        </p>
        <monaco-editor
          ref={(el) => (this.editor = el)}
          class="editor"
          theme={this.theme}
          readonly={this.readonly}
          model={this.model}
          onEditorChanged={(e) => this.handleChange(e)}
          onEditorSave={(e) => this.handleSave(e)}
        />
        ;
        <live-code class="viewer" code={this.code} />;
      </div>
    );
  }
}
