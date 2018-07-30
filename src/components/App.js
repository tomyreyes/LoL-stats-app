import React, { Component } from 'react';
import SearchBar from '../components/SearchBar'
import SummonerDetails from '../components/SummonerDetails'
import axios from 'axios'
import '../index.css'


class App extends Component {
	constructor() {
		super()
		this.state = {
			summonerData: null,
			latestMatches: null,
			latestMatchIDs: null
		}
	}

	searchUser = async (summonerName) => {
		const response = await axios.post(`http://localhost:4000/user-matches`, {
			summonerName
		})
		const matchIDs = response.data.latestMatches.map(match => match['gameId'])
		this.setState({
			summonerData: response.data.summonerData,
			latestMatches: response.data.latestMatches,
			latestMatchIDs: matchIDs
		})
	}

	render() {
		return (
			<div className="app">
				<h1 className="subtitle">League of Legends Statistics</h1>
				<SearchBar
					searchUser={this.searchUser}
				/>
				{
					this.state.latestMatchIDs === null ?
						<div>
							<h1 className="subtitle">No Profile Selected</h1>
						</div>
						: <SummonerDetails
							summonerData={this.state.summonerData}
							latestMatches={this.state.latestMatches}
							latestMatchIDs={this.state.latestMatchIDs}
						/>
				}
			</div>
		);
	}
}

export default App;
