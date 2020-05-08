import React from 'react';

import './timer-bar.scss';

export const TimerBar = ( { duration } ) => {

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
