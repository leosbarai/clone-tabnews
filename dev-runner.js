const { spawn } = require("child_process");

const child = spawn("npm", ["run", "dev:internal"], {
  stdio: "inherit",
  shell: true,
});

const shutdown = () => {
  console.log("\nEncerrando aplicação...\n");

  if (child) {
    child.kill("SIGINT");
  }

  const stop = spawn("npm", ["run", "services:stop"], {
    stdio: "inherit",
    shell: true,
  });

  stop.on("exit", () => {
    console.log("\n✅ Serviços encerrados.\n");
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
