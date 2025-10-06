# How To Set Git Repository's Default Branch?

## Set default branch

```
gh repo edit <OWNER>/<REPO> --default-branch <branch_name>
```

## Setting the default branch locally

```
git fetch origin
git checkout <new_default_branch_name>
git branch -u origin/<new_default_branch_name>
```
