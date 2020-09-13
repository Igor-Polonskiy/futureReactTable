import React from 'react';

export default props =>{
    const smalData = `http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`;
    const bigData = `http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`;
    return (
        <div style={{display:'flex', justifyContent:'center', padding: '200px 0'}}>
            <button onClick={()=>props.select(smalData)} className="btn btn-primary" style={{margin: '0 20px'}}>Small Data</button>
            <button onClick={()=>props.select(bigData)} className="btn btn-primary">Big Data</button>
        </div>
    )
}