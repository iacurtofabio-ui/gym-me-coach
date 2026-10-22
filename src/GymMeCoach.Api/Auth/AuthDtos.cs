using System.ComponentModel.DataAnnotations;

namespace GymMeCoach.Api.Auth;

public record RegisterRequest(
    [Required, EmailAddress] string Email,
    [Required] string Password,
    [Required] DateOnly? BirthDate);

public record LoginRequest(
    [Required] string Email,
    [Required] string Password);

public record TokenResponse(string AccessToken, DateTime ExpiresAtUtc);

public record MeResponse(Guid Id, string Email, DateOnly? BirthDate, IReadOnlyList<string> Roles);
