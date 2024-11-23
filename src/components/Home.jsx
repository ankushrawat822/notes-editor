import React, { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import Timer from "./Timer";
import { Link } from "react-router-dom";



const Home = () => {
  const editorRef = useRef(null);
  const isProgrammaticChange = useRef(false); // Track programmatic changes

  const [userPrompt, setUserPrompt] = useState("");
  const [result, setResult] = useState("");

  const handleFetchData = async () => {
    try {
      const response = await axios.post(
        "https://voice-gpt-backend.vercel.app/api",
        {
          prompt:
            "I will provide you the context. Note that maybe the context could be empty (empty string). If it's not empty, you must consider it while responding to the user prompt. So here is the context: " +
            result +
            " OK, Do not repeat the content if it's already available in the provided context. So now here is the user prompt that you must answer: " +
            userPrompt +
            " NOTE: Do not give any formatted text, give a response in normal text and answer in at most 250 words if no word length is provided.",
        }
      );

      const newResult = response.data.result;
     
    const updatedContent = `<p style="background-color: blue;">${userPrompt} \n ${result}</p><p style="background-color: green;">${newResult}</p>`;


      isProgrammaticChange.current = true; // Mark as programmatic change
      setResult(updatedContent);

      if (editorRef.current) {
        editorRef.current.setContent(updatedContent);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditorChange = (content) => {
    // Avoid updates from programmatic changes
    if (!isProgrammaticChange.current) {
      setResult(content);
    } else {
      isProgrammaticChange.current = false; // Reset after programmatic change
    }
  };

  return (
    
    <>


        <div className=" min-h-[100vh] max-h-fit bg-[#494F55] w-[100dvw] py-10 px-20">


          {/* Search bar */}
      <div className=" flex items-center justify-center">
        <div className="relative  w-[100%] rounded-sm flex items-center gap-[.1rem] justify-between mb-10  ">

            <div className="">
                <Timer></Timer>
            </div>


            {/* search div */}
            <div className="flex w-[60%] items-center justify-center">

            <input
            onChange={(e) => setUserPrompt(e.target.value)}
            type="text"
            className=" text-[21px] pl-8 w-full py-[0.08rem] "
            placeholder="Enter prompt"
          />
          <button
            onClick={handleFetchData}
            className="bg-blue-400 px-5 py-[0.4rem] rounded-sm"
          >
            Search
          </button>

            </div>
         

          <button className="bg-[#222F3E] hover:bg-[#17212d] text-white font-bold py-2 px-4 rounded"><Link to='/test' state={result}>TEST</Link></button>
        </div>
       
      </div>

      {/* Text Editor */}
      <div className="px-10 mt-8">
        <Editor
          apiKey={import.meta.env.VITE_REACT_APP_TINY_MCE}
          onInit={(_evt, editor) => (editorRef.current = editor)}
          value={result}
          onEditorChange={handleEditorChange}
          init={{
            height: 500,
            menubar: "file edit view insert format",
            skin: "oxide-dark", // Use the dark theme for the editor
          content_css: "dark", // Use the dark theme for content inside the editor
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
              "wordcount"
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:18px }"
          }}
        />
      </div>

        </div>

    
    </>
  );
};

export default Home;