/**
 * External dependencies
 */
import React, { useState, useEffect, useRef, createContext } from 'react';
import ReactDOM from 'react-dom';

/**
 * Internal dependencies
 */
import { InfoBar } from './info-bar/info-bar.jsx';
import { SyllableViewport } from './syllable-viewport/syllable-viewport.jsx';
import { TimerBar } from './timer-bar/timer-bar.jsx';
import { ControlBar } from './control-bar/control-bar.jsx';
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

export const InfoBarContext = createContext();
export const SyllableViewportContext = createContext();
export const ControlBarContext = createContext();

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

	const [ cycleHistory, updateCycleHistory ] = useState( [] );

	/**
	 * Toggles the visibility of the scoreboard modal.
	 */
	const [ scoreboardModalStatus, setScoreboardModalStatus ] = useState( false );

	/**
	 * Toggles the visibility of the cycle history modal.
	 */
	const [ cycleHistoryModalStatus, setCycleHistoryModalStatus ] = useState( false );

	const [ theme, setTheme ] = useState( 'light' ); 

	/**
	 * Toggles `gameStatus` boolean when start | stopped and
	 * then focuses on the container app.
	 */
	const updateGameStatusWrapper = () => {
		if ( ! speed ) {
			return;
		}

		updateGameStatus( ! gameStatus );
		appContainer.current.focus();
	};

	function generateScoreMapping() {
		const scoreMapHash = {};

		syllables.forEach( ( syllableObject ) => {
			scoreMapHash[ syllableObject.syllable ] = {
				...syllableObject,
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
		newScoreMap[ currentSyllable.syllable ].score++;
		updateScoreMap( newScoreMap );
	};

	const infoBarContextData = {
		scoreMap,
		gameStatus,
		cycleHistory,
		uniqueSyllablesCount: syllablesArray.length,
		modalStatuses: {
			scoreboardModalStatus,
			cycleHistoryModalStatus,
		},
		modalSetters: {
			setScoreboardModalStatus,
			setCycleHistoryModalStatus,
		}
	}

	const syllableViewportContextData = {
		markStatus,
		currentSyllable: currentSyllable.syllable,
	};

	const controlBarContextData = {
		speed,
		gameStatus,
		updateSpeed,
		updateGameStatusWrapper,
	};

	useEffect( () => {
		let intervalId;

		if ( gameStatus ) {
			/**
			 * Without this line the game would start after `speed` seconds.
			 */
			updateCurrentSyllable( syllablesArray[ i ] );
			cycleHistory.push( syllablesArray[ i ] )
			updateCycleHistory( cycleHistory );
			i++;

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
				updateCurrentSyllable( syllablesArray[ i ] );
				cycleHistory.push( syllablesArray[ i ] );
				updateCycleHistory( cycleHistory );
				i++;

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
		<>
			<div role="button" tabIndex={ 0 } className={ `tlg-app tlg-app--${ theme }` } ref={ appContainer } onKeyDown={ updateMarkStatusWrapper }>
				<h1 className="tlg-app__title">The<br />Language<br />Game</h1>
				<div className="tlg-app__container">
					<InfoBarContext.Provider value={ infoBarContextData }>
						<InfoBar />
					</InfoBarContext.Provider>

					<SyllableViewportContext.Provider value={ syllableViewportContextData }>
						<SyllableViewport />
					</SyllableViewportContext.Provider>

					<div className="tlg-app__timer-bar-wrapper">
						{ gameStatus && <TimerBar duration={ speed } /> }
					</div>
					
					<ControlBarContext.Provider value={ controlBarContextData }>
						<ControlBar />
					</ControlBarContext.Provider>
				</div>
			</div>
		</>
	);
};

const TheLanguageGameApp = () => {
	return <TheLanguageGame syllables={ hiragana } />;
};

ReactDOM.render( <TheLanguageGameApp />, document.getElementById( 'the-language-game-app' ) );
