import React, { Component } from 'react'
import axios from 'axios'
import { Card } from 'semantic-ui-react'
class SummonerDetails extends Component {
	constructor() {
		super()
		this.state = {
			matchHistory: []
		}
	}

	async componentWillMount() {
		await this.props.latestMatchIDs.map(id => {
			return this.createMatchHistory(id)
		})
	}

	createMatchHistory = async (matchID) => {
		const response = await axios.post(`http://localhost:4000/match-details`, {
			matchID
		})
		function Match(length, outcome, champion, KDA, runes, spells, items, level) {
			this.length = length
			this.outcome = outcome
			this.champion = champion
			this.KDA = KDA
			this.runes = runes
			this.spells = spells
			this.items = items
			this.level = level
		}
		let newMatch = new Match()
		Object.values(response.data).forEach(data => {
			this.props.latestMatches.forEach(val => {
				if (data.gameId === val.gameId) {
					newMatch.length = data.gameDuration
					data.participants.forEach(summoner => {
						if (summoner.championId === val.champion) {
							newMatch.win = summoner.stats.win
							newMatch.champion = summoner.championId
							newMatch.KDA = { kills: summoner.stats.kills, deaths: summoner.stats.deaths, assists: summoner.stats.assists }
							newMatch.runes = summoner.runes
							newMatch.spells = { spell1Id: summoner.spell1Id, spell2Id: summoner.spell2Id }
							newMatch.items = { item0: summoner.stats.item0, item1: summoner.stats.item1, item2: summoner.stats.item2, item3: summoner.stats.item3, item4: summoner.stats.item4, item5: summoner.stats.item5 }
							newMatch.level = summoner.stats.champLevel
						}
					})
				}
			})
			this.setState({ matchHistory: this.state.matchHistory.concat(newMatch) })
		})
	}

	renderMatchHistory() {
		const { matchHistory } = this.state
		return matchHistory.map((match, i) => {
			return (
				<Card className={match.win == true ? "victory" : "defeat"} key={i}>
					<h2 >
						Outcome: {match.win === true ? "Win" : "Loss"}
					</h2>
					<h2>Champion: {match.champion}</h2>
					<h2>Level: {match.level}</h2>
					<h2>KDA: K: {match.KDA.kills} / D: {match.KDA.deaths} / A: {match.KDA.assists}</h2>
					<h2>Spells Slot 1: {match.spells.spell1Id}</h2>
					<h2>Spell Slot 2: {match.spells.spell2Id}</h2>
					<h2>Items:</h2>
					<ul>
						{Object.values(match.items).map((item, index) => {
							return <li key={index}>{item}</li>
						})}
					</ul>
				</Card>
			)
		})
	}
	render() {
		const { summonerData } = this.props
		return (
			<div>
				{
					summonerData.name !== null ?
						<h1 className="subtitle">{summonerData.name}</h1>
						: <h1>Summoner does not exist</h1>
				}
				<div className="matchContainer">
					{this.renderMatchHistory()}
				</div>

			</div >
		);
	}
}

export default SummonerDetails;
