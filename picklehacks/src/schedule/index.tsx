// @ts-nocheck

import React, {useEffect, useState} from 'react';
import './index.css';

import { Card, DatePicker, Modal, Input } from 'antd';
import moment from 'moment';
import "antd/dist/antd.css";

const { Search } = Input;

function Schedule() {
    let [games, setGames] = useState([]);
    let [day, setDay] = useState(new Date().getDate() - 1);
    let [month, setMonth] = useState(new Date().getMonth());
    let t_games = [];

    const [isModalVisible, setIsModalVisible] = useState(false);

    let [currentGame, setCurrentGame] = useState([]);

    let messages = [
        {
            "id": 13123,
            "time": "Thu Oct 28 2021",
            "message": "Great game!"
        },
        {
            "id": 543543,
            "time": "Thu Oct 30 2021",
            "message": "How could they lose! The ref blew the game!!!"
        }
    ]

    const gridStyle = {
        width: '25%',
        textAlign: 'center',
    };

    const getData = () => {
        let page = 1;
        let total_pages = 0;
        fetch(`https://balldontlie.io/api/v1/games?seasons[]=2021&per_page100&page=${page}`)
            .then(res => res.json())
            .then(
            (result) => {
                let temp_games = [];
                for (let i = 0; i < result.data.length; i++) {
                    temp_games.push([result.data[i].date, result.data[i].home_team.full_name, result.data[i].home_team_score, result.data[i].visitor_team.full_name, result.data[i].visitor_team_score])
                }
                t_games = t_games.concat(temp_games);
                total_pages = result.meta.total_pages;
            },
            (error) => {
                console.log(error);
            }
        ).then(() => {
            for (let i = 1; i < total_pages; i++) {
                page++;
                fetch(`https://balldontlie.io/api/v1/games?seasons[]=2021&per_page100&page=${page}`)
                    .then(res => res.json())
                    .then(
                    (result) => {
                        let temp_games = [];
                        for (let i = 0; i < result.data.length; i++) {
                            temp_games.push([new Date(result.data[i].date).toDateString(), result.data[i].home_team.full_name, result.data[i].home_team_score, result.data[i].visitor_team.full_name, result.data[i].visitor_team_score])
                        }
                        t_games = t_games.concat(temp_games);
                    },
                    (error) => {
                        console.log(error);
                    }
                ).then(() => {
                    setGames(t_games);
                });
            }
        });
    };

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <div style={{width: '100%', textAlign: 'center', marginTop: 50, marginBottom: 50}}>
                <DatePicker defaultValue={moment(new Date(), 'YYYY/MM/DD')} onChange={(date) => {
                    setDay(date?.toDate().getDate() - 1);
                    setMonth(date?.toDate().getMonth())
                }} />
            </div>

            <br />

            {games.map((game) => {
                return (
                    <Card.Grid style={gridStyle, {display: ((new Date(game[0]).getDate() == day) && (new Date(game[0]).getMonth() == month)) ? "block" : "none"}} onClick={() => {
                        setCurrentGame(game)
                        setIsModalVisible(true);
                    }}>
                        <div>
                            {game[1]} <strong>{game[2]}</strong>
                        </div>
                        <div>
                            {game[3]} <strong>{game[4]}</strong>
                        </div>
                    </Card.Grid>
                );
            })}

        <Modal title="Game Summary" visible={isModalVisible} footer={null} onCancel={() => {
            setIsModalVisible(false);
        }}>
            <p>Date: {new Date(currentGame[0]).toDateString()}</p>
            <br />
            <p>Home Team: {currentGame[1]} <strong>{currentGame[2]}</strong></p>
            <p>Away Team: {currentGame[3]} <strong>{currentGame[4]}</strong></p>
            
            <div style={{marginTop: 50}}>
                <hr />
                <p><strong>Game Thread</strong></p>
                <hr />
                {messages.map((message) => {
                    return (
                        <div className="message">
                            <p>{message.time}</p>
                            <p>{message.message}</p>
                        </div>
                    );
                })}
                <Search
                    placeholder="Post a message about the game!"
                    allowClear
                    enterButton="Post"
                    size="large"
                    style={{marginTop: 50}}
                />
            </div>
        </Modal>
        </div>
    );
}

export default Schedule;
