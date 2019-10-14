import { Component, h, Prop, State } from '@stencil/core';
import '@ionic/core';
import '@d0whc3r/live-code';
import '@d0whc3r/monaco-editor';

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

  componentWillLoad() {
    const content = /content=(.*)/.exec(window.location.search);
    if (content && content.length) {
      const code = atob(content[1]);
      this.code = code;
      this.model.content = code;
    }
  }

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
    return (
      <div>
        <p>
          {!this.isUnsaved() && (
            <a href={this.generatedLink()} target="_blank">
              Share link
            </a>
          )}
          {this.isUnsaved() && <button onClick={() => this.saveFile()}>Save</button>}
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
        <live-code class="viewer" code={this.code} />
      </div>
    );
  }
}
