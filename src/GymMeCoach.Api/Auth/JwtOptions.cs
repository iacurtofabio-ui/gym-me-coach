using System.ComponentModel.DataAnnotations;

namespace GymMeCoach.Api.Auth;

public class JwtOptions
{
    public const string SectionName = "Jwt";

    [Required]
    public string Issuer { get; set; } = "";

    [Required]
    public string Audience { get; set; } = "";

    // Signing key: never in the repository (User Secrets locally, environment variable in Azure).
    [Required, MinLength(32)]
    public string Key { get; set; } = "";

    [Range(1, 1440)]
    public int ExpiryMinutes { get; set; } = 60;
}
