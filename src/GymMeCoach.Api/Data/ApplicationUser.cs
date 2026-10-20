using Microsoft.AspNetCore.Identity;

namespace GymMeCoach.Api.Data;

public class ApplicationUser : IdentityUser<Guid>
{
    // Needed by the engine's "adults only" safety rule; required at registration (F2-T05).
    public DateOnly? BirthDate { get; set; }
}
