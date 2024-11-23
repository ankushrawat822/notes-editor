import React, { useEffect, useState } from 'react'

import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';

const Home = () => {

    const editorRef = useRef(null);

    const [userPrompt , setUserPrompt] = useState()

    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }

    }

    const [result, setResult] = useState("your result")



    const handleFetchData = async () => {

        try {

            const response = await axios.post("https://voice-gpt-backend.vercel.app/api", { prompt: userPrompt })

            console.log(response)

            setResult(response.data.result)

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            {/* search bar */}

            <div className='w-[100dvw] my-10 px-20 flex items-center justify-center'>

                {/* input */}
                <div className='w-[100%]  rounded-sm flex items-center gap-[.1rem] justify-center '>
                    <input onChange={(e)=>setUserPrompt(e.target.value)} type='text' className=' gg text-[21px] pl-8 py-[0.08rem]  w-[43%]  ' placeholder='enter prompt'></input>
                    <button onClick={handleFetchData} className='bg-blue-400 px-5 py-[0.4rem] rounded-sm '>Search</button>

                </div>
            </div>


            <div className=' px-10'>

                <Editor
                    apiKey='5zmf2p3gm9xqw5gu7lpyfmzxy74hu61ge5k48c485u9lqvob'
                    onInit={(_evt, editor) => editorRef.current = editor}
                    initialValue={`<p className="text-[15px]" contenteditable> ${result}</p>`}
                    init={{
                        height: 500,
                        menubar: 'file edit view insert format',
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
            </div>


        </>
    )
}

export default Home