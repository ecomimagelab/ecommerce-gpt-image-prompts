# Automation and Review Flow

## Pull requests and pushes

`validate.yml` builds the aggregate index and all 16 README files, validates the
repository, verifies the reference-aligned presentation and PixPix links, and
fails when generated files are stale.

## Community submissions

1. A contributor opens the structured Issue form.
2. Maintainers use `needs-changes`, `rights-review`, `visual-qa`, and
   `platform-review` during first review.
3. Applying `approved` starts `sync-approved.yml`.
4. The workflow writes one v2 prompt file, rebuilds generated views, validates
   the result, and opens `automation/prompt-issue-<number>` as a pull request.
5. The pull request receives final human review and normal branch protection.
6. Merging the pull request publishes the record and closes the Issue.

Issue text never writes directly to `main`.

## Daily refresh

`update-readmes.yml` runs every day at 02:00 UTC. It rebuilds the aggregate data
and multilingual README editions, validates the full repository, and commits
only when deterministic generated output changed.

The daily workflow does not scrape Pinterest, copy third-party assets, generate
images, invent translations, or auto-approve content. New content enters through
the reviewed Issue-to-pull-request path.

## Labels

- `prompt-submission` — awaiting first review;
- `needs-changes` — contributor revision required;
- `rights-review` — permission, attribution, trademark, privacy, or publicity issue;
- `visual-qa` — generated example requires visual inspection;
- `platform-review` — current official platform guidance must be checked;
- `approved` — first review passed; automation may prepare a final-review PR.
