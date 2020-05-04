/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import './scoreboard.scss';

export const Scoreboard = ( props ) => {
	const { scoreMap, scoreboardStatus, setScoreboardStatus } = props;

	return (
		<div className={ `tlg-app__scoreboard-modal modal ${ scoreboardStatus ? 'is-active' : '' }` }>
			<div tabIndex={ 0 } role="button" className="modal-background" onClick={ () => setScoreboardStatus( false ) } onKeyDown={ () => setScoreboardStatus( false ) }></div>
			<div className="modal-card">
				<header className="modal-card-head">
					<p className="modal-card-title">Score:</p>
					<button className="delete" aria-label="close" onClick={ () => setScoreboardStatus( false ) }></button>
				</header>
				<section className="modal-card-foot">
					<div className="tlg-app__scoreboard">
						{ Object.keys( scoreMap ).map( ( syllable, index ) => ( <div key={ index } className="tlg-app__scoreboard-item">
							<div className="tlg-app__scoreboard-item-name">{ syllable }</div>
							<div className="tlg-app__scoreboard-item-score">{ scoreMap[ syllable ].score }</div>
						</div> ) ) }
					</div>
				</section>
			</div>
		</div>
	);
};
