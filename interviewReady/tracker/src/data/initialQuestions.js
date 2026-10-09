export const INITIAL_QUESTIONS = [
  // DSA (LeetCode)
  {
    id: 'dsa-1',
    title: 'Two Sum (LeetCode 1)',
    category: 'DSA',
    difficulty: 'Easy',
    status: 'Pending',
    leetcodeUrl: 'https://leetcode.com/problems/two-sum/',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    solution: `// Time: O(n) | Space: O(n)
function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`,
    notes: 'Use a Hash Map to store complement numbers for O(n) time complexity.'
  },
  {
    id: 'dsa-2',
    title: 'Remove Duplicates from Sorted Array (LeetCode 26)',
    category: 'DSA',
    difficulty: 'Easy',
    status: 'Pending',
    leetcodeUrl: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/',
    description: 'Remove duplicates in-place from a sorted array so that each element appears only once.',
    solution: `// Time: O(n) | Space: O(1)
function removeDuplicates(nums) {
    if (nums.length === 0) return 0;
    let k = 0;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== nums[k]) {
            k++;
            nums[k] = nums[i];
        }
    }
    return k + 1;
}`,
    notes: 'Two-pointer technique. Slow pointer k keeps track of unique element index.'
  },
  {
    id: 'dsa-3',
    title: 'Move Zeroes (LeetCode 283)',
    category: 'DSA',
    difficulty: 'Easy',
    status: 'Pending',
    leetcodeUrl: 'https://leetcode.com/problems/move-zeroes/',
    description: 'Move all zeroes to the end of the array while maintaining the relative order of non-zero elements.',
    solution: `// Time: O(n) | Space: O(1)
function moveZeroes(nums) {
    let writeIndex = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            if (i !== writeIndex) {
                [nums[writeIndex], nums[i]] = [nums[i], nums[writeIndex]];
            }
            writeIndex++;
        }
    }
}`,
    notes: 'Read/Write pointer swap approach.'
  },
  {
    id: 'dsa-4',
    title: 'Rotate Array (LeetCode 189)',
    category: 'DSA',
    difficulty: 'Medium',
    status: 'Pending',
    leetcodeUrl: 'https://leetcode.com/problems/rotate-array/',
    description: 'Rotate array to the right by k steps in-place.',
    solution: `// Time: O(n) | Space: O(1)
function rotate(nums, k) {
    const n = nums.length;
    k = k % n;
    
    function reverse(start, end) {
        while (start < end) {
            [nums[start], nums[end]] = [nums[end], nums[start]];
            start++;
            end--;
        }
    }

    reverse(0, n - 1);
    reverse(0, k - 1);
    reverse(k, n - 1);
}`,
    notes: '3-Step reversal algorithm trick: Reverse all, reverse first k, reverse remaining.'
  },
  {
    id: 'dsa-5',
    title: '3Sum (LeetCode 15)',
    category: 'DSA',
    difficulty: 'Medium',
    status: 'Pending',
    leetcodeUrl: 'https://leetcode.com/problems/3sum/',
    description: 'Find all unique triplets in the array which give the sum of zero.',
    solution: `// Time: O(n^2) | Space: O(1)
function threeSum(nums) {
    const results = [];
    nums.sort((a, b) => a - b);
    
    for (let i = 0; i < nums.length - 2; i++) {
        if (nums[i] > 0) break;
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        let left = i + 1, right = nums.length - 1;
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if (sum === 0) {
                results.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                left++;
                right--;
            } else if (sum < 0) left++;
            else right--;
        }
    }
    return results;
}`,
    notes: 'Sort + Two Pointers. Skip duplicate elements to avoid non-unique triplets.'
  },

  // Git & GitHub
  {
    id: 'git-1',
    title: 'Wrong Branch, Correct Work',
    category: 'Git',
    difficulty: 'Medium',
    status: 'Pending',
    description: 'Accidentally made 4 commits on main instead of feature branch. How to move work without losing it?',
    solution: `Unpushed local commits:
1. git branch feature/login (creates branch at HEAD)
2. git checkout main
3. git reset --hard HEAD~4 (resets main back 4 commits)
4. git checkout feature/login

If already pushed to shared remote:
- Do NOT force push reset.
- Create feature branch from current main, then git revert HEAD~4..HEAD on main.`,
    notes: 'Follow-up: Use cherry-pick if you only want specific commits. Never force-push shared main.'
  },
  {
    id: 'git-2',
    title: 'Merge Conflict During PR',
    category: 'Git',
    difficulty: 'Medium',
    status: 'Pending',
    description: 'Feature branch has merge conflict with main just before PR is merged. Walk through resolving it safely.',
    solution: `1. git fetch origin
2. git checkout feature/login
3. git rebase origin/main (or git merge origin/main)
4. Manually resolve conflict markers <<<<<<< in files
5. git add <resolved-files>
6. git rebase --continue
7. Run tests & linters
8. git push origin feature/login --force-with-lease`,
    notes: 'Rebase gives linear history; Merge preserves historic timestamps. Always run tests before pushing.'
  },
  {
    id: 'git-3',
    title: 'Secret Accidentally Committed',
    category: 'Git',
    difficulty: 'Hard',
    status: 'Pending',
    description: 'Developer committed API key to GitHub. What immediate steps should be taken?',
    solution: `1. REVOKE/ROTATE KEY IMMEDIATELY at provider service!
2. Purge secret from git history using git-filter-repo or BFG Repo Cleaner.
3. If unpushed recent commit: git rm --cached key.env && git commit --amend
4. Force push cleansed branch with --force-with-lease
5. Prevent with .gitignore, pre-commit hooks (gitleaks, trufflehog), and GitHub Secret Scanning.`,
    notes: 'Deleting file in a new commit is NOT enough because secret remains in historical Git blobs.'
  },
  {
    id: 'git-4',
    title: 'PR Review With New Changes',
    category: 'Git',
    difficulty: 'Easy',
    status: 'Pending',
    description: 'Reviewer asks for changes after multiple commits. How to update PR while keeping review clean?',
    solution: `1. Push new incremental commits for reviewer to inspect diff since last review.
2. After approval, squash/rebase into logical clean commits before merging.
3. Use --force-with-lease instead of -f to prevent overwriting remote changes.`,
    notes: 'Keep commits separate during active review; squash into clean units before final merge.'
  },
  {
    id: 'git-5',
    title: 'Recovering Lost Local Work',
    category: 'Git',
    difficulty: 'Hard',
    status: 'Pending',
    description: 'Git command ran incorrectly and local branch no longer points to yesterday work. How to recover?',
    solution: `1. Run 'git reflog' to view history of HEAD movements.
2. Locate commit hash from yesterday.
3. Restore into recovery branch: git checkout -b recovery-branch <commit-hash>
4. Verify tests and merge back to working branch.`,
    notes: 'git reflog tracks local HEAD movements for 90 days. Uncommitted working directory changes are NOT in reflog.'
  },

  // Technical (Full-Stack)
  {
    id: 'tech-1',
    title: 'JavaScript — Async Flow & Event Loop',
    category: 'Technical',
    difficulty: 'Medium',
    status: 'Pending',
    description: 'Explain Event Loop execution order for fetch(), setTimeout(), and synchronous UI updates.',
    solution: `Execution order:
1. Synchronous Call Stack code runs first.
2. Microtask Queue (Promises, async/await, queueMicrotask) empties COMPLETELY.
3. Render Pipeline updates UI frames.
4. Macrotask Queue (setTimeout, setInterval, I/O) executes ONE task per loop tick.

Blocking synchronous code blocks Call Stack, preventing rendering & event loop cycles (frozen UI).`,
    notes: 'Microtasks have higher priority than macrotasks.'
  },
  {
    id: 'tech-2',
    title: 'React — Unnecessary Re-render',
    category: 'Technical',
    difficulty: 'Medium',
    status: 'Pending',
    description: 'Parent component re-renders frequently causing children to slow down. How to optimize?',
    solution: `1. Use React Profiler to identify render causes.
2. Lift state down / component composition ({children}) to isolate state updates.
3. Wrap expensive pure children in React.memo().
4. Use useCallback() for function props and useMemo() for objects/arrays to preserve referential equality.`,
    notes: 'Avoid over-memoizing simple components due to memory and comparison overhead.'
  },
  {
    id: 'tech-3',
    title: 'REST API + Express — Request Flow (401 vs 403)',
    category: 'Technical',
    difficulty: 'Easy',
    status: 'Pending',
    description: 'Protected GET /api/profile endpoint returning 401. Explain request flow and debugging.',
    solution: `Request Flow: Client -> Router -> Auth Middleware (Token check) -> Authorization Middleware (Role check) -> Controller.

Debugging 401:
1. Check Authorization: Bearer <token> header in client request.
2. Check CORS config allows Authorization header.
3. Validate JWT expiration & secret key match in Express middleware.

401 = Unauthenticated (Who are you?).
403 = Forbidden (I know who you are, but you lack permissions).`,
    notes: 'Auth middleware should run before route controller handlers.'
  },
  {
    id: 'tech-4',
    title: 'MongoDB + Mongoose — Duplicate Data & Race Conditions',
    category: 'Technical',
    difficulty: 'Hard',
    status: 'Pending',
    description: 'Registration API allowing two users to register with same email under concurrent race condition. How to prevent?',
    solution: `Application check if (await User.findOne(...)) fails in concurrent race conditions.

Solution:
1. Define Unique Index in Mongoose schema: email: { type: String, unique: true }
2. MongoDB WiredTiger engine enforces atomic check and throws E11000 error.
3. Catch error.code === 11000 in controller and return HTTP 409 Conflict.`,
    notes: 'TOCTOU (Time of check to time of use) requires database-level unique constraints.'
  },
  {
    id: 'tech-5',
    title: 'Authentication + Authorization + ImageKit',
    category: 'Technical',
    difficulty: 'Hard',
    status: 'Pending',
    description: 'Design authorization checks to prevent student from accessing another student private resource/upload.',
    solution: `1. Authorization: Extract current student ID from verified JWT (req.user.id). Never trust client route params blindly.
2. Ownership check: Compare resource.ownerId === req.user.id. Return 403 if mismatch.
3. ImageKit Upload Flow: Express endpoint generates temporary signed upload token -> Client uploads directly to ImageKit -> Client sends metadata back to Express backend.`,
    notes: 'Direct client-to-ImageKit upload saves Express server bandwidth & RAM.'
  },

  // Machine Coding
  {
    id: 'mc-1',
    title: 'Build Interview Practice Tracker Dashboard',
    category: 'Machine Coding',
    difficulty: 'Hard',
    status: 'In Progress',
    description: 'Build a responsive React/JS application to track weekly interview prep with stats, filtering, local storage, and responsive layout.',
    solution: `Features built:
- Total, DSA, Git/Technical, Machine Coding statistics.
- Interactive question filter by category, difficulty, status, search term.
- LocalStorage persistence.
- Modal for adding/editing questions.
- Drawer for inspecting complete interview solutions & code!`,
    notes: 'Section 4 Frontend Machine Coding Challenge.'
  }
];
