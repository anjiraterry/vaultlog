use crate::models::LogEntry;
use sha2::{Digest, Sha256};

pub fn compute_hash(entry: &LogEntry) -> String {
    let content = serde_json::to_string(entry).expect("Failed to serialize entry");

    let mut hasher = Sha256::new();
    hasher.update(content.as_bytes());
    hex::encode(hasher.finalize()) // Clean and simple!
}

pub fn verify_chain(entries: &[LogEntry]) -> bool {
    for i in 1..entries.len() {
        let expected_prev_hash = &entries[i - 1].hash;
        let actual_prev_hash = &entries[i].previous_hash;

        if expected_prev_hash != actual_prev_hash {
            return false;
        }
    }
    true
}
