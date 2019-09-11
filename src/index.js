import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {
	state = { lat: null, load: true, error: false, errMessage: '' };

	componentDidMount() {
		window.navigator.geolocation.getCurrentPosition(
			position =>
				this.setState({ lat: position.coords.latitude, load: false }),
			err =>
				this.setState({ error: true, errMessage: err.message, load: false })
		);
	}

	// React says we have to define render!!
	render() {
		const { load, lat, error, errMessage } = this.state;
		return (
			<div>
				{load && <Spinner message='Please accept location request' />}
				{!load && !error && <SeasonDisplay lat={lat} />}
				{!load && error && (
					<div>
						<i className='times circle icon' />
						Error: {errMessage}
					</div>
				)}
			</div>
		);
	}
}

ReactDOM.render(<App />, document.querySelector('#root'));
