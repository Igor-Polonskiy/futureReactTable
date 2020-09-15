import React, { Component, Fragment } from 'react';
import Dataselect from './Dataselect/dataselect'
import Loader from './Loader/loader';
import Table from './Table/table';
import Itemcard from './Itemcard/itemcard';
import ReactPaginate from 'react-paginate';
import Search from './Search/search';
import Addform from './Addform/addform';


class App extends Component {
  state = {
    dataselected: false,
    isLoading: false,
    data: [],
    sortdirection: '\u25BC',
    sortcolumn: '',
    row: null,
    currentPage: 0,
    pageSize: 50,
    search: '',
  }

  fetchData(url) {
    fetch(url)
      .then(res => res.json())
      .then(res => this.setState({
        isLoading: false,
        data: res
      }))
      
  }

  Selectdata = url => {
    this.setState({
      dataselected: true,
      isLoading: true,
    })
    this.fetchData(url)
  }

  Sort = sortcolumn => {
    const data = this.state.data;
    if (this.state.sortdirection === '\u25BC') {
      data.sort((a, b) => a[sortcolumn] > b[sortcolumn] ? 1 : -1);
      this.setState({ sortdirection: '\u25B2' })
    } else {
      data.sort((a, b) => a[sortcolumn] < b[sortcolumn] ? 1 : -1);
      this.setState({ sortdirection: '\u25BC' })
    }
    this.setState({ data, sortcolumn });
  }

  Selectrow = row => {
    this.setState({ row });
  }

  handlePageClick = ({ selected }) => (
    this.setState({ currentPage: selected })
  )

  handleSearch = search =>{
    this.setState({search, currentPage: 0})
  }

  getFilteredData(){
    const {data, search} = this.state

    if (!search) {
      return data
    }

    return data.filter(item => {
      return item['firstName'].toLowerCase().includes(search.toLowerCase())
        || item['lastName'].toLowerCase().includes(search.toLowerCase())
        || item['email'].toLowerCase().includes(search.toLowerCase())
        || item['id'].toString().includes(search.toString())
     
    })
  }
  dispData(){
   let data = this.getFilteredData();
   return data.slice(this.state.currentPage * this.state.pageSize, this.state.currentPage * this.state.pageSize + this.state.pageSize)
  }

  additem = (id, firstName, lastName, email, phone) => {
    let data = this.state.data;
    data.unshift({id: id, firstName: firstName, lastName: lastName, email: email, phone: phone})
    this.setState({data})
  }



  render() {
    const data = this.dispData();
    const filttredData = this.getFilteredData();
    const pageCount = Math.ceil(filttredData.length / this.state.pageSize);

    if (!this.state.dataselected) {
      return (
        <div className="container">
          <Dataselect select={this.Selectdata} />
        </div>
      )
    } else {
      return (
        <div className="container">
          {this.state.isLoading ? <Loader /> :
            <Fragment>
              <Search onSearch={this.handleSearch}/>
              <Addform add = {this.additem}/>
              <Table
                data={data}
                sort={this.Sort}
                column={this.state.sortcolumn}
                direction={this.state.sortdirection}
                select={this.Selectrow} />
            </Fragment>
          }
          {filttredData.length > this.state.pageSize  ?
            <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={'.....'}
              breakClassName={'break-me'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={'pagination'}
              activeClassName={'active'}
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              nextClassName="page-item"
              previousLinkClassName="page-link"
              nextLinkClassName="page-link"
              forcePage={this.state.currentPage}
            /> : null
          }

          {
            this.state.row ? <Itemcard item={this.state.row} /> : null
          }
        </div>
      );
    }
  }
}

export default App;
