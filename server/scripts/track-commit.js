/* eslint-disable no-undef */
const fs = require("fs");
const path = require("path");
const readline = require("readline");

// --- Helpers ---
function isValidSuffix(suffix) {
    const regex = /^[0-9](?:[0-9]*|\.[0-9]+)*$/; // must start with digit, only digits & dots, no trailing dot
    return regex.test(suffix);
}

function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise((resolve) =>
        rl.question(query, (ans) => {
            rl.close();
            resolve(ans);
        })
    );
}

// --- Main ---
(async () => {
    const commitNumber = process.argv[2];
    if (!commitNumber) {
        console.error("❌ Please provide a commit suffix. Example: npm run commit-backup 5.2.1");
        process.exit(1);
    }

    if (!isValidSuffix(commitNumber)) {
        console.error("❌ Invalid suffix. Examples of valid values: 5, 5.1, 5.2.3.1.23");
        console.error("❌ Invalid examples: '.5', '5.', '.', 'abc'");
        process.exit(1);
    }

    // Mapping of files to their respective subfolders + backlink text
    const fileMappings = {
        "Changelog.md": {
            folder: "changelogs",
            backlink: "[← Back to Changelog.md](../../Changelog.md)",
        },
        "Todo.md": {
            folder: "todos",
            backlink: "[← Back to Todo.md](../../Todo.md)",
        },
    };

    const baseDest = path.join(__dirname, "..", "..", ".tracking");

    // Ensure subfolders exist
    Object.values(fileMappings).forEach(({ folder }) => {
        const folderPath = path.join(baseDest, folder);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }
    });

    // Copy files into their dedicated folders
    for (const [file, { folder, backlink }] of Object.entries(fileMappings)) {
        const srcPath = path.join(__dirname, "..", "..", file);
        if (!fs.existsSync(srcPath)) {
            console.warn(`⚠️ Skipping ${file} (not found at project root)`);
            continue;
        }

        const ext = path.extname(file);
        const base = path.basename(file, ext);
        const finalName = `${base}#${commitNumber}${ext}`;
        const finalPath = path.join(baseDest, folder, finalName);

        if (fs.existsSync(finalPath)) {
            const answer = await askQuestion(
                `⚠️ File already exists: ${finalPath}\nDo you want to overwrite it? (y/n): `
            );
            if (answer.toLowerCase() !== "y") {
                console.log(`⛔ Aborted backup for ${file}`);
                continue;
            }
        }

        // Copy the original file
        fs.copyFileSync(srcPath, finalPath);

        // Append backlink at the end
        fs.appendFileSync(finalPath, `\n\n${backlink}\n`);

        console.log(`✅ Backed up ${file} → ${finalPath}`);
    }
})();
