# NS-INV-003-ARCHITECTURE — System Architecture

## High-Level Pipeline
1. **Ingest**: transcript + metadata + optional embeddings/context vectors  
2. **Normalize**: canonical schema, tokenization, span indexing  
3. **Represent**: compute or import embeddings/features  
4. **Invert**: run decoders/inversion methods to produce candidates  
5. **Score**: ranking, uncertainty estimation, contradiction checks  
6. **Validate**: policy gates (GGE), PII filters, human review optional  
7. **Publish**: export artifacts (docs, graph edges, memory candidates)  
8. **Monitor**: drift, quality regressions, privacy violations  

## Core Components
- **INV-Ingestor**: connectors (Chat logs, docs, call transcripts)
- **INV-Indexer**: turn/span IDs, episode segmentation
- **INV-Feature Store**: embeddings + derived features
- **INV-Decoders**: pluggable inversion modules
- **INV-Scorer**: ranking, calibration, contradiction detection
- **INV-Gates**: policy enforcement hooks (GGE)
- **INV-Exporter**: GGE graph edges, DRE research units, CWP prompts
- **INV-UI**: latent explorer + audit viewer

## Pluggability
- Multiple embedding providers / formats.
- Multiple inversion strategies (linear, sparse, neural, hybrid).
- Multiple scoring backends.
