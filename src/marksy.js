import React from 'react';
import { H1, H2, H3, H4, H5, H6, Code, P, UL, A, LI, Pre } from './components/markdown';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx.min';
import marksy from 'marksy';

const config = {
    createElement: React.createElement,
    highlight(lang, code) {
        return Prism.highlight(code, Prism.languages[lang]);
    },
    elements: {
        h1: H1,
        h2: H2,
        h3: H3,
        h4: H4,
        h5: H5,
        h6: H6,
        p: P,
        a: A,
        li: LI,
        ul: UL,
    }
};

export default marksy(config);
