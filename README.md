# GitHub File Proxy

A simple Deno application that acts as a proxy for accessing GitHub files in private repositories.

## Features

- Proxy access to GitHub files
- Password-protected access
- Uses GitHub Token for authentication
- Deployable to Deno Deploy

## Quick Deployment

1. Fork this repository
2. Log in to [Deno Deploy](https://dash.deno.com/)
3. Create a new Deno Deploy application
4. Set the following environment variables:
   - `GITHUB_TOKEN`: Your GitHub personal access token
   - `PASSWORD`: The password for access protection
5. Set the entry file to `main.ts`
6. Deploy the application




### Environment Variables

| Variable Name | Description |
|---------------|-------------|
| `GITHUB_TOKEN` | Token used for GitHub API access, obtained from [GitHub Settings](https://github.com/settings/tokens) |
| `PASSWORD` | Password for access protection |


## Usage Examples

Suppose you want to access the file `src/config.txt` in the `myrepo` repository owned by `myname`, on the `main` branch, and your Deno Deploy URL is `https://example.deno.dev/`, and your password is `secret`: https://example.deno.dev/myname/myrepo/main/src/config.txt?password=secret

## License

MIT License
