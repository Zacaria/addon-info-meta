import React from 'react';
import Story from './components/Story';
import { H1, H2, H3, H4, H5, H6, Code, P, UL, A, LI, Pre } from './components/markdown';
import marksy from './marksy';
import ReactDOMServer from 'react-dom/server';

import addons from '@storybook/addons';

const defaultOptions = {
  inline: false,
  header: true,
  source: true,
  propTables: [],
  maxPropsIntoLine: 3,
  maxPropObjectKeys: 3,
  maxPropArrayLength: 3,
  maxPropStringLength: 50,
};

function addInfo(storyFn, context, infoOptions) {
  const options = {
    ...defaultOptions,
    ...infoOptions,
  };

  const channel = addons.getChannel();
  const related = options.related;
  const ux = options.ux;

  const stringToHtml = (string) => {
      if (!string) return null;
      return ReactDOMServer.renderToString(marksy(related).tree);
  };

  channel.emit(
      'storybooks/meta/related',
      {
          htmlToDisplay: stringToHtml(related),
          empty: !related
      }
  );
  channel.emit(
      'storybooks/meta/ux',
      {
          htmlToDisplay: stringToHtml(ux),
          empty: !ux
      }
  );


  // props.propTables can only be either an array of components or null
  // propTables option is allowed to be set to 'false' (a boolean)
  // if the option is false, replace it with null to avoid react warnings
  if (!options.propTables) {
    options.propTables = null;
  }
  const props = {
    info: options.text,
    context,
    showInline: Boolean(options.inline),
    showHeader: Boolean(options.header),
    showSource: Boolean(options.source),
    propTables: options.propTables,
    propTablesExclude: options.propTablesExclude,
    styles: typeof options.styles === 'function' ? options.styles : s => s,
    maxPropObjectKeys: options.maxPropObjectKeys,
    maxPropArrayLength: options.maxPropArrayLength,
    maxPropsIntoLine: options.maxPropsIntoLine,
    maxPropStringLength: options.maxPropStringLength,
  };
  return <Story {...props}>{storyFn(context)}</Story>;
}

export const withMetaInfo = textOrOptions => {
  const options = typeof textOrOptions === 'string' ? { text: textOrOptions } : textOrOptions;
  return storyFn => context => addInfo(storyFn, context, options);
};

export { Story };

export function setDefaults(newDefaults) {
  return Object.assign(defaultOptions, newDefaults);
}
