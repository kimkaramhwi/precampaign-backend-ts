// import fs from 'fs';
// import path from 'path';
// import { exec } from 'child_process'
// import util from 'util'

// const asyncExec = util.promisify(exec);

// console.log('migration-all-table');

// console.log(`
//   -------------------------------------
//   ++ Laggard Project Migration Start ++
//   -------------------------------------
// `);

// let migrationAllTable = async () => {
//   let migrationFiles: string[] = [];
//   fs.readdir(path.join(__dirname,'/','tables'), async (err, files) => {
//     if (err) console.log(`err : ${err}`);
//     if (files) {
//       files.forEach(el => {
//         migrationFiles.push(el);
//       })

//       for(let el of migrationFiles) {
//         console.log(`Migration File Nmae : ${el}`);

//         const { stdout, stderr } = await asyncExec(`./node_modules/.bin/ts-node '${__dirname}/tables/${el}'`)
//         if(stdout) console.log(stdout);
//         if(stderr) console.log(`Std Err : ${stdout}`);
//       }
//     }
//   })
// }

// migrationAllTable()