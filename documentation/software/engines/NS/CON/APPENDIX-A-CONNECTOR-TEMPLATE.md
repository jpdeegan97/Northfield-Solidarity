# Appendix A — Connector Template (starter)

Connector must implement:
- discover_schema()
- test_connection()
- read(cursor) and/or stream()
- write(payloads) (dest connectors)
- checkpoint(cursor)
- classify_error(e)

Must ship with:
- config schema (jsonschema)
- unit tests + integration tests
- rate limit config
- error taxonomy mapping
- docs + examples
