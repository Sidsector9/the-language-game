import React from 'react';

import './timer-bar.scss';

/**
 * Renders a progress bar below the viewport which indicates
 * time remaining before next syllable is rendered.
 *
 * @param {Object} props Prop object for TimerBar.
 */
export const TimerBar = ( props ) => {
	const { duration } = props;

	return (
		<div className="tlg-app__progress-bar">
			<span className="tlg-app__progress-bar-container">
				<span className="tlg-app__progress-bar-entity" style={ {
					animationDuration: `${ duration }s`,
				} }></span>
			</span>
		</div>
	);
};
