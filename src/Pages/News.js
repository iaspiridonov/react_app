import React, { Component } from 'react'
import { Container } from 'react-bootstrap'

export default class News extends Component {

    constructor(props) {
        super(props);
        this.state = {
          allNews: '',
          newsList: [],
          isLoad: false
        };
      }

    componentDidMount() {
        fetch("https://mysterious-reef-29460.herokuapp.com/api/v1/news", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
                isLoaded: true,
                allNews: result,
                newsList: result.data
            },
            (error) => {
                this.setState({
                  isLoaded: true,
                  error
                });
              }
            );
            localStorage.setItem('allNews', JSON.stringify(this.state.allNews));
          }
        );
    }
    
    render() {
        const { error, isLoaded } = this.state;
        if (error) {
            return <Container><h1 className="page__title">Ошибка: {error.message}</h1></Container>;
        } else if (!isLoaded) {
            return <Container><h1 className="page__title">Загрузка...</h1></Container>;
        } else {
            return (
                <div>
                    <Container>
                        <h1 className="page__title">Новости</h1>
                        {this.state.newsList.map((item, index) =>
                            <div className="news__block">
                                <div className="news__block-title">
                                    {item.title}
                                </div>
                                <div className="news__block-desc">
                                    {item.text}
                                </div>
                            </div>
                        )}
                        <div className="news__all">
                            Всего новостей: {this.state.newsList.length}
                        </div>
                    </Container>
                </div>
            )
        }
        
    }
}