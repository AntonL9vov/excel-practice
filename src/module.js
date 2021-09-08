console.log('Module.js added')

async function start() {
  return await Promise.resolve('async working!!!!!');
}

start().then(console.log)
