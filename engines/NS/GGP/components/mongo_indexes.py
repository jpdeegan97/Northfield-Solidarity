import os
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URI = os.getenv("MONGO_URI", "mongodb://ggp-mongo:27017")
MONGO_DB = os.getenv("MONGO_DB", "ggp")

async def ensure_indexes():
    client = AsyncIOMotorClient(MONGO_URI)
    db = client[MONGO_DB]

    # rm_sop_index
    c = db["rm_sop_index"]
    await c.create_index([("status", 1), ("updated_at", -1)], name="idx_status_updated")
    await c.create_index([("tags", 1), ("updated_at", -1)], name="idx_tags_updated")
    # Optional text search on title
    await c.create_index([("title", "text")], name="idx_title_text")

    # rm_sop_versions
    c = db["rm_sop_versions"]
    await c.create_index([("sop_id", 1), ("version", -1)], name="idx_sop_version_desc")
    await c.create_index([("sop_id", 1), ("version", 1)], unique=True, name="uq_sop_version")

    # rm_audit_trail
    c = db["rm_audit_trail"]
    await c.create_index([("occurred_at", -1)], name="idx_occurred_at_desc")
    await c.create_index([("entity_refs.sop_id", 1), ("occurred_at", -1)], name="idx_sop_occurred_at")

    client.close()

if __name__ == "__main__":
    asyncio.run(ensure_indexes())