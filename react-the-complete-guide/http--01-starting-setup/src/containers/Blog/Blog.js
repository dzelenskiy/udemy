import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import './Blog.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';

class Blog extends Component {

    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink 
                                    to="/posts/" exact 
                                    activeClassName="active"
                                    activeStyle={{
                                        textDecoration: 'underline'
                                    }}>
                                        Posts
                                </NavLink>
                            </li>
                            <li><NavLink to={{
                                    pathname: '/new-post',
                                    hash: '#submit',
                                    search: '?quick-submit=true'
                                }}>
                                    New Post
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    {/* <Route path="/home" exact render={() => <h1>Home</h1>} /> */}
                    <Route path="/posts/" component={Posts} />
                    <Route path="/new-post" exact component={NewPost} />
                </Switch>
            </div>
        );
    }
}

export default Blog;