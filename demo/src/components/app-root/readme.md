# app-root



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description | Type                                                                      | Default                                                                                                                                           |
| ---------- | ---------- | ----------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `code`     | `code`     |             | `string`                                                                  | ``<div>   <h1 style={{ background: 'red' }}>test playground</h1>   <button>test button</button> </div>``                                          |
| `model`    | --         |             | `{ filename: string; content: string; language: string; options?: any; }` | `{     filename: 'index.html',     language: 'html',     content: this.code,     options: {       lineNumbers: 'on',       theme: 'vs'     }   }` |
| `readonly` | `readonly` |             | `boolean`                                                                 | `undefined`                                                                                                                                       |
| `theme`    | `theme`    |             | `string`                                                                  | `undefined`                                                                                                                                       |


## Dependencies

### Depends on

- monaco-editor

### Graph
```mermaid
graph TD;
  app-root --> monaco-editor
  style app-root fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
