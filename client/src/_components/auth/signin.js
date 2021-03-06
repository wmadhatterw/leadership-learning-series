import React, { Component } from 'react';
import { Field, reduxForm, Form } from 'redux-form';
import { signInAction } from '../../_store/actions/auth';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './auth.css';

const renderInput = field => {
    const { input, type } = field;
    return (
        <div className="input-field">
            <input {...input} type={type} className="form-control" />
            <label htmlFor= {type} className="active">{type}</label>
        </div>
    );
}

class Signin extends Component {
    handleFormSubmit ({ email, password }) {
        this.props.signInAction({email, password});
    }

    renderAlert() {
        const { errorMessage } = this.props;
        if ( errorMessage ) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong>{errorMessage}
                </div>
            );
        }
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <Form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <div className="input-field container">
                    
                    <Field id ="email" name="email"
                        type="email" component={renderInput} />
                       
                </div>
                <div className="input-field container">
                    <Field name="password"
                        type="password" component={renderInput} />
                </div>
                {this.renderAlert()}
                <div className="row">
                  <div className="col s12 center-align">                
                    <button action="submit" className="btn btn-primary waves-effect">Sign in</button>
                  </div>
                </div>                    
            </Form>
        );
    }
}

function mapStateToProps(state) {
    return { 
        errorMessage: state.auth.error
     };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      signInAction: (data) => dispatch(signInAction(ownProps.history, data))
    }
};

const reduxFormSignin = reduxForm({
    form:'signin'
})(Signin);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(reduxFormSignin));