interface User {
  id: string;
  name: string;
}

const user: User = {
  id: Math.random().toString(36).substring(2, 15),
  name: "John Doe",
};

await new Promise<void>((resolve) => {
  setTimeout(() => {
    console.log(`User created: ${JSON.stringify(user)}`);
    resolve();
  }, 1000);
});
