import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faRedoAlt } from '@fortawesome/free-solid-svg-icons'

import { ControlBarContext } from '../the-language-game.jsx';
import './control-bar.scss';

export const ControlBar = () => {
	const { speed, gameStatus, updateSpeed, updateGameStatusWrapper } = useContext( ControlBarContext );

	const restartGame = () => {
		location.reload();
	}

	return (
		<div className="tlg-app__control-bar">
			<div className="control is-expanded">
				<input placeholder="Speed (in seconds)" disabled={ gameStatus } className="input" id="tlg-app__speed-input" type="number" value={ speed } onChange={ ( e ) => updateSpeed( Number( e.target.value ) < 1 && '' !== e.target.value ? 1 : e.target.value ) } />
			</div>

			<div className="tlg-app__control-bar__buttons">
				<FontAwesomeIcon style={ {
					color: ! speed ? '#bdc3c7' : '#2c3e50',
					cursor: ! speed ? 'not-allowed' : 'pointer',
				} } icon={ gameStatus ? faPause : faPlay } onClick={ updateGameStatusWrapper } />
				<FontAwesomeIcon style={ { color: '#2c3e50' } } icon={ faRedoAlt } onClick={ restartGame } />
			</div>
		</div>
	);
};
