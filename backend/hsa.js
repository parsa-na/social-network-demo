// import { createHash } from "node:crypto";
// const {createHash}=await import('node:crypto');
const crypto=require('crypto');

const hashed = crypto.createHash("sha256");
hashed.on('readable',()=>{
    const data=hashed.read();
    if(data)
        console.log(data.toString('hex'));
})
hashed.update('fsdfsdgf');
hashed.end();