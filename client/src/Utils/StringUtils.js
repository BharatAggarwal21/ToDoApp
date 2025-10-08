export function getErrorMessage(error) {
  const msg =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();
  return msg;
}

export function sortTasksByCompletion(tasks) {
  return tasks.sort((a, b) => {
    return Number(a.isCompleted) - Number(b.isCompleted);
  });
}
