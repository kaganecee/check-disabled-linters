# Check Disabled Linters

GitHub action checking disabled linters then comment to pull request.

## Usage

Add workflow to your project (ex. `.github/workflows/action-test.yml`):

```yaml
name: Check Disabled Linters
on:
  pull_request:
env:
  GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}}
jobs:
  check-disabled-linters:
    name: Check Disabled Linters
    runs-on: ubuntu-latest
    steps:
    - name: Check Disabled Linters
      uses: kaganecee/check-disabled-linters@master
```

## License

MIT.