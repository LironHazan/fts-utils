import { API, FileInfo } from 'jscodeshift';

// replace testFlowObj.run() with testFlowObj.collect()
export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const callExpressions = root.find(j.CallExpression, {
      callee: {
        type: 'MemberExpression',
        property: { type: 'Identifier', name: 'run' },
      },
    }
  );
  const localName =
    callExpressions.find(j.Identifier)
      .get(0).node.name;

  return root.find(j.MemberExpression, {
    object: {
      name: localName,
    },
    property: {
      name: 'run',
    },
  }).replaceWith(nodePath => {
      const { node } = nodePath as any;
      node.property.name = 'collect';
      return node;
    }).toSource();
}

