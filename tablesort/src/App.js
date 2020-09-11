import React, { Component } from 'react';
import Loader from './Loader/loader';
import Table from './Table/table';


class App extends Component {
  state = {
    isLoading: true,
    data: [],
    sortdirection: '\u25BC',
    sortcolumn: ''
  }

  // async componentDidMount() {
  //   const response = await fetch('http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D')
  //   const data = await response.json()
  //   console.log(data)
  //   this.setState({
  //     isLoading: false,
  //     data
  //   })
  // }
  componentDidMount() {
    fetch('http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D')
      .then(res => res.json())
      .then(res => this.setState({
        isLoading: false,
        data: res
      }))
  }

  Sort = column => {
    const arr = this.state.data;
    if(this.state.sortdirection === '\u25BC') {
      arr.sort((a, b) => a[column] > b[column] ? 1 : -1);
      this.setState({sortdirection: '\u25B2'})
    } else  {
      arr.sort((a, b) => a[column] < b[column] ? 1 : -1);
      this.setState({sortdirection: '\u25BC'})
    }
   
    this.setState({
       data: arr,
       sortcolumn: column
     });
  }
 
  render() {
    return (
      <div className="container">
        {this.state.isLoading ? <Loader /> : <Table data={this.state.data} sort={this.Sort} column={this.state.sortcolumn} direction={this.state.sortdirection}/>}
      </div>
    );
  }
}

export default App;
