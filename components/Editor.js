// import { useState, useEffect, useContext } from 'react';
import dynamic from 'next/dynamic';
// import Link from 'next/link';
// import Image from 'next/image';
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';



function TextEditor({editorState, setEditorState}) {
    return (
      <div>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          wrapperClassName='p-4 border-2 border-gray-200'
          editorClassName='bg-gray-100 p-4 border-2 border-gray-200'
          toolbarClassName='border-2 border-gray-200'
        />
      </div>
    );
}

export default TextEditor;
