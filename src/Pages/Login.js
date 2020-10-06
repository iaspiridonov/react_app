import React, { Component } from 'react';
import { Container } from "react-bootstrap";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoaded: true,
          error: null,
          ident: '',
          status: '',
          sendFetch: false,
          password: '',
          email: ''
        };
      }
    
    handleChange = (event) => {
        const input = event.target;
        const value = input.value;
     
        this.setState({ [input.name]: value });
      };
    
    handleFormSubmit = (event) => {
        event.preventDefault();

        this.setState({isLoaded: false})

        fetch("https://mysterious-reef-29460.herokuapp.com/api/v1/validate", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              status: result.status
            });
            if (this.state.status === 'ok') {
              this.setState({
                sendFetch: true,
                ident: result.data.id,
                validate: true
              });
              localStorage.setItem('id', this.state.ident);
              window.location.href = '/profile';
            } else {
              this.setState({
                isLoaded: true,
                sendFetch: true,
                ident: false,
                password: ''
              })
            }
          },
          (error) => {
            this.setState({
              error,
              isLoaded: true
            });
          }
        );
    };

    render() {
      const { error, ident, sendFetch, isLoaded } = this.state;
      
      var correctLogin;
      if (ident === false && sendFetch === true){
        correctLogin = false;
      } else{
        correctLogin = true;
      }

      if (error){
        return <Container><h1 className="page__title">Ошибка: {error.message}</h1></Container>;
      } else if (!isLoaded) {
        return <Container><h1 className="page__title">Загрузка...</h1></Container>; 
      } else {
        return (
            <div>
                <Container>
                  <h1 className="page__title">Вход</h1>
                  <form className="form" onSubmit={this.handleFormSubmit}>
                      <label className="form__label" id="test">
                          E-mail: <input className="form__input" name="email" type="email" value={this.state.email} onChange={this.handleChange}/>
                      </label><br/>
                      <label className="form__label">
                          Пароль: <input className="form__input" id="pas" name="password" type="password" value={this.state.password} onChange={this.handleChange}/>
                      </label><br/>
                      
                      <button className="btn btn-dark form__sub" type="submit">Войти</button>
                      <br/><br/>
                      {!correctLogin &&
                        <i className="form__error">Имя пользователя или пароль введены не верно.​</i>
                      }
                  </form>
                </Container>
            </div>
        )
      }
    }
}