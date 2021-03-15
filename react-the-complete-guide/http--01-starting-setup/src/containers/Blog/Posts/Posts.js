import React from 'react';
import Post from '../../../components/Post/Post';
//import axios from 'axios';
import axios from '../../../axios';
import './Posts.css';

class Posts extends React.Component {

    state = {
        posts: []
    }
    
    postSelectedHandler = id => {
        this.setState({selectedPostId: id});
    }  
    
    componentDidMount () {
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0,4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                });
                this.setState({posts: updatedPosts});
                //console.log(response);
            })
            .catch(error => {
                console.log(error);
                //this.setState({error: true});
            });
    }

    textStyle = {
        textAlign: 'center'
    }     

    render() {
        let posts = <p style={this.textStyle}>Something went wrong</p>

        if(!this.state.error){
            posts = this.state.posts.map(post => {
                return <Post 
                        key={post.id} 
                        title={post.title} 
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)} />;
            });
        }

        return(
            <section className="Posts">
                {posts}
            </section>
        );
    }
}

export default Posts;