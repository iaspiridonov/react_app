import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import Vk from "../src_public/vk.png";
import Telegram from "../src_public/telegram.png";
import Web from "../src_public/site.png";
import Youtube from "../src_public/youtube.png";
import Twitter from "../src_public/twitter.png";
import Twitch from "../src_public/twitch.png";

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isLoaded: false,
          resFetch: '',
          city: '',
          languages: [],
          social: [],
          notFound: true
        };
      }

    componentDidMount() {
        const id = localStorage.getItem('id');
        fetch("https://mysterious-reef-29460.herokuapp.com/api/v1/user-info/"+id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              status: result.status,
              isLoaded: true,
            });
            if (this.state.status === 'ok') {
                this.setState({
                    resFetch: result,
                    city: result.data.city,
                    languages: result.data.languages,
                    social: result.data.social,
                    notFound: false
                })
            }
            else {
                this.setState({
                  notFound: true
                })
            }
            localStorage.setItem('resFetch', JSON.stringify(this.state.resFetch));
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        );
    }
    
    render() {
        const { social, city, notFound, isLoaded, error } = this.state;
        const links = [
            {Vk},
            {Telegram},
            {Web}, 
            {Youtube},
            {Twitter},
            {Twitch}
        ];

        console.log(notFound);
        var socialLinks = social.concat(links);

        socialLinks[0].path = links[0].Vk;
        socialLinks[1].path = links[1].Telegram;
        socialLinks[2].path = links[2].Web;
        socialLinks[3].path = links[3].Youtube;
        socialLinks[4].path = links[4].Twitter;
        socialLinks[5].path = links[5].Twitch;
        socialLinks.splice(6);

        if (error) {
            return <Container><h1 className="page__title">Ошибка: {error.message}</h1></Container>;
        
        } else if (!isLoaded) {
            return <Container><h1 className="page__title">Загрузка...</h1></Container>;
        } else if (notFound) {
            return (
                <div>
                    <Container>
                        <h1 className="page__title">Пользователь не найден</h1>
                    </Container>
                </div>
            )
        } else {
            return (
                <div>
                    <Container>
                        <h1 className="page__title">Профиль</h1>
                        <div className="profile__block">
                            <p>Город: <b>{city}</b></p>
                            <p>Знание языков:</p>
                            <ul>
                                <div>
                                    {this.state.languages.map((item) =>
                                        <li>
                                            <b>{item}</b>
                                        </li>
                                    )}
                                </div>
                            </ul>
                            
                            <p>Ссылки:</p>
                            <ul className="profile__social">
                                <div>
                                {socialLinks.map((item) =>
                                        <li>
                                            <a target="_blank" href={item.link}>
                                                <img src={item.path} alt={item.label}/>
                                            </a>
                                        </li>
                                    )}
                                </div>
                            </ul>
                        </div>
                    </Container>
                </div>
            )
        }
    }
}