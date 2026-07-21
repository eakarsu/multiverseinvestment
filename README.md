# Multiverse Consulting Platform

This repository is a local prototype. It must not be connected to live brokerage, banking, custody, or payment accounts.

## Local setup

1. Copy `.env.example` to a private environment file and replace every example secret.
2. Run `npm ci` in both `backend/` and `frontend/`.
3. Provision a dedicated disposable PostgreSQL database and export `DATABASE_URL`.
4. For a new disposable database only, run `INITIALIZE_DATABASE=1 CONFIRM_DATABASE_RESET=YES ./start.sh`. The seed currently resets its target database.
5. Set `BOOTSTRAP_ADMIN_EMAIL`, `BOOTSTRAP_ADMIN_PASSWORD`, and `BOOTSTRAP_ADMIN_NAME`, then run `npm run create-admin` in `backend/` once.
6. For subsequent launches, run `./start.sh` without the initialization flags.

The launcher never kills port owners, installs dependencies, starts system services, or resets data unless the two explicit database-reset flags are supplied. Login uses a scrypt-hashed administrator identity stored in PostgreSQL; bootstrap values must not be committed and are not needed by normal startup.

## Verification

Run `npm test` in `backend/` and `npm run build` in `frontend/`. A release candidate also requires an isolated database, successful `/api/health`, a successful browser login, rejection of invalid credentials, and confirmation that protected API routes reject missing or modified session tokens.
