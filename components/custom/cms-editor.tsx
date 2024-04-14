"use client";

import React, {
  RefObject,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Loader } from "@/components/custom";

// eslint-disable-next-line react/display-name
export const CmsEditor = forwardRef<Editor>((_props, ref) => {
  const [loadingContent, setLoadingContent] = useState(true);

  const apiKey = process.env.NEXT_PUBLIC_CMS_API_KEY;

  return (
    <>
      <Editor
        id="myTextArea"
        apiKey={apiKey}
        // @ts-ignore
        onInit={(evt, editor) => (ref.current = editor)}
        init={{
          plugins:
            "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          tinycomments_mode: "embedded",
          ai_request: (_request: any, respondWith: any) =>
            respondWith.string(() =>
              Promise.reject("See docs to implement AI Assistant")
            ),
        }}
        onLoadContent={() => setLoadingContent(false)}
        initialValue="This course will be aimed at ..."
      />
      {loadingContent && <Loader className="h-[400px]" />}
    </>
  );
});
