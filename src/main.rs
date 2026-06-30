use chrono::Utc;
use clap::{Parser, Subcommand};
use serde_json::json;
use uuid::Uuid;

mod ledger;
mod models;
mod storage;

use models::{EntryCategory, LogEntry};
use storage::{append_entry, read_all_entries};

#[derive(Parser)]
#[command(name = "vaultlog")]
#[command(about = "Immutable hash-chained asset ledger", long_about = None)]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// Add a new entry to the ledger
    Add {
        #[arg(short, long)]
        description: String,

        #[arg(short, long)]
        category: String,
    },
    /// List all entries
    List,
    /// Verify the chain integrity
    Verify,
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let cli = Cli::parse();

    match cli.command {
        Commands::Add {
            description,
            category,
        } => {
            add_entry(description, category)?;
        }
        Commands::List => {
            list_entries()?;
        }
        Commands::Verify => {
            verify_ledger()?;
        }
    }

    Ok(())
}

fn add_entry(description: String, category_str: String) -> Result<(), Box<dyn std::error::Error>> {
    // Parse category
    let category = match category_str.to_lowercase().as_str() {
        "asset" => EntryCategory::Asset,
        "event" => EntryCategory::Event,
        "transfer" => EntryCategory::Transfer,
        "inspection" => EntryCategory::Inspection,
        "note" => EntryCategory::Note,
        _ => {
            println!("⚠️ Unknown category '{}', using 'Note'", category_str);
            EntryCategory::Note
        }
    };

    // Get last entry for previous hash
    let entries = read_all_entries()?;
    let previous_hash = entries
        .last()
        .map(|e| e.hash.clone())
        .unwrap_or_else(|| "genesis".to_string());

    // Create entry
    let mut entry = LogEntry {
        id: Uuid::new_v4().to_string(),
        timestamp: Utc::now(),
        category,
        description,
        metadata: json!({}),
        previous_hash,
        hash: String::new(),
    };

    // Compute hash
    entry.hash = ledger::compute_hash(&entry);

    // Save to disk
    append_entry(&entry)?;

    println!("✓ Entry added!");
    println!("  ID: {}", entry.id);
    println!("  Hash: {}", &entry.hash[..16]);
    Ok(())
}

fn list_entries() -> Result<(), Box<dyn std::error::Error>> {
    let entries = read_all_entries()?;

    if entries.is_empty() {
        println!(
            "📭 No entries found. Add one with: cargo run -- add --description \"...\" --category asset"
        );
        return Ok(());
    }

    println!("📋 Ledger Entries ({} total):", entries.len());
    println!("{}", "-".repeat(60));

    for (i, entry) in entries.iter().enumerate() {
        println!(
            "#{} [{:?}] {} — {}",
            i + 1,
            entry.category,
            entry.timestamp.format("%Y-%m-%d %H:%M"),
            entry.description
        );
        println!("   Hash: {}...", &entry.hash[..16]);
        println!();
    }

    Ok(())
}

fn verify_ledger() -> Result<(), Box<dyn std::error::Error>> {
    let entries = read_all_entries()?;

    if entries.is_empty() {
        println!("📭 Ledger is empty. Nothing to verify.");
        return Ok(());
    }

    println!("🔍 Verifying chain integrity...");

    if ledger::verify_chain(&entries) {
        println!(
            "✓ Chain integrity verified — {} entries, all hashes valid",
            entries.len()
        );
    } else {
        println!("❌ CHAIN BROKEN! Data has been tampered with!");
        println!("   The hash chain is invalid. Do not trust this ledger.");
    }

    Ok(())
}
