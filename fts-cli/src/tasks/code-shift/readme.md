````ts
// Having the Foollowing:

// some-test-obj.ts:

class TestObj {

// Normal run:
  async run() {
    console.log('run');
  }
// Another running mode for collecting metrics only   
  async collect() {

  }
}

// test-obj-consumer.ts

const testFlowObj = new TestObj();

export async function testCodMod() {
  await testFlowObj.run();
}

export async function testCodModToo() {
  await testFlowObj.run();
}

// Let's say we need to exec a procudure that will read all source files
// looking for testFlowObj.run() and replacing to testFlowObj.collect()

// We can achive taht by transforming the AST usign tools like ts-morph or jscodeshift

// Run ./bin/run code-shift for stating this task.
