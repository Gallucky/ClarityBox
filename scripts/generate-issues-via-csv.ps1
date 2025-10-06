Add-Type -AssemblyName System.Windows.Forms

# === Select CSV file via dialog ===
$OpenFileDialog = New-Object System.Windows.Forms.OpenFileDialog
$OpenFileDialog.Filter = "CSV files (*.csv)|*.csv"
$OpenFileDialog.Title = "Select the CSV file with GitHub issues"
# Sets default path to current PowerShell directory (root of project)
$OpenFileDialog.InitialDirectory = (Get-Location).Path

# Showing the dialog and if it is not OK result that means
# the user has not selected a file and the script will exit.
if ($OpenFileDialog.ShowDialog() -ne [System.Windows.Forms.DialogResult]::OK) {
    Write-Host "No file selected. Exiting..." -ForegroundColor Red
    exit
}

$csvPath = $OpenFileDialog.FileName
Write-Host "Selected CSV: $csvPath" -ForegroundColor Green

# === Config ===
$repo = "Gallucky/ClarityBox"
$assignee = Read-Host "Enter the assignee's GitHub username"
$bodyPrefix = "> <small> ---=== ### Bulk-Generated ### ===--- </small>`n`n"

# Import CSV
$issues = Import-Csv -Path $csvPath

# Before creating issues, authenticate with GitHub CLI
# gh auth login

Write-Host -ForegroundColor Cyan "Before creating issues, please make sure you already authenticated with GitHub CLI"
Write-Host -ForegroundColor Cyan "via the command: gh auth login"
Write-Host -ForegroundColor Cyan "Press Enter to continue or Ctrl+C to cancel..."
Read-Host

# Loop through each row and create GitHub issue
foreach ($issue in $issues) {
    $title = $issue.Title
    $body = $bodyPrefix + ($issue.Body -replace '\\n', "`n")  # Prepend prefix and convert literal \n
    $labels = $issue.Labels -replace '\s+', ''  # Clean up spaces

    Write-Host "Creating issue: $title" -ForegroundColor Magenta

    gh issue create `
        --repo $repo `
        --title "$title" `
        --body "$body" `
        --label $labels `
        --assignee $assignee

    Start-Sleep -Milliseconds 500
}

Write-Host "All issues processed!" -ForegroundColor Green
