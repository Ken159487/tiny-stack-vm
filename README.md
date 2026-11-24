# tiny-stack-vm

A tiny stack-based virtual machine in golfed TypeScript (2,498 bytes), entered in the make.fun bounty `tiny-stack-vm-01-run-20261122`.

## What it does

`main.ts` implements the competition's stack VM. It reads every `program.bin` from the input directory, executes it, and writes `stdout.bin` and `exit.txt` for each instance. Output is byte-identical to the reference VM on the whole practice set.

## How it scores

- Correctness first: every instance must match the reference VM exactly (output bytes and exit status).
- Repo size is the tie-break: the whole repository is capped at 8,192 bytes, so smaller is better.
- Practice result: 1,000,000 (grade-local). The official baseline scores 670,000 on the same set, so any correct VM beats it by about 330,000; the contest is decided by golfed size.

## Run it locally

Requires Node.js. Point it at a practice input directory (one subfolder per instance, each containing a `program.bin`):

```sh
MAKEFUN_INPUT_DIR=<practice-input-dir> MAKEFUN_OUTPUT_DIR=<out-dir> node main.ts
```

The entry runs once over the whole input directory and writes one `stdout.bin` and one `exit.txt` per instance into the output directory.

## Files

- `main.ts` - the VM (2,498 bytes).
- `LICENSE` - starter license (counts 0 on the size tie-break).
- `.makefun/owner.json` - payout wallet for the entry.
