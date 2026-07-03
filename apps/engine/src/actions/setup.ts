export default async function setupGroup({
  STREAM_KEY,
  GROUP_NAME,
}: {
  STREAM_KEY: string;
  GROUP_NAME: string;
}) {
  try {
    await redis.xgroup("CREATE", STREAM_KEY, GROUP_NAME, "0", "MKSTREAM");
    // console.log("worker group created.");
  } catch (err: any) {
    if (err.message.includes("BUSYGROUP")) {
      console.log("Group already exists, skipping creation.");
    } else {
      throw err;
    }
  }
}
