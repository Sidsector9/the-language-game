/**
 * External dependencies
 */
import React, { useContext } from 'react';

/**
 * Internal dependencies
 */
import { ScoreboardModal } from '../scoreboard-modal/scoreboard-modal.jsx';
import { CycleHistoryModal } from '../cycle-history-modal/cycle-history-modal.jsx';
import { InfoBarContext } from '../the-language-game.jsx';
import './info-bar.scss';

/**
 * Renders buttons when the game is paused (not running).
 */
export const InfoBar = () => {
	const {
		gameStatus,
		modalStatuses,
		modalSetters,
	} = useContext( InfoBarContext );

	/**
	 * Sets the status of all the modals to `false`.
	 * Sets the status of the current modal to `true`.
	 *
	 * @param {string} status Status of the current modal.
	 * @param {string} setter Name of the function that sets the status of the current modal.
	 */
	const setModalStatusWrapper = ( status, setter ) => {
		Object.keys( modalSetters ).forEach( ( setterFn ) => modalSetters[ setterFn ]( false ) );
		modalSetters[ setter ]( ! modalStatuses[ status ] );
	};

	return (
		<div className={ `tlg-app__info-bar ${ gameStatus ? 'is-invisible' : '' }` }>
			<div tabIndex={ 0 } role="button" className="tlg-app__info-bar-item tlg-app__info-bar-item--scoreboard" onClick={ () => setModalStatusWrapper( 'scoreboardModalStatus', 'setScoreboardModalStatus' ) } onKeyDown={ () => setModalStatusWrapper( 'scoreboardModalStatus', 'setScoreboardModalStatus' ) }>Scoreboard</div>
			<div tabIndex={ 0 } role="button" className="tlg-app__info-bar-item tlg-app__info-bar-item--cycle-history" onClick={ () => setModalStatusWrapper( 'cycleHistoryModalStatus', 'setCycleHistoryModalStatus' ) } onKeyDown={ () => setModalStatusWrapper( 'cycleHistoryModalStatus', 'setCycleHistoryModalStatus' ) }>Cycle history</div>
			<ScoreboardModal />
			<CycleHistoryModal />
		</div>
	);
};
