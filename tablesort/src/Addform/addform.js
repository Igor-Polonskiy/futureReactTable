import React, { Component, Fragment } from 'react';

class Addform extends Component {

    state = {
        isAdding: false,
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    }



    handleClick = () => {
        this.setState({
            isAdding: true,

        })
    }

    hanleSubmit = (event) => {
        event.preventDefault();
        const { id, firstName, lastName, email, phone } = this.state;
        this.props.add(id, firstName, lastName, email, phone)
        this.setState({ isAdding: false });

    }
    handelChange = (event, labe)=> {
        
        this.setState({[labe] : event.target.value });
    }


    render() {
        return (
            <Fragment>
                {
                    this.state.isAdding ?
                        <form>
                            <label>ID<input type='number' value={this.state.id} onChange={(event)=>this.handelChange(event, 'id')}></input></label>
                            <label>First Name<input type='text' value={this.state.firstName} onChange={(event)=>this.handelChange(event, 'firstName')}></input></label>
                            <label>Last Name<input type='text' value={this.state.lastName} onChange={(event)=>this.handelChange(event, 'lastName')}></input></label>
                            <label>E-mail<input type='email' value={this.state.email} onChange={(event)=>this.handelChange(event, 'email')}></input></label>
                            <label>Phone<input type='phone' value={this.state.phone} onChange={(event)=>this.handelChange(event, 'phone')}></input></label>
                            <button onClick={this.hanleSubmit.bind(this)}>добавить в таблицу</button>
                        </form> :
                        <button onClick={this.handleClick}>Добавить</button>
                }
            </Fragment>
        )
    }
}
export default Addform