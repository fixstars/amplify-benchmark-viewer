# Welcome to Amplify benchmark viewer contributing guide

Thank you for your interest in contributing to Amplify benchmark viewer! There are a few things you need to know.

## Lefthook

This project uses `Lefthook` to use Git hooks.

- Lefthook: [https://github.com/evilmartians/lefthook](https://github.com/evilmartians/lefthook)

So, If you want to contribute to this project, please install it to refer to the following link.

- Install lefthook: [https://github.com/evilmartians/lefthook/blob/master/docs/install.md](https://github.com/evilmartians/lefthook/blob/master/docs/install.md)

And then, execute the following command to configure Git hooks.

```bash
lefthook install
# npx lefthook install
```

This Git hooks will run `format`, `lint(ESLint, StyleLint RemarkLint, CSpell)`, and `test`.

## Commit message rule

This project follows `Conventional Commits`.

- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

In here, `Footer` is optional, but when writing a commit message, Please add one of the following commit `Type` to the commit message.

- `fix:`: In case of bug fixed.
- `feat:`: In case of feature added.
- `build:`: In case of build system or dependencies changed.
- `chore:`: In case of build system or dependencies changed.
- `ci:`: In case of CI configuration or scripts changed.
- `docs:`: In case of only documentation changed.
- `style:`: In case of code style(space, formatting, colons, etc) changed.
- `refactor:`: In case of refactoring code not fixing bugs or adding features.
- `pref:`: In case of modifying code for improving performance.
- `test:`: In case of adding test code or modifying existing test code.
