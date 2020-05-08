/**
 * External dependencies
 */
import React, { useContext } from 'react';

/**
 * Internal dependencies
 */
import { ControlBarContext } from '../the-language-game.jsx';
import './controls.scss';

export const ControlBar = () => {
	const {
		gameStatus,
		cycleHistory,
		modalStatuses,
		modalSetters,
	} = useContext( ControlBarContext );

	const setModalStatusWrapper = ( status, setter ) => {
		Object.keys( modalSetters ).forEach( ( setter ) => modalSetters[ setter ]( false ) );
		modalSetters[ setter ]( ! modalStatuses[ status ] );
	}

	return (
		! gameStatus && <div className="tlg-app__controls">
			<div tabIndex={ 0 } role="button" className="tlg-app__controls-item tlg-app__controls-item--scoreboard" onClick={ () => setModalStatusWrapper( 'scoreboardModalStatus', 'setScoreboardModalStatus' ) } onKeyDown={ () => setModalStatusWrapper( 'scoreboardModalStatus', 'setScoreboardModalStatus' ) }>Scoreboard</div>
			{ !! cycleHistory.length && <div tabIndex={ 0 } role="button" className="tlg-app__controls-item tlg-app__controls-item--cycle-history" onClick={ () => setModalStatusWrapper( 'cycleHistoryModalStatus', 'setCycleHistoryModalStatus' ) } onKeyDown={ () => setModalStatusWrapper( 'cycleHistoryModalStatus', 'setCycleHistoryModalStatus' ) }>Cycle history</div> }
		</div>
	);
};
