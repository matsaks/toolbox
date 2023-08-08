# Standard for DevOps gruppe 4

Version 1.0

## Commit messages

- Commit messages should be written in English and should be descriptive of the changes made.
- The message should be written in the imperative mood, e.g. "Fix bug" and not "Fixed bug" or "Fixes bug".
- The first line (Title) of the commit message should be short (50 chars or less) and descriptive. That is the Title of the commit message.
- The second line should be blank.
- The third line should be the start of the body of the commit message. This should be a detailed description of the changes made. This should be wrapped at 72 characters.
- The body of the commit message should be separated from the footer by a blank line.
- the footer should contain any information about the commit, such as issue numbers, author names. It is important that these link

### Commit Template

```text:
#<issue number> <Short Descriptive Title>

<Commit Body>

Relates: #<issue number>
Author: @<username>, @<other author>, ...
```

### Commit example

```text:
#101 Javadoc update for core module

All classes in the core module is reviewed, and javadoc is updated/corrected

Relates: #101
Author: @MarkusRJ
```

## Merge requests

- Merge requests should be descriptive of the changes made.
- The Changes made in the merge request should be linked to an issue.
- The merge request should be reviewed by at least one other person, than the author.
- The merge request should be approved by at least one other person, than the author.
- The merge request should be merged by the author, after it has been approved.
- The merge should be done using the "Squash and merge" option.
- The merge request should be deleted after it has been merged.
- The issue should be closed after the merge request has been merged.
  - This can be done by adding "Closes #issue number" to the merge request description.

    ```text:
    Closes: #101
    ```

<!-- ### Merge request template

```text:

```

### Merge request example

```text:

```

## Branches

## Code reviews

## Documentation -->
