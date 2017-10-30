import React from 'react';
import { H4 } from './components/markdown';
import FontAwesome from 'react-fontawesome';

import addons from '@storybook/addons';

class ChannelWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            htmlToDisplay: null,
            fullscreen: false,
            loading: true,
            empty: false
        };
    }

    componentDidMount() {
        this.handleStoryChange();
        this.listenChannel();

        setTimeout(() => {
            if (!this.state.htmlToDisplay) {
                this.setState({ loading: false });
            }
        }, 1200);
    }

    componentWillUnmount() {
        this.removeChannelListener();
        this.stopListeningStory();
    }

    unmount = false;

    listenChannel() {
        const channel = addons.getChannel();
        channel.on(this.props.channel, (e) => this.handleChannel(e));
    }

    handleChannel({ htmlToDisplay, empty }) {
        if (!this.unmount) {
            this.setState({ htmlToDisplay, loading: false, empty })
        }
    }

    removeChannelListener() {
        const channel = addons.getChannel();
        this.unmount = true;
        channel.removeListener(this.props.channel);
    }

    handleStoryChange() {
        this.stopListeningStory = this.props.api.onStory(
            () => this.setState({ htmlToDisplay: '' })
        );
    }

    defaultStyle = {
        fontFamily: '-apple-system, ".SFNSText-Regular", "San Francisco", BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", "Lucida Grande", Arial, sans-serif',
        color: 'rgb(68, 68, 68)',
        fontWeight: 300,
        lineHeight: 1.45,
        fontSize: 15,
        padding: '0 25px 25px',
        backgroundColor: 'white',
        boxSizing: 'border-box',
        width: '100%',
        height: 0, // storybook bugfix - activates panel scroll on firefox
    };

    fullScreenStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 999,
        overflow: 'scroll'
    };

    Pane2FullscreenStyle = `
      .Pane2 {
        position: fixed !important;
        width: 100% !important;
        height: 100% !important;
        top: 0 !important;
        left: 0 !important;
        background-color: white !important;
        z-index: 9999 !important;
      }
    `;

    render() {
        const style = this.state.fullscreen ? { ...this.defaultStyle, ...this.fullScreenStyle } : this.defaultStyle;
        return (
            <div style={style}>
                {(!this.state.htmlToDisplay && this.state.loading) &&
                    <H4>Loading...</H4>
                }
                {this.state.htmlToDisplay &&
                    <div>
                        <FontAwesome
                            name='arrows-alt'
                            style={{
                                position: 'absolute',
                                right: this.state.fullscreen ? '4px' : '29px',
                                top: this.state.fullscreen ? '2px' : '40px',
                                fontSize: this.state.fullscreen ? '21px' : '20px',
                                cursor: 'pointer'
                            }}
                            onClick={() => this.setState({ fullscreen: !this.state.fullscreen })}
                        />
                        {this.props.children}
                        <div dangerouslySetInnerHTML={{ __html: this.state.htmlToDisplay}} />
                    </div>
                }
                {(!this.state.htmlToDisplay && !this.state.loading && !this.state.empty) &&
                <div>
                    <H4>Nothing to display</H4>

                    Two possibilities:
                    <ul>
                        <li>Story doesn't use withMetaInfo addon</li>
                        <li>Panel crashed</li>
                    </ul>
                </div>
                }
                {this.state.empty &&
                <div>
                    <H4>Empty</H4>
                    This section is empty.
                </div>
                }
            </div>
        )
    }
}

addons.register('storybooks/meta/propTypes', (api) => {
    addons.addPanel('storybooks/meta/propTypes', {
        title: 'PropTypes',
        render: () => {
            return <ChannelWrapper channel={'storybooks/meta/propTypes'} api={api} />
        }
    });
});

addons.register('storybooks/meta/sourceCode', (api) => {
    addons.addPanel('storybooks/meta/sourceCode', {
        title: 'Source Code',
        render: () => {
            return (
                <ChannelWrapper channel={'storybooks/meta/sourceCode'} api={api}>
                    <div style={{ marginTop: 10 }}>
                        Note: This code is automatically generated and might be not very accurate.
                    </div>
                </ChannelWrapper>
            )
        }
    });
});

addons.register('storybooks/meta/description', (api) => {
    addons.addPanel('storybooks/meta/description', {
        title: 'Description',
        render: () => {
            return <ChannelWrapper channel={'storybooks/meta/description'} api={api} />
        }
    });
});

addons.register('storybooks/meta/related', (api) => {
    addons.addPanel('storybooks/meta/related', {
        title: 'Related',
        render: () => {
            return (
                <ChannelWrapper channel={'storybooks/meta/related'} api={api} />
            )
        }
    });
});

addons.register('storybooks/meta/ux', (api) => {
    addons.addPanel('storybooks/meta/ux', {
        title: 'UI / UX',
        render: () => {
            return (
                <ChannelWrapper channel={'storybooks/meta/ux'} api={api} />
            )
        }
    });
});
