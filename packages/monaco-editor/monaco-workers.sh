#!/bin/bash
ROOT=$PWD/node_modules/monaco-editor/esm/vs
OPTS="-- --no-source-maps --log-level 1 --out-dir src/components/monaco-editor/workers"

npm run parcel build $ROOT/language/json/json.worker.js $OPTS
npm run parcel build $ROOT/language/css/css.worker.js $OPTS
npm run parcel build $ROOT/language/html/html.worker.js $OPTS
npm run parcel build $ROOT/language/typescript/ts.worker.js $OPTS
npm run parcel build $ROOT/editor/editor.worker.js $OPTS
