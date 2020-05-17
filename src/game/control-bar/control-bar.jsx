/**
 * External dependencies
 */
import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faRedoAlt } from '@fortawesome/free-solid-svg-icons';

/**
 * Internal dependencies
 */
import { ControlBarContext } from '../the-language-game.jsx';
import './control-bar.scss';

/**
 * Renders controls to play/pause and restart the game.
 */
export const ControlBar = () => {
	const { speed, gameStatus, updateSpeed, updateGameStatusWrapper } = useContext( ControlBarContext );

	/**
	 * Fires when the restart button is clicked and restarts the game.
	 */
	const restartGame = () => {
		location.reload();
	};

	return (
		<div className="tlg-app__control-bar">
			<div className="tlg-app__speed-control is-expanded">
				<input placeholder="Speed (in seconds)" disabled={ gameStatus } className="input tlg-app__speed-input" type="number" value={ speed } onChange={ ( e ) => updateSpeed( Number( e.target.value ) < 1 && e.target.value !== '' ? 1 : e.target.value ) } />
			</div>

			<div className="tlg-app__control-bar__buttons">
				<div className={ `tlg-app__control-bar-button tlg-app__control-bar-button--${ gameStatus ? 'pause' : 'play' }` }>
					<FontAwesomeIcon style={ {
						color: ! speed ? '#bdc3c7' : '#2c3e50',
						cursor: ! speed ? 'not-allowed' : 'pointer',
					} } icon={ gameStatus ? faPause : faPlay } onClick={ updateGameStatusWrapper } />
				</div>
				<div className="tlg-app__control-bar-button tlg-app__control-bar-button--reload">
					<FontAwesomeIcon style={ { color: '#2c3e50' } } icon={ faRedoAlt } onClick={ restartGame } />
				</div>
			</div>
		</div>
	);
};
