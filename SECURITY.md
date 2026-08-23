# Security Policy

## Secrets

Never commit API keys, provider tokens, private credentials, or unrestricted developer secrets.

Use environment variables, operating-system credential storage, or another approved secret manager. Example/local secret files must be ignored by git.

## AI provider credentials

Creator/editor credentials and exported-game credentials must be treated as separate trust domains. Exported games must never embed unrestricted developer keys.

## AI tool safety

AI roles receive explicit tool allowlists and least-privilege capabilities. A model response is not permission to bypass engine validation or execute arbitrary operating-system commands.

User-authored/generated game scripts must run inside explicitly documented trust boundaries.

## Project files

Treat imported projects, plugins, scripts, and generated code as untrusted until validated. Parsing/serialization layers should reject invalid schemas safely and avoid implicit code execution.

## Reporting

Until a formal private reporting channel is established, do not publish credential material or exploit details in public issues. Repository maintainers should establish an appropriate private reporting mechanism before public releases.
