import {prisma} from "../src/index";

async function main() {
  console.log('Start seeding...');

  // Optional: Clear existing data to avoid duplicates
  await prisma.questions.deleteMany();

  const questions = [
    {
      title: "Two Sum",
      content: "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
      input: "[2, 7, 11, 15], target = 9",
      output: "[0, 1]",
    },
    {
      title: "Palindrome Number",
      content: "Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.",
      input: "121",
      output: "true",
    },
    {
      title: "Fibonacci Sequence",
      content: "Calculate the nth Fibonacci number where F(n) = F(n-1) + F(n-2).",
      input: "n = 10",
      output: "55",
    }
  ];

  for (const q of questions) {
    const question = await prisma.questions.create({
      data: q,
    });
    console.log(`Created question with id: ${question.id}`);
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });