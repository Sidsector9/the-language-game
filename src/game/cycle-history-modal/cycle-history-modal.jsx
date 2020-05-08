/**
 * External dependencies
 */
import React, { useContext } from 'react';

/**
 * Internal dependencies
 */
import { ControlBarContext } from '../the-language-game.jsx';
import './cycle-history-modal.scss';
import { syllables } from '../syllables.jsx';

export const CycleHistoryModal = () => {
	const {
		uniqueSyllablesCount,
		cycleHistory,
		modalStatuses,
		modalSetters,
	} = useContext( ControlBarContext );

	return (
		modalStatuses.cycleHistoryModalStatus && <div className="tlg-app__modal-container">
			<div className={ `tlg-app__cycle-history-modal modal is-active` }>
				<div tabIndex={ 0 } role="button" className="modal-background" onClick={ () => modalSetters.setCycleHistoryModalStatus( false ) }></div>
				<div className="modal-card">
					<header className="modal-card-head">
						<p className="modal-card-title">Cycle history</p>
						<button className="delete" aria-label="close" onClick={ () => modalSetters.setCycleHistoryModalStatus( false ) }></button>
					</header>
					<section className="modal-card-body">
						<div className="tlg-app__cycle-history-item-container">
						{ cycleHistory.map( ( syllableObject, index ) => (
							<div key={ index } className="tlg-app__cycle-history-item">
								<div className="tlg-app__cycle-history-item-syllable">{ syllableObject.syllable }</div>
								<div className="tlg-app__cycle-history-item-translation">{ syllableObject.translation }</div>
							</div>
						) ) }
						</div>
					</section>
					<footer className="modal-card-foot tlg-app__cycle-history-meta">
						<div className="tlg-app__cycle-history-meta-item">Unique Syllables: { uniqueSyllablesCount }</div>
						<div className="tlg-app__cycle-history-meta-item">Syllables Praticed: { cycleHistory.length }</div>
					</footer>
				</div>
			</div>
		</div>
	);
};
