use crate::models::LogEntry;
use std::fs::OpenOptions;
use std::io::{BufRead, BufReader, Write};

const LEDGER_FILE: &str = "ledger.ndjson";

pub fn append_entry(entry: &LogEntry) -> Result<(), Box<dyn std::error::Error>> {
    let mut file = OpenOptions::new()
        .create(true)
        .append(true)
        .open(LEDGER_FILE)?;

    let line = serde_json::to_string(entry)?;
    writeln!(file, "{}", line)?;
    Ok(())
}

pub fn read_all_entries() -> Result<Vec<LogEntry>, Box<dyn std::error::Error>> {
    let file = match std::fs::File::open(LEDGER_FILE) {
        Ok(f) => f,
        Err(_) => return Ok(Vec::new()),
    };

    let reader = BufReader::new(file);

    let entries = reader
        .lines()
        .filter_map(|line| line.ok())
        .filter_map(|line| serde_json::from_str(&line).ok())
        .collect();

    Ok(entries)
}
