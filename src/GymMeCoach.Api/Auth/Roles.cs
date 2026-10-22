namespace GymMeCoach.Api.Auth;

public static class Roles
{
    public const string User = "Utente";
    public const string Admin = "Admin";

    // Fixed ids so the roles can be seeded by a migration.
    public static readonly Guid UserId = new("6f1b7a52-3c1e-4b8e-9a43-0d2f5c7e1a01");
    public static readonly Guid AdminId = new("6f1b7a52-3c1e-4b8e-9a43-0d2f5c7e1a02");
}
