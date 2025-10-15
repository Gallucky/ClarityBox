# How to create a git tag for repository version controlling?

```bash
git tag -a <version/tag-name> -m "<tag description>"
git push origin <version/tag-name>
```

## Example:

```bash
git tag -a v1.0.0 -m "Initial commit"
git push origin v1.0.0
```

## What to do if you created the tag but didn't push it and want to update/delete it?

```bash
git tag -d <version/tag-name>
```

### Example:

```bash
git tag -d v1.0.0
```

## What to do if you want to delete the tag you already pushed?

```bash
# Deletes the tag locally.
git tag -d <version/tag-name>

# Deletes the tag remotely.
git push origin --delete <version/tag-name>
```

### Example:

```bash
git tag -d v1.0.0
git push origin --delete v1.0.0
```
