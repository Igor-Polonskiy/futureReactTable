import React, { Component, Fragment } from 'react';
import Dataselect from './Dataselect/dataselect'
import Loader from './Loader/loader';
import Table from './Table/table';
import Itemcard from './Itemcard/itemcard';
import ReactPaginate from 'react-paginate';
import Search from './Search/search';


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
    pageCount: 0,
    sliceData: [],
  }

  fetchData(url) {
    fetch(url)
      .then(res => res.json())
      .then(res => this.setState({
        isLoading: false,
        data: res
      }))
      .then(() => this.setState({ pageCount: Math.ceil(this.state.data.length / this.state.pageSize) }))
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


  render() {
    const dispData = this.state.data.slice(this.state.currentPage * this.state.pageSize, this.state.currentPage * this.state.pageSize + this.state.pageSize)

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
              <Search />
              <Table
                data={dispData}
                sort={this.Sort}
                column={this.state.sortcolumn}
                direction={this.state.sortdirection}
                select={this.Selectrow} />
            </Fragment>
          }
          {this.state.pageCount > 1 ?
            <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={'.....'}
              breakClassName={'break-me'}
              pageCount={this.state.pageCount}
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
