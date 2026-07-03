import { docker } from "./docker";
export default async function getOrPullImage(imageName: string) {
  const image = docker.getImage(imageName);

  try {
    await image.inspect();
    console.log("Image found locally.");
  } catch (err: any) {
    if (err.statusCode === 404) {
      console.log("Image not found! Pulling from Docker Hub...");

      const stream = await docker.pull(imageName);

      await new Promise((resolve, reject) => {
        docker.modem.followProgress(stream, (err: any, res: any) => {
          if (err) reject(err);
          else resolve(res);
        });
      });

      console.log("Pull complete!");
    } else {
      throw err;
    }
  }
}
