/* eslint-disable react/prop-types */
import React from 'react';
import Prism from 'prismjs';
import PrismDecorator from 'draft-js-prism';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-scala';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-perl';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-dart';
import 'prismjs/components/prism-python';

export const languages = {
  c: 'C',
  cpp: 'C++',
  bash: 'Bash',
  css: 'CSS',
  html: 'HTML',
  js: 'JavaScript',
  py: 'Python',
  go: 'Go',
  java: 'Java',
  kotlin: 'Kotlin',
  swift: 'Swift',
  dart: 'Dart'
};

const prismPlugin = {
  decorators: [
    new PrismDecorator({
      prism: Prism,
      getSyntax(block) {
        // console.log({ block })
        const language = block.getData().get('language');
        // console.log({ language })
        if (typeof Prism.languages[language] === 'object') {
          return language;
        }
        return null;
      },
      render({ type, children }) {
        return <span className={`prism-token token ${type}`}>{children}</span>;
      }
    })
  ]
};

export default prismPlugin;
