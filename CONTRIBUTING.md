# Contributing to Moddeur Ultime

We are open to all contributions whether they are code or bug reports ^^.

## Development

## Installation

1. Ensure you have [NodeJS](https://nodejs.org) installed (preferred version 19.8.1).
2. After cloning the repository, run `npm install` in the root of the repository. This will install all dependencies as well as build all local packages.
3. To start the bot, run `npm run dev` (after setup of the `.env` file in the [next section](#files)).

## Files
To test the bot, you need to setup a file called `.env` with test bot

Structure of the `.env` file :
```
DISCORD_TOKEN=
CLIENT_ID=

GUILD_ID=

NPE_ROLE=

DOC_ROLE=
MU_ROLE=
FORGE_ROLE=
DISCORD_ROLE=

APPROBATION_RULES_CHANNEL=
SUGGESTION_CHANNEL=
RULES_CHANNEL=
REPORT_PING_CHANNEL=

RULES_MESSAGE=
```