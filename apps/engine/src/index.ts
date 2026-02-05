import redis from "./lib/redis";
const GROUP_NAME = 'worker_group';
const CONSUMER_NAME = process.env.CONSUMER_NAME || 'worker_1'// Use process.env.HOSTNAME for uniqueness
const STREAM_KEY = 'tasks';
async function setupGroup() {
  try {
    // MKSTREAM ensures the 'tasks' key is created if it doesn't exist
    await redis.xgroup('CREATE', STREAM_KEY, GROUP_NAME, '0', 'MKSTREAM');
    console.log("worker group created.");
  } catch (err: any) {
    if (err.message.includes('BUSYGROUP')) {
      console.log("Group already exists, skipping creation.");
    } else {
      throw err;
    }
  }
}
setupGroup();
async function startWorker() {
  while (true) {
    try {
      // XREADGROUP GROUP [group] [consumer] [BLOCK] [COUNT] STREAMS [key] [ID]
      // ID '>' means: "give me new messages never delivered to anyone else"
      const results = await redis.xreadgroup(
        'GROUP', GROUP_NAME, CONSUMER_NAME,
        'COUNT', 1,
        'BLOCK', 5000,
        'STREAMS', STREAM_KEY, '>'
      );

      if (!results) continue;
      console.log(results);
    await new Promise((resolve)=> setTimeout(resolve,2000));
      //@ts-ignore
      const messages = results[0];
      // const [id,field] = messages;
      console.log("messages");
      console.log(messages);
      console.log("task");
      //@ts-ignore
      const id  = messages[1][0][0];
      console.log("id");
      console.log(id);
      // for (const [id, fields] of messages) {
      //   console.log(`Worker ${CONSUMER_NAME} processing: ${id}`);
        
      await new Promise((resolve)=>setTimeout(resolve,5000));
      //   // 2. ACKNOWLEDGE (Crucial!)
      //   // This tells Redis the task is finished and can be removed from the "Pending" list.
        await redis.xack(STREAM_KEY, GROUP_NAME, id);
        await redis.xdel(STREAM_KEY,id);
        
      // }
    } catch (err) {
      console.error("Worker Error:", err);
    }
  }
}

startWorker();