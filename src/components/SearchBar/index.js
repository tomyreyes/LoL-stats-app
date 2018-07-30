import React, { Component } from 'react'
import { Button, Input } from 'semantic-ui-react'


class SearchBar extends Component {
	constructor() {
		super()
		this.state = {
			searchText: ''
		}
	}

	searchInput = e => {
		this.setState({ searchText: e.target.value })
	}

	renderInputBar = () => {
		return (
			<Input
				type='text'
				onChange={this.searchInput}
				onKeyDown={e => {
					if (e.keyCode === 13) this.props.searchUser(this.state.searchText)
				}}

				placeholder='Search...'
				action
			>
				<input />
				<Button
					type='submit'
					onClick={() => this.props.searchUser(this.state.searchText)}
				>
					Search
				</Button>
			</Input>
		)
	}

	render() {
		return (
			<div className="search">
				{this.renderInputBar()}
			</div>
		);
	}
}

export default SearchBar;
