import React, { Component } from 'react';

class Course extends Component {

        parseTitleFromQueryString = () => {
            const queryString = this.props.location.search;
            const params = new URLSearchParams(queryString);
            let title = params.get('title');
            !title && (title = 'Missing Title');
            return title;
        }

    render () {
        console.log(this.props);

        return (
            <div>
                <h1>{this.parseTitleFromQueryString()}</h1>
                <p>You selected the Course with ID: {this.props.match.params.id}</p>
            </div>
        );
    }
}

export default Course;