import React from 'react';
import { Route } from 'react-router-dom';
import './Posts.css';
//import { Link } from 'react-router-dom';
//import axios from 'axios';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';

class Posts extends React.Component {

    state = {
        posts: []
    }
    
    postSelectedHandler = id => {
        // this.setState({selectedPostId: id});
        // this.props.history.push({pathname: '/' + id});
        this.props.history.push('/posts/' + id);
    }  
    
    componentDidMount () {
        console.log(this.props);
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
                return (
                        // <Link to={'/' + post.id} key={post.id}>
                            <Post 
                                key={post.id}
                                title={post.title} 
                                author={post.author}
                                clicked={() => this.postSelectedHandler(post.id)} 
                            />
                        // </Link>
                );
            });
        }

        return(
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + "/:id"} exact component={FullPost} />
            </div>
        );
    }
}

export default Posts;