import setupGroup from "./actions/setup";
import getOrPullImage from "./lib/image";
import startWorker from "./lib/worker";

const GROUP_NAME = "worker_group";
const CONSUMER_NAME = process.env.CONSUMER_NAME || "worker_1";
const STREAM_KEY = process.env.STREAM_KEY || "tasks";
export const CONTAINER_NAME =
  process.env.CONTAINER_NAME || "viratubuntu/xforces-runner:latest";
export const MAX_OUTPUT_SIZE = process.env.MAX_OUTPUT_SIZE || 100 * 1024;

await getOrPullImage(CONTAINER_NAME);
await setupGroup({ STREAM_KEY, GROUP_NAME });
startWorker({ GROUP_NAME, CONSUMER_NAME, STREAM_KEY });
