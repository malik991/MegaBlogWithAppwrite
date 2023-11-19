import React from "react";
import { Editor } from "@tinymce/tinymce-react";
// controller use for to provide the reference of this form to another componenet where it needs to use like useForwarde hook
import { Controller } from "react-hook-form";

// here control is responsible to take the value from here to that file where its values will be used
export default function ReactTextEditor({
  name,
  control,
  label,
  defaultValue = "",
}) {
  return (
    <div className="w-full text-left mb-4">
      {label && (
        <label className="inline-block mb-1 pl-1 font-serif text-xl">
          {label}
        </label>
      )}
      <Controller
        name={name || "content"}
        control={control} // this is the controll which come from parent who will call it it gives the full controll to that parent element about its all props
        // now we render the element, {} this is tracking on field of every event
        // we are doing tracking when someone change in editor we track that changes
        //
        render={({ field: { onChange } }) => (
          // here we will write that element which needs to render like input filed
          // or in this case a aditor
          <Editor
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              height: 500,
              menubar: true,
              plugins: [
                "image",
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
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange} // whenever some change happen it will trigger to the field
          />
        )}
      />
    </div>
  );
}
