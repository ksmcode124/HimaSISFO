'use client';

import { Editor } from "@tinymce/tinymce-react";
import { useRef } from 'react';

const App = () => {
  const editorRef = useRef<any>(null);
 
  const handleShowContent = () => {
    if (editorRef.current) {
      const content = editorRef.current!.getContent();
      const preview = document.getElementById("editor-preview");
      if (preview) {
        preview.innerHTML = content;
      }
    }
  };
 
  return (
    <div style={{ width: "90%", margin: "auto", marginTop: "20px" }}>
      <h1 style={{ textAlign: "center" }}>TinyMCE React Example</h1>
      <Editor
        apiKey="z14g1fyeux6z9luyg731oowgfv6r1eo843fyzdatthryv6qh" // Optional: Get a free API key from https://www.tiny.cloud/
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>Welcome to TinyMCE!</p>"
        init={{
          height: 300,
          menubar: false,
          plugins: [
            'a11ychecker',
            'advlist',
            'advcode',
            'advtable',
            'autolink',
            'checklist',
            'export',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'powerpaste',
            'fullscreen',
            'formatpainter',
            'insertdatetime',
            'media',
            'table',
            'help',
            'wordcount',
          ],
          toolbar:
            'undo redo | image | preview | casechange blocks | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
          placeholder: "Start typing here...",
        }}
      />
      <button
        id="show-content"
        style={{ marginTop: "10px", padding: "10px 20px", display: "block", marginLeft: "auto", marginRight: "auto" }}
        onClick={handleShowContent}
      >
        Show HTML Content
      </button>
      <div
        id="editor-preview"
        style={{ border: "1px solid #ccc", marginTop: "20px", padding: "10px" }}
      ></div>
    </div>
  );
};
 
export default App;