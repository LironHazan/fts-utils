class TestObj {
  async run() {
    console.log('run');
  }
  async collect() {

  }
}

const testFlowObj = new TestObj();

export async function testCodMod() {
  await testFlowObj.collect();
}

export async function testCodModToo() {
  await testFlowObj.collect();
}

