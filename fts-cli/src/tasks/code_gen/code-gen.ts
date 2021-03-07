import { Project, Scope } from 'ts-morph';

export function testCodeGen(name: string) {
  const project = new Project();
  const sourceFile = project.createSourceFile(`./target/file.ts`);

  const classDeclaration = sourceFile.addClass({
    name,
  });

  const constr = classDeclaration.addConstructor({});
  constr.addParameter({
    scope: Scope.Private,
    name: 'myProp',
    type: 'string',
  });

  constr.setBodyText('this.myProp = myProp;');

  const test = classDeclaration.addMethod({
    kind: undefined,
    name: 'test',
    scope: Scope.Public,
    returnType: 'Promise<string>',
  });

  test.setBodyText(`return Promise.resolve('ok');`);

  sourceFile.formatText();
  console.log(sourceFile.getText());
}
