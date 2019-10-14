# monaco-editor

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description | Type                                                                      | Default     |
| ---------- | ---------- | ----------- | ------------------------------------------------------------------------- | ----------- |
| `height`   | `height`   |             | `string`                                                                  | `'600px'`   |
| `model`    | --         |             | `{ filename: string; content: string; language: string; options?: any; }` | `undefined` |
| `options`  | --         |             | `IEditorConstructionOptions`                                              | `undefined` |
| `readonly` | `readonly` |             | `boolean`                                                                 | `false`     |
| `theme`    | `theme`    |             | `string`                                                                  | `undefined` |
| `width`    | `width`    |             | `string`                                                                  | `'800px'`   |


## Events

| Event            | Description | Type               |
| ---------------- | ----------- | ------------------ |
| `editorChanged`  |             | `CustomEvent<any>` |
| `editorInit`     |             | `CustomEvent<any>` |
| `editorSave`     |             | `CustomEvent<any>` |
| `editorWillLoad` |             | `CustomEvent<any>` |


## Methods

### `runSave() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
