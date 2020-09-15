import React, { Component, Fragment } from 'react';

class Addform extends Component {

    state = {
        isAdding: false,
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        disabled: true,
    }


    componentDidMount() {

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
        this.setState({
            isAdding: false,
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            disabled: true,
        });

    }
    handelChange = (event, labe) => {
        this.setState({ [labe]: event.target.value });

    }
    isDisabled = () => {
        const { id, firstName, lastName, email, phone } = this.state;
        if (id !== '' && firstName !== '' && lastName !== '' && email !== '' && phone !== '') {
            return false
        } else return true
    }



    render() {

        const disabled = this.isDisabled()

        return (
            <Fragment>
                {
                    this.state.isAdding ?
                        <form>
                            <div className="form-group">
                                <label>ID<input className='form-control' type='number' value={this.state.id} onChange={(event) => this.handelChange(event, 'id')}></input></label>
                                <label>First Name<input className='form-control' type='text' value={this.state.firstName} onChange={(event) => this.handelChange(event, 'firstName')}></input></label>
                                <label>Last Name<input className='form-control' type='text' value={this.state.lastName} onChange={(event) => this.handelChange(event, 'lastName')}></input></label>
                                <label>E-mail<input className='form-control' type='email' value={this.state.email} onChange={(event) => this.handelChange(event, 'email')}></input></label>
                                <label>Phone<input className='form-control' type='phone' value={this.state.phone} onChange={(event) => this.handelChange(event, 'phone')}></input></label>
                                <button className="btn btn-primary" disabled={disabled} onClick={this.hanleSubmit.bind(this)}>Добавить в таблицу</button>
                            </div>
                        </form> :
                        <button className="btn btn-primary" onClick={this.handleClick}>Добавить</button>
                }
            </Fragment>
        )
    }
}
export default Addform