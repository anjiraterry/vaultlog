use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct LogEntry {
    pub id: String,
    pub timestamp: DateTime<Utc>,
    pub category: EntryCategory,
    pub description: String,
    pub metadata: serde_json::Value,
    pub previous_hash: String,
    pub hash: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub enum EntryCategory {
    Asset,
    Event,
    Transfer,
    Inspection,
    Note,
}
