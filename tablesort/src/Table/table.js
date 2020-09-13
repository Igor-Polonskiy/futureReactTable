import React from 'react';

export default props => (
    <table className="table">
        <thead>
            <tr>
                <th onClick={()=> props.sort('id')}>ID {props.column === 'id' ? <span>{props.direction}</span> : null}</th>
                <th onClick={()=> props.sort('firstName')}>First Name {props.column === 'firstName' ? <span>{props.direction}</span> : null}</th>
                <th onClick={()=> props.sort('lastName')}>Last Name {props.column === 'lastName' ? <span>{props.direction}</span> : null}</th>
                <th onClick={()=> props.sort('email')}>E-mail {props.column === 'email' ? <span>{props.direction}</span> : null}</th>
                <th onClick={()=> props.sort('phone')}>Phone {props.column === 'phone' ? <span>{props.direction}</span> : null}</th>
            </tr>
        </thead>
        <tbody>
            {props.data.map(item => (
                <tr key={item.id + item.firstName} onClick={()=>props.select(item)}>
                    <td>{item.id}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                </tr>
            ))}
        </tbody>
    </table>
)
