"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const TOOLBAR = [
  [{ header: [2, 3, false] }],
  ["bold", "italic", "underline"],
  [{ list: "ordered" }, { list: "bullet" }],
  ["link"],
  ["clean"],
];

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function QuillEditor({ value, onChange }: Props) {
  return (
    <div className="quill-wrapper">
      <style>{`
        .quill-wrapper .ql-container {
          font-size: 14px;
          border-bottom-left-radius: 6px;
          border-bottom-right-radius: 6px;
          min-height: 160px;
        }
        .quill-wrapper .ql-toolbar {
          border-top-left-radius: 6px;
          border-top-right-radius: 6px;
          background: #fafafa;
        }
        .quill-wrapper .ql-editor {
          min-height: 160px;
        }
      `}</style>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={{ toolbar: TOOLBAR }}
      />
    </div>
  );
}
