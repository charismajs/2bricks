module.exports = {
  model: {
    execution: "Execution",
    task : "Task",
    job : "Job"
  },
  status: {
    init: "init",
    start: "begin",
    success: "finish",
    failed: "failed",
    killed: "killed"
  },
  message: {
    not_found: 'Key not found in collection',
    delete: 'Successfully delete the item for '
  }
};