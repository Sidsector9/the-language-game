import React from 'react';
import ReactDOM from 'react-dom';

import { syllables } from './syllables.jsx';
import './tlg.scss';

class TheLanguageGame extends React.Component {
	constructor( props ) {
		super( props );

		this.shuffleSyllables = this.shuffleSyllables.bind( this );
		this.iKnowThisSyllable = this.iKnowThisSyllable.bind( this );
		this.updateRecordScoreStatus = this.updateRecordScoreStatus.bind( this );
		this.generateScoreMapping = this.generateScoreMapping.bind( this );
		this.updateSpeed = this.updateSpeed.bind( this );
		this.toggleScoreBoard = this.toggleScoreBoard.bind( this );

		this.intervalId = null;

		this.state = {
			syllablleArray: this.props.syllables,
			currentSyllable: '',
			recordScoreStatus: false,
			scoreChart: this.generateScoreMapping( this.props.syllables ),
			mark: false,
			speed: 5,
			isReportOpen: false,
		}
	}

	componentDidMount() {
		this.ref.focus();

		this.setState( {
			syllablleArray: this.shuffleSyllables( this.state.syllablleArray ),
		} );
	}

	componentDidUpdate( prevProps, prevState ) {
		if ( prevState.recordScoreStatus !== this.state.recordScoreStatus ) {
			let i = 0;

			if ( ! this.state.recordScoreStatus ) {
				clearInterval( this.intervalId )
			} else {
				this.setState( {
					currentSyllable: this.state.syllablleArray[ i++ ]
				} );
				this.intervalId = setInterval( () => {
					if ( this.state.syllablleArray.length - 1 === i ) {
						this.setState( {
							syllablleArray: this.shuffleSyllables( this.state.syllablleArray )
						} );
						i = 0;
					}
					
					this.setState( {
						currentSyllable: this.state.syllablleArray[ i++ ],
						mark: false,
					} );
				}, this.state.speed * 1000 );
			}
		}
	}

	shuffleSyllables( syllablleArray ) {
		let newSyllableArray = [ ...syllablleArray ];

		for ( let i = newSyllableArray.length - 1; i > 0; i-- ) {
			const j = Math.floor( Math.random() * ( i + 1 ) );
			[ newSyllableArray[ i ], newSyllableArray[ j ] ] = [ newSyllableArray[ j ], newSyllableArray[ i ] ];
		}
		
		return newSyllableArray;
	}

	iKnowThisSyllable() {
		if ( ! this.state.recordScoreStatus ) {
			return;
		}

		if ( this.state.mark ) {
			return;
		}

		let updatedScoreChart;

		updatedScoreChart = this.state.scoreChart.map( ( item ) => {
			if ( item.syllable === this.state.currentSyllable ) {
				++item.score;
			}

			return item;
		} );

		this.setState( {
			scoreChart: updatedScoreChart,
			mark: true,
		} )
	}

	updateRecordScoreStatus() {
		this.setState( {
			recordScoreStatus: ! this.state.recordScoreStatus
		}, () => {
			this.ref.focus();
		} );
	}

	generateScoreMapping( syllablleArray ) {
		return syllablleArray.map( ( syllable ) => ( {
			syllable,
			score: 0,
		} ) );
	}

	updateSpeed( e ) {
		this.setState( {
			speed: !! e.target.value ? e.target.value : 5
		} );
	}

	toggleScoreBoard() {
		this.setState( {
			isReportOpen: ! this.state.isReportOpen,
		} )
	}

	render() {
		return (
			<div tabIndex={ 0 } ref={ ( c ) => { this.ref = c } } onKeyDown={ this.iKnowThisSyllable } className="tlg-app">
				{ ! this.state.isReportOpen && ! this.state.recordScoreStatus && <div className="tlg-app__scoreboard-button" onClick={ this.toggleScoreBoard }>Scoreboard</div> }
				<div className="tlg-app__container">
					<div className={ `tlg-app__syllable ${ this.state.mark ? 'tlg-app__marked' : '' }` }>{ this.state.currentSyllable }</div>
					{ ! this.state.recordScoreStatus && <label>Speed (in seconds):<input type="number" onChange={ this.updateSpeed } /></label> }
					<button className="tlg-app__record-status-button" onClick={ this.updateRecordScoreStatus }>{ this.state.recordScoreStatus ? 'Stop' : 'Start' }</button>
				</div>
				{ this.state.isReportOpen && <div className="tlg-app__scoreboard">
					<div className="tlg-app__scoreboard-close-button" onClick={ this.toggleScoreBoard }>X</div>
					{ this.state.scoreChart.map( ( item, index ) => ( <div key={ index } className="tlg-app__scoreboard-item">
						<div className="tlg-app__scoreboard-item-name">{ item.syllable }</div>
						<div className="tlg-app__scoreboard-item-score">{ item.score }</div>
					</div> ) ) }
				</div> }
			</div>
		)
	}
}

const TheLanguageGameApp = () => {
	return <TheLanguageGame syllables={ syllables } />
};

ReactDOM.render( <TheLanguageGameApp />, document.getElementById( 'the-language-game-app' ) );
