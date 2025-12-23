from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "0001"
down_revision = None
branch_labels = None
depends_on = None

def upgrade() -> None:
    op.execute("CREATE EXTENSION IF NOT EXISTS pgcrypto;")

    # sop
    op.create_table(
        "sop",
        sa.Column("sop_id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("title", sa.Text(), nullable=False),
        sa.Column("status", sa.Text(), nullable=False),
        sa.Column("tags", postgresql.ARRAY(sa.Text()), nullable=False, server_default="{}"),
        sa.Column("current_version", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.Column("created_by", sa.Text(), nullable=True),
        sa.Column("updated_by", sa.Text(), nullable=True),
    )
    op.create_check_constraint(
        "ck_sop_status",
        "sop",
        "status IN ('draft','published','retired')"
    )
    op.create_index("idx_sop_status", "sop", ["status"])
    op.create_index("idx_sop_updated_at", "sop", [sa.text("updated_at DESC")])

    # sop_version
    op.create_table(
        "sop_version",
        sa.Column("sop_id", postgresql.UUID(as_uuid=True), sa.ForeignKey("sop.sop_id", ondelete="CASCADE"), nullable=False),
        sa.Column("version", sa.Integer(), nullable=False),
        sa.Column("content_hash", sa.Text(), nullable=False),
        sa.Column("content_json", postgresql.JSONB(), nullable=True),
        sa.Column("content_ref", sa.Text(), nullable=True),
        sa.Column("published_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.Column("published_by", sa.Text(), nullable=True),
        sa.PrimaryKeyConstraint("sop_id", "version", name="pk_sop_version"),
    )
    op.create_index("idx_sop_version_published_at", "sop_version", [sa.text("published_at DESC")])
    op.create_index("idx_sop_version_hash", "sop_version", ["content_hash"])

    # audit_event (append-only)
    op.create_table(
        "audit_event",
        sa.Column("event_id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("event_type", sa.Text(), nullable=False),
        sa.Column("occurred_at", sa.DateTime(timezone=True), nullable=False),

        sa.Column("producer", sa.Text(), nullable=False),
        sa.Column("correlation_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("causation_id", postgresql.UUID(as_uuid=True), nullable=True),

        sa.Column("actor_type", sa.Text(), nullable=False),
        sa.Column("actor_id", sa.Text(), nullable=False),
        sa.Column("actor_display", sa.Text(), nullable=True),

        sa.Column("tenant_id", sa.Text(), nullable=True),
        sa.Column("schema_version", sa.Integer(), nullable=False),

        sa.Column("payload", postgresql.JSONB(), nullable=False),

        sa.Column("kafka_topic", sa.Text(), nullable=True),
        sa.Column("kafka_partition", sa.Integer(), nullable=True),
        sa.Column("kafka_offset", sa.BigInteger(), nullable=True),

        sa.Column("ingested_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
    )
    op.create_index("idx_audit_event_occurred_at", "audit_event", [sa.text("occurred_at DESC")])
    op.create_index("idx_audit_event_type", "audit_event", ["event_type"])
    op.create_index("idx_audit_event_correlation", "audit_event", ["correlation_id"])

    # consumer_processed_event (idempotency ledger)
    op.create_table(
        "consumer_processed_event",
        sa.Column("consumer_group", sa.Text(), nullable=False),
        sa.Column("event_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("event_type", sa.Text(), nullable=False),
        sa.Column("processed_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.Column("kafka_topic", sa.Text(), nullable=True),
        sa.Column("kafka_partition", sa.Integer(), nullable=True),
        sa.Column("kafka_offset", sa.BigInteger(), nullable=True),
        sa.PrimaryKeyConstraint("consumer_group", "event_id", name="pk_consumer_processed_event"),
    )
    op.create_index("idx_consumer_processed_at", "consumer_processed_event", [sa.text("processed_at DESC")])
    op.create_index("idx_consumer_event_type", "consumer_processed_event", ["consumer_group", "event_type"])


def downgrade() -> None:
    op.drop_index("idx_consumer_event_type", table_name="consumer_processed_event")
    op.drop_index("idx_consumer_processed_at", table_name="consumer_processed_event")
    op.drop_table("consumer_processed_event")

    op.drop_index("idx_audit_event_correlation", table_name="audit_event")
    op.drop_index("idx_audit_event_type", table_name="audit_event")
    op.drop_index("idx_audit_event_occurred_at", table_name="audit_event")
    op.drop_table("audit_event")

    op.drop_index("idx_sop_version_hash", table_name="sop_version")
    op.drop_index("idx_sop_version_published_at", table_name="sop_version")
    op.drop_table("sop_version")

    op.drop_index("idx_sop_updated_at", table_name="sop")
    op.drop_index("idx_sop_status", table_name="sop")
    op.drop_constraint("ck_sop_status", "sop", type_="check")
    op.drop_table("sop")