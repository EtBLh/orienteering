import React from 'react';
import {Planets} from '../resource/planet-resouce'

type Props = {
    callback: (id:number) => void,
    id:number,
    level:number
}

export default (props:Props) => {
    return (
        <div className="Planet">
            <h2>{props.id>10?"0"+props.id:"00"+props.id}</h2>
            <img 
                src={Planets[props.level]} 
                alt="A planet" 
                onClick={()=>{props.callback(props.id)}}/>
        </div>
    )
}