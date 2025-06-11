import { exec } from "child_process";

function runScript(script: string): Promise<void> {
    return new Promise((resolve, reject) => {
        console.log(`\n--- Executando: ${script} ---`);
        exec(`npx ts-node ${script}`, { cwd: __dirname }, (error, stdout, stderr) => {
            if (stdout) process.stdout.write(stdout);
            if (stderr) process.stderr.write(stderr);
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

async function main() {
    try {
        await runScript("./createDefaultUserTypes.ts");
        await runScript("./createDefaultManagements.ts");
        await runScript("./createDefaultUser.ts");
        await runScript("./createFakeUsers.ts");
        await runScript("./createAstinAnalysts.ts");
        await runScript("./createDefaultPriorities.ts");
        await runScript("./createDefaultStatuses.ts");
        await runScript("./createDefaultTicketTypes.ts");
        await runScript("./createFakeTickets.ts");
        console.log("\nMock de dados concluído com sucesso!");
    } catch (e) {
        console.error("\nErro ao executar scripts de mock:", e);
        process.exit(1);
    }
}

main();

/*
    Para executar este script, use o comando, estando em src/back, execute:
    npx ts-node scripts/createMock.ts
*/
