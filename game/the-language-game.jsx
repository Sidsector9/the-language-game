/**
 * External dependencies
 */
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

/**
 * Internal dependencies
 */
import { Scoreboard } from './scoreboard/scoreboard.jsx';
import { syllables as hiragana } from './syllables.jsx';
import './tlg.scss';

/**
 * Shuffles the array in a non-biased manner.
 *
 * @param {Array} array Input array to be shuffled.
 *
 * @return {Array} Shuffled array.
 */
const shuffleArray = ( array ) => {
	const newArray = [ ...array ];

	for ( let i = newArray.length - 1; i > 0; i-- ) {
		const j = Math.floor( Math.random() * ( i + 1 ) );
		[ newArray[ i ], newArray[ j ] ] = [ newArray[ j ], newArray[ i ] ];
	}

	return newArray;
};

const TheLanguageGame = ( props ) => {
	let i = 0;
	const isShuffled = false;

	const appContainer = useRef();

	/**
	 * Deconstruct props object.
	 */
	const { syllables } = props;

	/**
	 * Shuffle the syllable array.
	 */
	let syllablesArray;

	/**
	 * useEffect will run every time when a component is updated and we
	 * don't want the syllable to shuffle on every render.
	 *
	 * This will shuffle once all syllables are iterated in the array.
	 */
	if ( ! isShuffled ) {
		syllablesArray = shuffleArray( syllables );
	}

	/**
	 * The current syllable visible in the viewport and the function to update it.
	 */
	const [ currentSyllable, updateCurrentSyllable ] = useState( '' );

	/**
	 * Sets gameStatus to `true` when the game is started and `false` otherwise.
	 */
	const [ gameStatus, updateGameStatus ] = useState( false );

	/**
	 * The speed for the interval. Defaults to 5000ms.
	 */
	const [ speed, updateSpeed ] = useState( 5 );

	/**
	 * Sets to true when a key is pressed on a syllable.
	 * Resets to false when a new syllable is rendered in the viewport.
	 */
	const [ markStatus, updateMarkStatus ] = useState( false );

	/**
	 * Maintains a hashmap of scores assign to each syllable.
	 */
	const [ scoreMap, updateScoreMap ] = useState( generateScoreMapping() );

	/**
	 * Toggles the visibility of the scoreboard.
	 */
	const [ scoreboardStatus, setScoreboardStatus ] = useState( false );

	/**
	 * Toggles `gameStatus` boolean when start | stopped and
	 * then focuses on the container app.
	 */
	const updateGameStatusWrapper = () => {
		updateGameStatus( ! gameStatus );
		appContainer.current.focus();
	};

	function generateScoreMapping() {
		const scoreMapHash = {};

		syllables.forEach( ( syllable ) => {
			scoreMapHash[ syllable ] = {
				score: 0,
			};
		} );
		return scoreMapHash;
	}

	/**
	 * Marks the syllable after a key is pressed.
	 */
	const updateMarkStatusWrapper = () => {
		/**
		 * Return if already marked.
		 * We don't want to mark a syllable multiple times, it will mess up the score.
		 */
		if ( markStatus ) {
			return;
		}

		/**
		 * Mark only if the game has started, else return.
		 */
		if ( ! gameStatus ) {
			return;
		}

		updateMarkStatus( true );

		/**
		 * Update the score of the current syllable in the viewport.
		 */
		const newScoreMap = { ...scoreMap };
		newScoreMap[ currentSyllable ].score++;
		updateScoreMap( newScoreMap );
	};

	useEffect( () => {
		let intervalId;

		if ( gameStatus ) {
			/**
			 * Without this line the game would start after `speed` seconds.
			 */
			updateCurrentSyllable( syllablesArray[ i++ ] );

			/**
			 * Executes a callback every `speed` seconds.
			 */
			intervalId = setInterval( () => {
				/**
				 * Reset `i` = 0 when it has iterated over the array then reshuffle.
				 */
				if ( syllablesArray.length === i ) {
					i = 0;
					syllablesArray = shuffleArray( syllables );
				}

				/**
				 * Updates the value of the current syllable in the viewport.
				 */
				updateCurrentSyllable( syllablesArray[ i++ ] );

				/**
				 * Removes the mark for the next syllable.
				 */
				updateMarkStatus( false );
			}, speed * 1000 );
		} else {
			clearInterval( intervalId );
		}

		return () => clearInterval( intervalId );
	}, [ i, isShuffled, gameStatus ] );

	return (
		<div role="button" tabIndex={ 0 } className="tlg-app" ref={ appContainer } onKeyDown={ updateMarkStatusWrapper }>
			{ ! gameStatus && <div tabIndex={ 0 } role="button" className="tlg-app__scoreboard-button" onClick={ () => setScoreboardStatus( ! scoreboardStatus ) } onKeyDown={ () => setScoreboardStatus( true ) }>Scoreboards</div> }
			<div className="tlg-app__container">
				<div className={ `tlg-app__syllable ${ markStatus ? 'has-text-primary' : '' }` }>{ currentSyllable }</div>
				{ ! gameStatus && <input placeholder="Speed (in seconds)" className="input is-primary" id="tlg-speed-input" type="number" value={ speed } onChange={ ( e ) => updateSpeed( Number( e.target.value ) < 1 && '' !== e.target.value ? 1 : e.target.value ) } /> }
				<button className="tlg-app__play-button button is-primary is-medium" onClick={ updateGameStatusWrapper }>{ gameStatus ? 'Stop' : 'Start' }</button>
			</div>
			<Scoreboard scoreMap={ scoreMap } scoreboardStatus={ scoreboardStatus } setScoreboardStatus={ setScoreboardStatus } />
		</div>
	);
};

const TheLanguageGameApp = () => {
	return <TheLanguageGame syllables={ hiragana } />;
};

ReactDOM.render( <TheLanguageGameApp />, document.getElementById( 'the-language-game-app' ) );
