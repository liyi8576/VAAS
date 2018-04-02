webpackJsonp([1],{1389:function(e,t){e.exports={name:"antd",version:"2.13.11",title:"Ant Design",description:"An enterprise-class UI design language and React-based implementation",homepage:"http://ant.design/",keywords:["ant","design","react","react-component","component","components","ui","framework","frontend"],contributors:["ant"],repository:{type:"git",url:"https://github.com/ant-design/ant-design"},bugs:{url:"https://github.com/ant-design/ant-design/issues"},main:"lib/index.js",module:"es/index.js",files:["dist","lib","es"],typings:"lib/index.d.ts",license:"MIT",peerDependencies:{react:"~0.14.0 || >=15.0.0","react-dom":"~0.14.0 || >=15.0.0"},dependencies:{"array-tree-filter":"~1.0.0","babel-runtime":"6.x",classnames:"~2.2.0","create-react-class":"^15.6.0","css-animation":"^1.2.5","dom-closest":"^0.2.0","lodash.debounce":"^4.0.8",moment:"^2.19.3","omit.js":"^1.0.0","prop-types":"^15.5.7","rc-animate":"^2.4.1","rc-calendar":"~9.0.0","rc-cascader":"~0.11.3","rc-checkbox":"~2.0.3","rc-collapse":"~1.7.5","rc-dialog":"~6.5.10","rc-dropdown":"~1.5.0","rc-editor-mention":"~0.6.12","rc-form":"~1.4.0","rc-input-number":"~3.6.0","rc-menu":"~5.0.10","rc-notification":"~2.0.0","rc-pagination":"~1.12.4","rc-progress":"~2.2.2","rc-rate":"~2.1.1","rc-select":"~6.9.0","rc-slider":"~8.3.0","rc-steps":"~2.5.1","rc-switch":"~1.5.1","rc-table":"~5.6.9","rc-tabs":"~9.1.2","rc-time-picker":"~2.4.1","rc-tooltip":"~3.4.6","rc-tree":"~1.7.0","rc-tree-select":"~1.10.2","rc-upload":"~2.4.0","rc-util":"^4.0.4","react-lazy-load":"^3.0.12","react-slick":"~0.15.4",shallowequal:"^1.0.1",warning:"~3.0.0"},devDependencies:{"@types/react":"^16.0.21","@types/react-dom":"~0.14.18","ansi-styles":"^3.2.0","antd-tools":"~2.1.0","babel-cli":"^6.18.0","babel-eslint":"^8.0.1","babel-plugin-import":"^1.0.0","babel-plugin-transform-runtime":"^6.23.0","babel-preset-es2015":"^6.18.0","babel-preset-react":"^6.16.0","babel-preset-stage-0":"^6.16.0","bezier-easing":"^2.0.3",bisheng:"^0.25.0","bisheng-plugin-antd":"^0.15.0","bisheng-plugin-description":"^0.1.1","bisheng-plugin-react":"^0.5.0","bisheng-plugin-toc":"^0.4.0","color-standalone":"^0.11.6",commander:"^2.11.0","cross-env":"^5.0.3","css-split-webpack-plugin":"^0.2.3",dekko:"^0.2.0",delegate:"^3.1.2","dora-plugin-upload":"^0.3.1","enquire.js":"^2.1.1",enzyme:"^2.6.0","enzyme-to-json":"^1.3.0",eslint:"^4.8.0","eslint-config-airbnb":"latest","eslint-plugin-babel":"^4.0.0","eslint-plugin-import":"^2.2.0","eslint-plugin-jsx-a11y":"^6.0.2","eslint-plugin-markdown":"~1.0.0-beta.4","eslint-plugin-react":"7.4.0","eslint-tinker":"^0.4.0","fetch-jsonp":"^1.0.3",glob:"^7.1.1",jest:"^21.1.0","jsonml.js":"^0.1.0","lint-staged":"^4.0.2",majo:"^0.4.1",mockdate:"^2.0.1","moment-timezone":"^0.5.5","pre-commit":"^1.2.2",preact:"^8.2.5","preact-compat":"^3.17.0",querystring:"^0.2.0","rc-queue-anim":"^1.0.1","rc-scroll-anim":"^1.0.3","rc-tween-one":"^1.1.2",react:"^15.0.0","react-color":"^2.11.7","react-copy-to-clipboard":"^5.0.0","react-document-title":"^2.0.1","react-dom":"^15.0.0","react-github-button":"^0.1.1","react-intl":"^2.0.1","react-sublime-video":"^0.2.0","react-test-renderer":"^15.5.4","remark-frontmatter":"^1.1.0","remark-parse":"^4.0.0","remark-stringify":"^4.0.0","remark-yaml-config":"^4.0.1",reqwest:"^2.0.5",rimraf:"^2.5.4",stylelint:"^8.0.0","stylelint-config-standard":"^17.0.0",typescript:"~2.5.3",unified:"^6.1.5","values.js":"^1.0.3",xhr2:"^0.1.3"},scripts:{test:"jest --config .jest.js","test-node":"jest --config .jest.node.js","test-all":"./scripts/test-all.sh",lint:"npm run lint:ts && npm run lint:es && npm run lint:demo && npm run lint:style","lint:ts":"npm run tsc && antd-tools run ts-lint","lint:es":"eslint tests site scripts components ./.eslintrc.js ./webpack.config.js --ext '.js,.jsx'","lint:demo":"cross-env RUN_ENV=DEMO eslint components/*/demo/*.md --ext '.md'","lint:style":'stylelint "{site,components}/**/*.less" --syntax less',"lint-fix:ts":"npm run tsc && antd-tools run ts-lint-fix","lint-fix":"npm run lint-fix:code && npm run lint-fix:demo","lint-fix:code":"eslint --fix tests site scripts components ./.eslintrc.js ./webpack.config.js --ext '.js,.jsx'","lint-fix:demo":"eslint-tinker ./components/*/demo/*.md","sort-api":"node ./scripts/sort-api-table.js",dist:"antd-tools run dist",compile:"antd-tools run compile",tsc:"tsc",start:"node ./scripts/generateColorLess.js && cross-env NODE_ENV=development bisheng start -c ./site/bisheng.config.js --no-livereload","start:preact":"node ./scripts/generateColorLess.js && cross-env NODE_ENV=development REACT_ENV=preact bisheng start -c ./site/bisheng.config.js --no-livereload",site:"cross-env NODE_ENV=production bisheng build --ssr -c ./site/bisheng.config.js",deploy:"antd-tools run clean && npm run site && node ./scripts/generateColorLess.js && bisheng gh-pages --push-only",pub:"antd-tools run pub",prepublish:"antd-tools run guard","pre-publish":"npm run test-all && node ./scripts/prepub",authors:"git log --format='%aN <%aE>' | sort -u | grep -v 'users.noreply.github.com' | grep -v 'gitter.im' | grep -v '.local>' | grep -v 'alibaba-inc.com' | grep -v 'alipay.com' | grep -v 'taobao.com' > AUTHORS.txt","lint-staged":"lint-staged","lint-staged:ts":"tsc && node node_modules/tslint/bin/tslint -c node_modules/antd-tools/lib/tslint.json","lint-staged:es":"eslint ./.eslintrc.js ./webpack.config.js","lint-staged:demo":"cross-env RUN_ENV=DEMO eslint --ext '.md'"},"lint-staged":{"components/**/*.tsx":["lint-staged:ts"],"{tests,site,scripts,components}/**/*.{js,jsx}":["lint-staged:es"],"{site,components}/**/*.less":"stylelint --syntax less","components/*/demo/*.md":["lint-staged:demo"]},"pre-commit":["lint-staged"]}},1419:function(e,t,s){s(554),s(62),s(41),s(36),s(1),s(0),s(12),s(50),s(555),s(135),s(167),s(29),s(67),s(214),e.exports=s(309)}},[1419]);
//# sourceMappingURL=verdor.7d5cddd3.map