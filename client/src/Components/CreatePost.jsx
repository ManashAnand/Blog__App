import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [files,setFiles] = useState();
  const [redirect,setRedirect] = useState(false);

  const createNewPost = async (e) => {
    const data = new FormData();
    data.set('title',title);
    data.set('summary',summary);
    data.set('content',content);
    data.set('file',files);

    e.preventDefault();
    const response = await fetch("http://localhost:4000/post",{
        method:"POST",
        body: data,
        credentials: 'include'
    })

    if(response.ok){
        setRedirect(true);
    }
  }

  if(redirect){
    return <Navigate to={'/'}/>
}
  return (
    <>
      <form onSubmit={createNewPost}>
        <input
          type="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="summary"
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <input type="file"  onChange={e => setFiles(e.target.files[0])}/>
        <ReactQuill value={content} onChange={newValue => setContent(newValue)}/>
        <button style={{ marginTop: "5px" }}>Create Post</button>
      </form>
    </>
  );
};

export default CreatePost;
