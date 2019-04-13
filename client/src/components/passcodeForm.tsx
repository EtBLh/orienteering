import React, {useState, useEffect, useRef} from 'react'

export default () => {
    
    let [passcode, setPC] = useState()
    let button = useRef(null)
    let [btnState, setbtn] = useState('')
    let [inputState, setInput] = useState('')
    let [msg, setMsg] = useState('')

    let submit = () => {
        animateButton();

        fetch('/api/decrypt',{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({value: passcode})})
            .then(res => res.json())
            .then(json => {
                json["type"]?
                    showCorrectMsg(json['message']):
                    showWrongMsg()
            })
    }

    let showWrongMsg = () => {
        setPC('')
        setInput('shake')
        setTimeout(()=>{
            setInput('')
        },1500)
    }

    let showCorrectMsg = (msg:string) => {
        setMsg(msg)
    }

    let animateButton = function() {
        setbtn('animate')
        setTimeout(function(){
          setbtn('')
        },700);
      };

    return (
        <div id='passcodeForm'>
            <div id="input" className={(msg==""?"":"fadeout")+inputState}>
                <h2>Please Enter Passcode:</h2>
                <input type="text"  onChange={e => setPC(e.target.value)} value={passcode}/><br/>
                <button id='bubbly-button' className={btnState} onClick={()=>submit()} ref={button}>SUBMIT</button>
            </div>
            <div id="msgShower" className={msg==""?"":"fadein"}>
                <h2>{msg}</h2>
            </div>
        </div>
    )
}