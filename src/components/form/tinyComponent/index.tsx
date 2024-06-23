import { useRef } from "react";
import { Editor, IAllProps } from "@tinymce/tinymce-react";
import styled from "./index.module.scss";
import getBase64 from "@/utils/file";

interface TinyProps extends IAllProps {
  label?: string;
  initProps?: object;
  defaultValue?: string;
  callbackChange?: (value: string) => void;
  required?: boolean;
  value: string;
  loading?: boolean;
}

export default function EditorBox({
  label = "",
  initProps,
  defaultValue,
  callbackChange,
  required = false,
  value,
  loading,
  ...props
}: TinyProps) {
  const editorRef = useRef(null);

  return (
    <div className={styled['text_editor']}>
      <Editor
        apiKey={import.meta.env.TINY_API_KEY}
        value={value}
        //@ts-ignore
        onInit={(_evt, editor) => (editorRef.current = editor)}
        init={{
          height: 200,
          menubar: false,
          branding: false,
          content_css: "",
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
            "image",
            "code",
          ],
          toolbar:
            "undo redo | blocks fontfamily fontsize | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "link image code | help",
          images_upload_handler: async (blobInfo) => {
            const { blob } = blobInfo;

            return new Promise((resolve) => {
              resolve(getBase64(blob()));
            });
          },
          automatic_uploads: true,
          ...initProps,
        }}
        {...props}
      />
    </div>
  );
}
