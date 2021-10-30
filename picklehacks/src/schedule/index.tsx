// @ts-nocheck

import React, {useEffect, useState} from 'react';
import './index.css';

import { Card, DatePicker } from 'antd';
import "antd/dist/antd.css";

function Schedule() {
    let [games, setGames] = useState([]);
    let [day, setDay] = useState(new Date().getDate());
    let [month, setMonth] = useState(new Date().getMonth());
    let t_games = [];

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
            <DatePicker onChange={(date) => {
                setDay(date?.toDate().getDate());
                setMonth(date?.toDate().getMonth())
            }} />

            <br />

            {games.map((game) => {
                return (
                    <Card.Grid style={gridStyle, {display: ((new Date(game[0]).getDate() == day) && (new Date(game[0]).getMonth() == month)) ? "block" : "none"}}>
                        <div>
                            {game[1]} <strong>{game[2]}</strong>
                        </div>
                        <div>
                            {game[3]} <strong>{game[4]}</strong>
                        </div>
                    </Card.Grid>
                );
            })}
        </div>
    );
}

export default Schedule;
