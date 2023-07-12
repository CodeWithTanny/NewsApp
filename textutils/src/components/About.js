export default function About(props) { //rfc
    
    // const [myStyle, setMyStyle] = useState({
    //     color: 'black',
    //     backgroundColor: 'white'
       
    // })
    let myStyle = {
        color: props.mode === 'dark'?'white':'#09063f',
        backgroundColor: props.mode === 'dark'?'rgb(36 74 104)':'white'
    }


  return (
        <div className="container" style={{color: props.mode === 'dark'?'white':'#09063f'}}>
            <h2>About us</h2>
            <div className="accordion" id="accordionExample">
    <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
        <button className="accordion-button" type="button" data-bs-toggle="collapse" style={myStyle} data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            <strong>Analyze Your text</strong>
        </button>
        </h2>
        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
        <div className="accordion-body" style={myStyle}>
            TextUtils gives you a way to analyze your text quickly and efficiently. Be it word count, character count or
        </div>
        </div>
    </div>
    <div className="accordion-item">
        <h2 className="accordion-header" id="headingTwo">
        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" style={myStyle} data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
           <strong>Free to use</strong>
        </button>
        </h2>
        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
        <div className="accordion-body" style={myStyle}>
            TextUtils is a free character counter tool that provides instant character count & word count statistics for a given text. TextUtils reposts the number of word and characters. Thus it is sutiable for writeing text with word/ character limit.
        </div>
        </div>
    </div>
    <div className="accordion-item">
        <h2 className="accordion-header" id="headingThree">
        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" style={myStyle} data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            <strong>Browser Comatible</strong>
        </button>
        </h2>
        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
        <div className="accordion-body" style={myStyle}>
            This word counter software works in any web browsers such as Chrome, Internet Explorer, Firefox, Safari, Opera. It suits to count to count character in facebook, blog, books, excel document, pdf document, essays, etc.
        </div>
        </div>
    </div>
    </div>
    </div>
  )
}
