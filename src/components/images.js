import React, { Component } from 'react';
import Sidebar from './sidebar';
import ImageUploader from 'react-images-upload';
import axios from 'axios';

let images = [];
export default class index extends Component{
    constructor(props){
        super(props);
        this.state = { pictures: [], success: ''};
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(pictures) {
        this.setState({
            pictures: pictures,
        });
    }

    handleSubmit = () => {
        let images = [];
        this.state.pictures.map((picture, index) => {
            let file = picture;
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
            const data = {
                image: reader.result,
                user_id: localStorage.getItem('user_id')
            }

            axios.post('http://127.0.0.1:8000/api/uploadImages', data, {
                headers: {
                    'user_auth': localStorage.getItem('user_auth')
                }
            })
            .then((res) => {
                this.setState({success: 'Images uploaded successfully'})
            })
            }
        })

    }


    render() {
        return (
            <div className="auth-inner-dash">
                    
            <div className="wrapper">
                <Sidebar />

            <div id="content" className="image_upload">
                
                <h3>Upload image</h3>
                <div style={{color: 'green'}}>{this.state.success}</div>
                <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png']}
                maxFileSize={5242880}
                withPreview={true}
                />

                <button className="btn btn-primary" onClick={this.handleSubmit}>Save Images</button>



            </div>
            </div>
        </div>
        );
    }
}