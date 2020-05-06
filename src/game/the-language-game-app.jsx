import React from 'react';
import ReactDOM from 'react-dom';

import { TheLanguageGame } from './the-language-game';
import { syllables as hiragana } from './syllables.jsx';

ReactDOM.render( <TheLanguageGame syllables={ hiragana } />, document.getElementById( 'the-language-game-app' ) );
