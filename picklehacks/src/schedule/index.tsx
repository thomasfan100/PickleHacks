// @ts-nocheck

import React, {useEffect, useState} from 'react';
import './index.css';

import { Card, DatePicker, Modal, Input } from 'antd';
import moment from 'moment';
import "antd/dist/antd.css";

import { TOR, ATL, BOS, BKN, CHA, CHI, CLE, DAL, DEN, DET, GSW, HOU, IND, LAC, LAL, MEM, MIA, MIL, MIN, NOP, NYK, OKC, ORL, PHI, PHX, POR, SAC, SAS, UTA, WAS } from 'react-nba-logos';

const { Search } = Input;

function Schedule() {
    let [games, setGames] = useState([]);
    let [day, setDay] = useState(new Date().getDate() - 1);
    let [month, setMonth] = useState(new Date().getMonth());
    let t_games = [];

    let [players, setPlayers] = useState([]);
    let t_players = [];

    const [isModalVisible, setIsModalVisible] = useState(false);

    let [currentGame, setCurrentGame] = useState([]);

    const returnLogo = (abbreviation) => {
        if (abbreviation == "TOR") {
            return <TOR size={20} />
        }
        else if (abbreviation == "ATL") {
            return <ATL size={20} />
        }
        else if (abbreviation == "BOS") {
            return <BOS size={20} />
        }
        else if (abbreviation == "BKN") {
            return <BKN size={20} />
        }
        else if (abbreviation == "CHA") {
            return <CHA size={20} />
        }
        else if (abbreviation == "CHI") {
            return <CHI size={20} />
        }
        else if (abbreviation == "CLE") {
            return <CLE size={20} />
        }
        else if (abbreviation == "DAL") {
            return <DAL size={20} />
        }
        else if (abbreviation == "DEN") {
            return <DEN size={20} />
        }
        else if (abbreviation == "DET") {
            return <DET size={20} />
        }
        else if (abbreviation == "GSW") {
            return <GSW size={20} />
        }
        else if (abbreviation == "HOU") {
            return <HOU size={20} />
        }
        else if (abbreviation == "IND") {
            return <IND size={20} />
        }
        else if (abbreviation == "LAC") {
            return <LAC size={20} />
        }
        else if (abbreviation == "LAL") {
            return <LAL size={20} />
        }
        else if (abbreviation == "MEM") {
            return <MEM size={20} />
        }
        else if (abbreviation == "MIA") {
            return <MIA size={20} />
        }
        else if (abbreviation == "MIL") {
            return <MIL size={20} />
        }
        else if (abbreviation == "MIN") {
            return <MIN size={20} />
        }
        else if (abbreviation == "NOP") {
            return <NOP size={20} />
        }
        else if (abbreviation == "NYK") {
            return <NYK size={20} />
        }
        else if (abbreviation == "OKC") {
            return <OKC size={20} />
        }
        else if (abbreviation == "ORL") {
            return <ORL size={20} />
        }
        else if (abbreviation == "PHI") {
            return <PHI size={20} />
        }
        else if (abbreviation == "PHX") {
            return <PHX size={20} />
        }
        else if (abbreviation == "POR") {
            return <POR size={20} />
        }
        else if (abbreviation == "SAC") {
            return <SAC size={20} />
        }
        else if (abbreviation == "SAS") {
            return <SAS size={20} />
        }
        else if (abbreviation == "UTA") {
            return <UTA size={20} />
        }
        else if (abbreviation == "WAS") {
            return <WAS size={20} />
        }
    };

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
                    temp_games.push([result.data[i].date, result.data[i].home_team.full_name, result.data[i].home_team_score, result.data[i].visitor_team.full_name, result.data[i].visitor_team_score, result.data[i].id, result.data[i].home_team.abbreviation, result.data[i].visitor_team.abbreviation, result.data[i].status, result.data[i].home_team.id, result.data[i].visitor_team.id])
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
                            temp_games.push([result.data[i].date, result.data[i].home_team.full_name, result.data[i].home_team_score, 
                                            result.data[i].visitor_team.full_name, result.data[i].visitor_team_score, result.data[i].id,
                                            result.data[i].home_team.abbreviation, result.data[i].visitor_team.abbreviation,
                                            result.data[i].status, result.data[i].home_team.id, result.data[i].visitor_team.id])
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

    const getPlayers = () => {
        let page = 1;
        let total_pages = 0;
        fetch(`https://balldontlie.io/api/v1/players?&per_page100&page=${page}`)
            .then(res => res.json())
            .then(
            (result) => {
                let temp_players = [];
                for (let i = 0; i < result.data.length; i++) {
                    temp_players.push([result.data[i].first_name, result.data[i].last_name])
                }
                t_players = t_players.concat(temp_players);
                total_pages = result.meta.total_pages;
            },
            (error) => {
                console.log(error);
            }
        ).then(() => {
            for (let i = 1; i < total_pages; i++) {
                page++;
                fetch(`https://balldontlie.io/api/v1/players?&per_page100&page=${page}`)
                    .then(res => res.json())
                    .then(
                    (result) => {
                        let temp_players = [];
                        for (let i = 0; i < result.data.length; i++) {
                            temp_players.push([result.data[i].first_name, result.data[i].last_name])
                        }
                        t_players = t_players.concat(temp_players);
                    },
                    (error) => {
                        console.log(error);
                    }
                ).then(() => {
                    setPlayers(t_players);
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
                        getPlayers();
                    }}>
                        <div>
                            <p>{game[8]}</p>
                            {returnLogo(game[6])} {game[1]} <strong>{game[2]}</strong>
                        </div>
                        <div>
                            {returnLogo(game[7])} {game[3]} <strong>{game[4]}</strong>
                        </div>
                    </Card.Grid>
                );
            })}

        <Modal title="Game Summary" visible={isModalVisible} footer={null} onCancel={() => {
            setIsModalVisible(false);
        }}>
            Goat or Nope
            {players}
        </Modal>
        </div>
    );
}

export default Schedule;
