import React, { useContext } from 'react';

import { SyllableViewportContext } from '../the-language-game.jsx';
import './syllable-viewport.scss';

export const SyllableViewport = () => {
	const { markStatus, currentSyllable } = useContext( SyllableViewportContext );

	return (
		<div className={ `tlg-app__syllable-viewport ${ markStatus ? 'has-text-primary' : '' }` }>{ currentSyllable }</div>
	);
};
