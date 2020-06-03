import React, { Component } from 'react';
import axios from 'axios';

let photosArr = [];
export default class index extends Component{
    constructor(props){
        super(props);

        this.state = {photos: [], search: ''}

        this.handleSearch = this.handleSearch.bind(this);
        this.handleSearchValue = this.handleSearchValue.bind(this);
    }

    handleSearchValue = (event) => {
        this.setState({search: event.target.value});
    }

    handleSearch = () => {
        photosArr = [];
        this.setState({photos: []})
        const data = {
            value: this.state.search,
        }

        if(this.state.search == '' || this.state.search == null){
            data.Empty = true
        }else{
            data.Empty = false
        }

        axios.post('http://127.0.0.1:8000/api/searchImages', data)
        .then(res => {
            res.data.map((photo) => {
                photosArr.push({'photo': photo.photo,'username': photo.first_name + " " + photo.last_name})
            })
            this.setState({photos: photosArr});
        })
        .catch(err => {
            console.log(err);
        })

    }


    componentWillMount() {
        photosArr = [];
        axios.get('http://127.0.0.1:8000/api/getImages')
        .then((res) => {
            res.data.map((photo) => {
                photosArr.push({'photo': photo.photo,'username': photo.users.first_name + " " + photo.users.last_name})
            })
            this.setState({photos: photosArr});
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render() {
        
        return (
            <div className="index-row">
                <div className="images-search">
                <div className="col-md-2 search-col">
                        <br />
                        <h3>Image Search</h3>
                        <input type="text" className="form-control" onChange={this.handleSearchValue} value={this.state.search}/>
                        <br />
                        <button className="btn btn-primary" onClick={this.handleSearch}>Search</button>
                    </div>
                    <div className="col-md-10">
                        {this.state.photos.map((item,i) => (
                            <div className="auth-inner-index"  key={i}>
                                <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                    <div className="row">
                                        <div className="center-element"><b>Author:</b> {item.username}</div>
                                    </div>
                                    <div className="row">
                                        <img src={`http://127.0.0.1:8000/images/${item.photo}`} className="img img-responsive center-element" style={{width:200}}/>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        );
    }
}