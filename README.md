<p align="center">
  <a href="https://github.com/yuya-takeyama/docker-tag-from-github-ref-action/actions"><img alt="typescript-action status" src="https://github.com/yuya-takeyama/docker-tag-from-github-ref-action/workflows/build-test/badge.svg"></a>
</p>

# Docker tag from github.ref

A GitHub Action to generate a Docker tag from github.ref

## Usage

This action only generates a Docker tag.

To build and push Docker images, you need to use another action like [docker/build-push-action](https://github.com/docker/build-push-action).

```yaml
steps:
  - uses: actions/checkout@v2
  - id: docker-tag
    uses: yuya-takeyama/docker-tag-from-github-ref-action@v1
  - name: Build and push
    uses: docker/build-push-action@v2
    with:
      push: true
      tags: user/app:${{ steps.docker-tag.outputs.tag }}
```

## Inputs

| Name                        | Required | Default         | Description                                                 |
|-----------------------------|----------|-----------------|-------------------------------------------------------------|
| `latest-branches`           | `false`  | `'main,master'` | Comma-separated names of branches to be `latest` Docker tag |
| `remove-version-tag-prefix` | `false`  | `'true'`        | Remove `v` from version tag prefix                          |

## Outputs

| Name  | Description          |
|-------|----------------------|
| `tag` | Generated Docker tag |

## Tag generation example

This is the default behavior.

| Git Reference       | `github.ref`        | Output   |
|---------------------|---------------------|----------|
| `main` branch       | `refs/heads/main`   | `latest` |
| `master` branch     | `refs/heads/master` | `latest` |
| `v1.2.3` tag        | `refs/tags/v1.2.3`  | `1.2.3`  |
| Pull Request `#123` | `refs/pull/1/merge` | `pr-123` |
| `foo` branch        | `refs/heads/foo`    | `foo`    |
| `bar` tag           | `refs/tags/bar`     | `bar`    |
