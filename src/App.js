import React, { Component } from 'react';
import classes from './App.css';
import TrelloTasks from './containers/TrelloTasks/TrelloTasks';
import Blackboard from './media/images/blackboard.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

	render() {
		return (
			<div className={classes.App} style={{ background: `url(${Blackboard}) center center / cover no-repeat fixed` }}>
				<TrelloTasks />
			</div>
		);
	}
}

export default App;
