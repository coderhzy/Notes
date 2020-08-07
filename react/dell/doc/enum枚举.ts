enum Status {
  OFFLINE,
  ONLINE,
  DELTED
}


// const Status = {
//   OFFLINE: 0,
//   ONLINE: 1,
//   DELTED: 2
// }

function getResult(status) {
  if (status === Status.OFFLINE) {
    return 'offline';
  } else if (status === Status.ONLINE) {
    return 'online';
  } else if (status === Status.DELTED) {
    return 'deleted';
  }
  return 'error';
}

const result = getResult(Status.OFFLINE);
console.log(result);