import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';

const CodeEditor = ({ code, setCode, language }) => {
  const extensions = {
    python: python(),
    javascript: javascript(),
    cpp: cpp(),
  };

  return (
    <CodeMirror
      value={code}
      height="200px"
      extensions={[extensions[language]]}
      onChange={(value) => setCode(value)}
    />
  );
};

export default CodeEditor;
