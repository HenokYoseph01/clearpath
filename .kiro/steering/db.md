# Database Conventions

ORM: Drizzle ORM with expo-sqlite.

- Schema: `modules/db/schema.ts`
- Queries: `modules/db/queries.ts`
- Components never call Drizzle or SQLite directly.
- Timestamps are Unix integers.
- JSON arrays are stored as text and parsed in query helpers.
- Booleans are stored as integer flags.
- Tables use auto-increment integer primary keys.
