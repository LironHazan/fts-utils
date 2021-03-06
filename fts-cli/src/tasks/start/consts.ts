import { flags } from '@oclif/command';

export const QUESTIONS = [
  {
    name: 'action',
    message: 'What action to perform?',
    type: 'list',
    choices: [{ name: 'import' }, { name: 'export' }, { name: 'opt_svg' }],
  },
  {
    name: 'cleanup',
    message: 'which cleanup method?',
    type: 'list',
    choices: [{ name: 'full' }, { name: 'partial' }],
  },
];

export const FLAGS = {
  help: flags.help({ char: 'h' }),
  // flag with a value (-n, --name=VALUE)
  name: flags.string({ char: 'n', description: 'name to print' }),
  // flag with no value (-f, --force)
  force: flags.boolean({ char: 'f' }),
  action: flags.string({ options: ['import', 'export', 'opt_svg'] }),
};

export const SVGO_PLUGINS = [
  {
    cleanupAttrs: true,
  },
  {
    removeDoctype: true,
  },
  {
    removeXMLProcInst: true,
  },
  {
    removeComments: true,
  },
  {
    removeMetadata: true,
  },
  {
    removeTitle: true,
  },
  {
    removeDesc: true,
  },
  {
    removeUselessDefs: true,
  },
  {
    removeEditorsNSData: true,
  },
  {
    removeEmptyAttrs: true,
  },
  {
    removeHiddenElems: true,
  },
  {
    removeEmptyText: true,
  },
  {
    removeEmptyContainers: true,
  },
  {
    removeViewBox: false,
  },
  {
    cleanupEnableBackground: true,
  },
  {
    convertStyleToAttrs: true,
  },
  {
    convertColors: true,
  },
  {
    convertPathData: true,
  },
  {
    convertTransform: true,
  },
  {
    removeUnknownsAndDefaults: true,
  },
  {
    removeNonInheritableGroupAttrs: true,
  },
  {
    removeUselessStrokeAndFill: true,
  },
  {
    removeUnusedNS: true,
  },
  {
    cleanupIDs: true,
  },
  {
    cleanupNumericValues: true,
  },
  {
    moveElemsAttrsToGroup: true,
  },
  {
    moveGroupAttrsToElems: true,
  },
  {
    collapseGroups: true,
  },
  {
    removeRasterImages: false,
  },
  {
    mergePaths: true,
  },
  {
    convertShapeToPath: true,
  },
  {
    sortAttrs: true,
  },
  {
    removeDimensions: true,
  },
  {
    removeAttrs: { attrs: '(stroke|fill)' },
  },
];
