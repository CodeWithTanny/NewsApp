import React, { useState } from 'react'

export default function TextForm(props) {
    const handleUpClick = ()=>{
        // console.log("Uppercase was clicked" + text);
        let newText = text.toUpperCase()
        setText(newText)
        props.showAlert("Converted to upperCase", "success");
        
    }
    const handleLowClick = ()=>{
        let newText = text.toLowerCase()
        setText(newText)
        props.showAlert("Converted to lowerCase", "success");
        
    }
    const handlelText = ()=>{
        let newText = ''
        setText(newText)
        props.showAlert("Text cleared", "success");
        
    }
    const handleOnChange = (event)=>{
        // console.log("On Changed")
        setText(event.target.value);
    }
    const handleCopy = ()=>{
      navigator.clipboard.writeText(text);
      props.showAlert("Copied to Clipboard!", "success")
    }
  const [text, setText] = useState('');
  return (
    <>
    <div className="container" style={{color:props.mode === 'dark'?'white':'#09063f'}}>
        <h1 className='mb-2'>{props.heading}</h1>
<div className="mb-3">
  <textarea className="form-control" id="myBox" value={text} onChange={handleOnChange} style={{backgroundColor:props.mode === 'dark'?'#13466e':'white', color:props.mode === 'dark'?'white':'#09063f'}} rows="8"></textarea>
</div>
  <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Convert to Uppercase</button>
  <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleLowClick}>Convert to Lowercase</button>
  <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handlelText}>Clear Text</button>
  <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleCopy}>Copy Text</button>
    </div>
    <div className="container my-3" style={{color:props.mode === 'dark'?'white':'#09063f'}}>
        <h1>Your text summary</h1>
        <p>{text.split(/\s+/).filter((element)=>{return element.length!==0}).length} words and {text.length} characters</p> 
        <p>{0.008 * text.split(" ").filter((element)=>{return element.length!==0}).length } Minutes read</p>
        <h2>Preview</h2>
        <p>{text.length>0?text:"Nothing to preview"}</p>
    </div>
    </>
  )
}
