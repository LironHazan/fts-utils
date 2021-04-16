class TestObj {
  async run() {
    console.log('run');
  }
  async collect() {

  }
}

const testFlowObj = new TestObj();

export async function testCodMod() {
  await testFlowObj.run();
}

export async function testCodModToo() {
  await testFlowObj.run();
}

