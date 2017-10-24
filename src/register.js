import React from 'react';
import addons from '@storybook/addons';
import { Story } from './index';

addons.register('storybooks/meta', (api) => {
    addons.addPanel('storybooks/meta', {
        title: 'PropTypes',
        render: () => {
            return (
                <div>Hello world !</div>
            )
        }
    });
});
