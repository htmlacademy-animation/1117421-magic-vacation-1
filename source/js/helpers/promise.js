const runSerial = (tasks) => {
  let result = Promise.resolve();
  tasks.forEach((task) => {
    result = result.then(task);
  });
  return result;
};

const runSerialLoop = (tasks, needProceedFunc) => {
  return new Promise((resolve) => {
    runSerial(tasks).then(() => {
      if (typeof needProceedFunc !== `function` || needProceedFunc()) {
        runSerialLoop(tasks, needProceedFunc);
        return;
      }
      resolve();
    });
  });
};

export {runSerial, runSerialLoop};
