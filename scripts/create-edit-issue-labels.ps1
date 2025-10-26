# Define desired labels
$labels = @(
    @{ name = "Bug"; color = "e11d48"; description = "Something is not working as expected." },
    @{ name = "Enhancement"; color = "0ea5e9"; description = "Improve existing functionality or performance." },
    @{ name = "Feature"; color = "84cc16"; description = "A new feature or addition to the project." },
    @{ name = "Fix"; color = "f97316"; description = "A specific fix applied to resolve an issue." },
    @{ name = "Documentation"; color = "9333ea"; description = "Changes or additions to project documentation." },
    @{ name = "Deployment"; color = "fbbf24"; description = "Issues related to deployment or release process." },
    @{ name = "Deprecated"; color = "6b7280"; description = "Indicates outdated or soon-to-be-removed functionality." },
    @{ name = "Environment"; color = "10b981"; description = "Environment-specific issues or setup instructions." },
    @{ name = "Priority: High"; color = "dc2626"; description = "Critical issues that need immediate attention." },
    @{ name = "Priority: Medium"; color = "f59e0b"; description = "Important issues that should be addressed soon." },
    @{ name = "Priority: Low"; color = "84cc16"; description = "Non-urgent issues that can be addressed later." },
    @{ name = "MVP"; color = "6366f1"; description = "Issues essential for the Minimum Viable Product." },
    @{ name = "UI"; color = "3b82f6"; description = "User interface and design-related issues." },
    @{ name = "Refactor"; color = "9333ea"; description = "Code improvements without changing functionality." },
    @{ name = "Test"; color = "eab308"; description = "Issues related to testing or adding tests." },
    @{ name = "Question"; color = "e11d48"; description = "Clarifications or inquiries about the project." }
)


# Get existing labels from the repo
$existingLabels = gh label list --json name | ConvertFrom-Json | ForEach-Object { $_.name }

# Iterate through desired labels
foreach ($label in $labels) {
    if ($existingLabels -contains $label.name) {
        # Update color if label exists
        gh label edit $label.name --color $label.color --description $label.description
    } else {
        # Create label if missing
        gh label create $label.name --color $label.color --description $label.description
    }
}
