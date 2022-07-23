let p1 = Promise.resolve("1");
let p2 = Promise.resolve("2");
let p3 = Promise.reject("3");
let p4 = Promise.resolve("4");

const returnPromise = async () => {
  const res1 = await Promise.all([p1, p2]);
  const res2 = await Promise.all([p3, p4]);
  return [res1, res2];
};

returnPromise()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log("Error:", err);
  });
