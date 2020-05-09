/**
 * External dependencies
 */
import React, { useContext } from 'react';

/**
 * Internal dependencies
 */
import { InfoBarContext } from '../the-language-game.jsx';
import './scoreboard-modal.scss';

/**
 * Renders a screen which displays the score for each syllable that were marked
 * during the game.
 */
export const ScoreboardModal = () => {
	const {
		scoreMap,
		setScoreboardModalStatus,
		modalStatuses,
		modalSetters,
	} = useContext( InfoBarContext );

	return (
		modalStatuses.scoreboardModalStatus && <div className="tlg-app__modal-container">
			<div className="tlg-app__scoreboard-modal modal is-active">
				<div tabIndex={ 0 } role="button" className="modal-background" onClick={ () => modalSetters.setScoreboardModalStatus( false ) } onKeyDown={ () => setScoreboardModalStatus( false ) }></div>
				<div className="modal-card">
					<header className="modal-card-head">
						<p className="modal-card-title">Scoreboard</p>
						<button className="delete" aria-label="close" onClick={ () => modalSetters.setScoreboardModalStatus( false ) }></button>
					</header>
					<section className="modal-card-body">
						<div className="tlg-app__scoreboard">
							{ Object.keys( scoreMap ).map( ( syllable, index ) => <div key={ index } className="tlg-app__scoreboard-item">
								<div className="tlg-app__scoreboard-item-translation">{ scoreMap[ syllable ].translation }</div>
								<div className="tlg-app__scoreboard-item-syllable">{ syllable }</div>
								<div className="tlg-app__scoreboard-item-score">{ scoreMap[ syllable ].score }</div>
							</div> ) }
						</div>
					</section>
				</div>
			</div>
		</div>
	);
};
