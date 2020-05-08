import React, { useContext } from 'react';

import { TimerBarContext } from '../the-language-game.jsx';
import './timer-bar.scss';

export const TimerBar = () => {
	return (
		<div className="meter">
            <span>
                <span className="progress"></span>
            </span>
        </div>
	);
};
