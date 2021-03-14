import React from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends React.Component {

        state = {
            error: null
        }

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(request => {
                this.setState({error: null});
                return request;
            });
            this.resInterceptor = axios.interceptors.response.use(response => response, error => {
                this.setState({error: error});
            });  
        }

        componentWillUnmount() {
            // removing interceptors here b/c
            // when using component many times over can cause memory leak
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render() {
            return(
                <React.Fragment>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            );
        }
    }
}

export default withErrorHandler;