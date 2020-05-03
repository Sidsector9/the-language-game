import React from 'react';
import ReactDOM from 'react-dom';

import { syllables } from './syllables.jsx';

class TheLanguageGame extends React.Component {
	constructor( props ) {
		super( props );

		this.shuffleSyllables = this.shuffleSyllables.bind( this );

		this.state = {
			syllablleArray: this.props.syllables,
			currentSyllable: '',
		}
	}

	componentDidMount() {
		this.setState( {
			syllablleArray: this.shuffleSyllables( this.state.syllablleArray ),
		}, () => {
			let i = 0;
			setInterval( () => {
				if ( this.state.syllablleArray.length - 1 === i ) {
					this.setState( {
						syllablleArray: this.shuffleSyllables( this.state.syllablleArray )
					} );
					i = 0;
				}

				this.setState( {
					currentSyllable: this.state.syllablleArray[ i++ ]
				} );
			}, 2000 );
		} );
	}

	shuffleSyllables( syllablleArray ) {
		let newSyllableArray = [ ...syllablleArray ];

		for ( let i = newSyllableArray.length - 1; i > 0; i-- ) {
			const j = Math.floor( Math.random() * (i + 1) );
			[ newSyllableArray[i], newSyllableArray[j] ] = [ newSyllableArray[j], newSyllableArray[i] ];
		}
		
		return newSyllableArray;
	}

	render() {
		return (
			<div>
				<div>{ this.state.currentSyllable }</div>
			</div>
		)
	}
}

const TheLanguageGameApp = () => {
	return <TheLanguageGame syllables={ syllables } />
};

ReactDOM.render( <TheLanguageGameApp />, document.getElementById( 'the-language-game-app' ) );
