import { prisma } from "../src/index";

async function main() {
  // Clear existing problems to start fresh
  await prisma.problems.deleteMany();

  const classCode = `class Solution {
  private:
      void backtrack(const vector<int>& candidates, int target, vector<int>& current, int index, vector<vector<int>>& results) {
          // write your code here
          }
  };`;

  const mainCode = `#include <competition.h> 

  using namespace std;

  // The class code will be injected right here
  {{classcode}}

  int main() {
      // Note: Do not tie cin/cout if users are meant to interleave prints,
      // but it's kept for performance. Standard cout still goes to fd 1.
      ios_base::sync_with_stdio(false);
      cin.tie(NULL);

      int fd3 = 3;
      int num_testcases;
      if (!(cin >> num_testcases)) return 0;

      while (num_testcases--) {
          int n, target;
          cin >> n >> target;

          vector<int> candidates(n);
          for (int i = 0; i < n; ++i) cin >> candidates[i];

          sort(candidates.begin(), candidates.end());
          candidates.erase(unique(candidates.begin(), candidates.end()), candidates.end());

          // Instantiate the injected class and call the main logic
          Solution sol;
          vector<vector<int>> results = sol.combinationSum(candidates, target);

          // Format and print ONLY the final answer to fd3
          string final_output = "[";
          for (size_t i = 0; i < results.size(); ++i) {
              final_output += "[";
              for (size_t j = 0; j < results[i].size(); ++j) {
                  final_output += to_string(results[i][j]);
                  if (j < results[i].size() - 1) final_output += ",";
              }
              final_output += "]";
              if (i < results.size() - 1) final_output += ",";
          }
          final_output += "]\n";

          write(fd3, final_output.c_str(), final_output.length());
      }

      fsync(fd3);
      return 0;
  }`;
  const rustClassCode = `    fn backtrack(candidates: &Vec<i32>, target: i32, current: &mut Vec<i32>, index: usize, results: &mut Vec<Vec<i32>>) {
        // write your code here
        }`;

  const rustMainCode = `use std::io::{self, Read, Write};
  use std::os::unix::io::FromRawFd;
  use std::fs::File;

  // Define the struct
  struct Solution;

  // Wrap the injected user methods safely inside the impl block
  impl Solution {
  {{classcode}}
  }

  fn main() {
      let mut input = String::new();
      if io::stdin().read_to_string(&mut input).is_err() {
          return;
      }
      let mut tokens = input.split_whitespace();

      let num_testcases: usize = match tokens.next() {
          Some(s) => s.parse().unwrap_or(0),
          None => return,
      };

      // Grab raw file descriptor 3 for the judge output.
      let mut fd3 = unsafe { File::from_raw_fd(3) };

      for _ in 0..num_testcases {
          let n: usize = tokens.next().unwrap().parse().unwrap();
          let target: i32 = tokens.next().unwrap().parse().unwrap();

          let mut candidates: Vec<i32> = Vec::new();
          for _ in 0..n {
              candidates.push(tokens.next().unwrap().parse().unwrap());
          }

          candidates.sort();
          candidates.dedup();

          let results = Solution::combination_sum(candidates, target);

          let mut final_output = String::from("[");
          for (i, res) in results.iter().enumerate() {
              final_output.push('[');
              for (j, val) in res.iter().enumerate() {
                  final_output.push_str(&val.to_string());
                  if j < res.len() - 1 {
                      final_output.push(',');
                  }
              }
              final_output.push(']');
              if i < results.len() - 1 {
                  final_output.push(',');
              }
          }
          final_output.push_str("]\\n");

          let _ = fd3.write_all(final_output.as_bytes());
      }
  }`;


  const javaClassCode = `    private void backtrack(List<Integer> candidates, int target, List<Integer> current, int index, List<List<Integer>> results) {
          // write your code here
          }`;
  const javaMainCode = `import java.io.*;
  import java.util.*;

  // We wrap the injected code inside the class here so the user doesn't have to
  class Solution {
      {{classcode}}
  }

  public class Main {
      public static void main(String[] args) throws Exception {
          Scanner scanner = new Scanner(System.in);
          if (!scanner.hasNextInt()) return;

          int numTestcases = scanner.nextInt();
          FileOutputStream fd3 = new FileOutputStream("/dev/fd/3");

          while (numTestcases-- > 0) {
              int n = scanner.nextInt();
              int target = scanner.nextInt();

              Set<Integer> set = new HashSet<>();
              for (int i = 0; i < n; i++) {
                  set.add(scanner.nextInt());
              }

              List<Integer> candidates = new ArrayList<>(set);
              Collections.sort(candidates);

              Solution sol = new Solution();
              List<List<Integer>> results = sol.combinationSum(candidates, target);

              StringBuilder sb = new StringBuilder();
              sb.append("[");
              for (int i = 0; i < results.size(); i++) {
                  sb.append("[");
                  for (int j = 0; j < results.get(i).size(); j++) {
                      sb.append(results.get(i).get(j));
                      if (j < results.get(i).size() - 1) sb.append(",");
                  }
                  sb.append("]");
                  if (i < results.size() - 1) sb.append(",");
              }
              sb.append("]\\n");

              fd3.write(sb.toString().getBytes());
          }

          fd3.flush();
          scanner.close();
      }
  }`;
  const tsClassCode = `    private backtrack(candidates: number[], target: number, current: number[], index: number, results: number[][]): void {
          // write your code here
          }`;


  const tsMainCode = `import * as fs from 'fs';

  // We wrap the injected code inside the class here
  class Solution {
  {{classcode}}
  }

  function main() {
      const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
      if (input.length === 0 || input[0] === "") return;

      let num_testcases = parseInt(input[0]);
      let idx = 1;

      while (num_testcases--) {
          const n = parseInt(input[idx++]);
          const target = parseInt(input[idx++]);

          let candidates: number[] = [];
          for (let i = 0; i < n; i++) {
              candidates.push(parseInt(input[idx++]));
          }

          candidates = [...new Set(candidates)].sort((a, b) => a - b);

          const sol = new Solution();
          const results = sol.combinationSum(candidates, target);

          let final_output = "[" + results.map(res => "[" + res.join(",") + "]").join(",") + "]\\n";
          fs.writeSync(3, final_output);
      }
  }

  main();`;

  const jsClassCode = `    backtrack(candidates, target, current, index, results) {
        // write your code here 
        }`;



  const jsMainCode = `const fs = require('fs');

  // We wrap the injected code inside the class here so the user doesn't have to
  class Solution {
  {{classcode}}
  }

  function main() {
      const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
      if (input.length === 0 || input[0] === "") return;

      let num_testcases = parseInt(input[0]);
      let idx = 1;

      while (num_testcases--) {
          const n = parseInt(input[idx++]);
          const target = parseInt(input[idx++]);

          let candidates = [];
          for (let i = 0; i < n; i++) {
              candidates.push(parseInt(input[idx++]));
          }

          candidates = [...new Set(candidates)].sort((a, b) => a - b);

          const sol = new Solution();
          const results = sol.combinationSum(candidates, target);

          let final_output = "[" + results.map(res => "[" + res.join(",") + "]").join(",") + "]\\n";
          fs.writeSync(3, final_output);
      }
  }

  main();`;

  const pyClassCode = [
    "    def backtrack(self, candidates, target, current, index, results):",
    "        # write your code here",
  ].join("\n");
  const pyMainCode = [
    "import sys",
    "import os",
    "",
    "# We wrap the injected code inside the class here",
    "class Solution:",
    "{{classcode}}",
    "",
    "def main():",
    "    input_data = sys.stdin.read().split()",
    "    if not input_data:",
    "        return",
    "",
    "    num_testcases = int(input_data[0])",
    "    idx = 1",
    "",
    "    for _ in range(num_testcases):",
    "        n = int(input_data[idx])",
    "        target = int(input_data[idx+1])",
    "        idx += 2",
    "",
    "        candidates = []",
    "        for _ in range(n):",
    "            candidates.append(int(input_data[idx]))",
    "            idx += 1",
    "",
    "        candidates = sorted(list(set(candidates)))",
    "",
    "        sol = Solution()",
    "        results = sol.combinationSum(candidates, target)",
    "",
    "        final_output = '[' + ','.join('[' + ','.join(map(str, res)) + ']' for res in results) + ']\\n'",
    "        os.write(3, final_output.encode())",
    "",
    "if __name__ == '__main__':",
    "    main()",
  ].join("\n");

  const testcases = [
    { input: "4 7\n2 3 6 7\n", output: "[[2,2,3],[7]]" },
    { input: "3 8\n2 3 5\n", output: "[[2,2,2,2],[2,3,3],[3,5]]" },
    { input: "1 2\n1\n", output: "[[1,1]]" },
    { input: "1 1\n2\n", output: "[]" },
    { input: "2 3\n1 2\n", output: "[[1,1,1],[1,2]]" },
    { input: "3 6\n2 3 4\n", output: "[[2,2,2],[2,4],[3,3]]" },
    {
      input: "4 5\n1 2 3 4\n",
      output: "[[1,1,1,1,1],[1,1,1,2],[1,1,3],[1,2,2],[1,4],[2,3]]",
    },
    { input: "2 10\n5 10\n", output: "[[5,5],[10]]" },
    { input: "3 9\n3 6 9\n", output: "[[3,3,3],[3,6],[9]]" },
    { input: "2 1\n1 2\n", output: "[[1]]" },
    { input: "4 8\n2 4 6 8\n", output: "[[2,2,2,2],[2,2,4],[2,6],[4,4],[8]]" },
    { input: "3 7\n2 4 6\n", output: "[]" },
    { input: "4 8\n2 4 6 8\n", output: "[[2,2,2,2],[2,2,4],[2,6],[4,4],[8]]" },
    { input: "2 4\n2 3\n", output: "[[2,2]]" },
    { input: "1 10\n2\n", output: "[[2,2,2,2,2]]" },
    { input: "3 10\n3 5 7\n", output: "[[3,7],[5,5]]" },
    {
      input: "4 6\n1 2 5 6\n",
      output: "[[1,1,1,1,1,1],[1,1,1,1,2],[1,1,2,2],[1,5],[2,2,2],[6]]",
    },
    { input: "2 2\n2 3\n", output: "[[2]]" },
    { input: "3 4\n1 1 1\n", output: "[[1,1,1,1]]" },
    {
      input: "4 12\n3 4 6 12\n",
      output: "[[3,3,3,3],[3,3,6],[4,4,4],[6,6],[12]]",
    },
    { input: "3 10\n2 3 5\n", output: "[[2,2,2,2,2],[2,2,3,3],[2,3,5],[5,5]]" },
    {
      input: "5 10\n2 4 6 8 10\n",
      output: "[[2,2,2,2,2],[2,2,2,4],[2,2,6],[2,4,4],[2,8],[4,6],[10]]",
    },
    { input: "3 11\n3 4 5\n", output: "[[3,3,5],[3,4,4]]" },
    { input: "2 7\n3 5\n", output: "[]" },
    { input: "4 9\n2 3 5 7\n", output: "[[2,2,2,3],[2,2,5],[2,7],[3,3,3]]" },
    { input: "1 5\n5\n", output: "[[5]]" },
    { input: "3 12\n4 8 12\n", output: "[[4,4,4],[4,8],[12]]" },
    { input: "2 15\n5 10\n", output: "[[5,5,5],[5,10]]" },
    { input: "3 2\n2 4 6\n", output: "[[2]]" },
    {
      input: "4 10\n1 3 7 10\n",
      output:
        "[[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,3],[1,1,1,1,3,3],[1,1,1,7],[1,3,3,3],[3,7],[10]]",
    },
  ];

  const problem = await prisma.problems.create({
    data: {
      title: "Combination Sum",
      statement: `# Combination Sum

  ## Problem Statement

  Given an array of distinct integers \`candidates\` and a target integer \`target\`, return a list of all **unique combinations** of \`candidates\` where the chosen numbers sum to \`target\`. You may return the combinations in any order.

  The same number may be chosen from \`candidates\` an **unlimited number of times**. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

  ---

  ## Examples

  ### Example 1
  **Input:** \`candidates = [2, 3, 6, 7]\`, \`target = 7\`
  **Output:** \`[[2, 2, 3], [7]]\`
  **Explanation:**
  * \`2\` and \`3\` are candidates, and \`2 + 2 + 3 = 7\`. Note that \`2\` can be used multiple times.
  * \`7\` is a candidate, and \`7 = 7\`.
  These are the only two combinations.

  ### Example 2
  **Input:** \`candidates = [2, 3, 5]\`, \`target = 8\`
  **Output:** \`[[2, 2, 2, 2], [2, 3, 3], [3, 5]]\`
  **Explanation:** * \`2 + 2 + 2 + 2 = 8\`
  * \`2 + 3 + 3 = 8\`
  * \`3 + 5 = 8\`

  ### Example 3
  **Input:** \`candidates = [2]\`, \`target = 1\`
  **Output:** \`[]\`
  **Explanation:** The target is less than the smallest candidate, so no combinations are possible.

  ---

  ## Constraints

  * \`1 <= candidates.length <= 30\`
  * \`2 <= candidates[i] <= 40\`
  * All elements of \`candidates\` are **distinct**.
  * \`1 <= target <= 40\``,
      timelimit: 2000,
      memorylimit: 256,
      codes: {
        create: [
          {
            classcode: classCode,
            maincode: mainCode,
            language: "cpp",
          },
          {
            classcode: rustClassCode,
            maincode: rustMainCode,
            language: "rust",
          },
          {
            classcode: javaClassCode,
            maincode: javaMainCode,
            language: "java",
          },
          {
            classcode: jsClassCode,
            maincode: jsMainCode,
            language: "js",
          },
          {
            classcode: tsClassCode,
            maincode: tsMainCode,
            language: "ts",
          },
          {
            classcode: pyClassCode,
            maincode: pyMainCode,
            language: "py",
          },
        ],
      },
      testcases: {
        create: testcases,
      },
    },
  });

  console.log(`Created problem with id: ${problem.id}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
