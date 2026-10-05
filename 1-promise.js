function getData() {
  return new Promise((resolve, reject) => {
    console.log("1. Starting... pending");
    setTimeout(() => {
      resolve("2. Data received after 2 seconds - fulfilled!");
    }, 2000);
  });
}

getData().then(result => console.log(result));
console.log("3. This runs immediately, it doesn't wait");
