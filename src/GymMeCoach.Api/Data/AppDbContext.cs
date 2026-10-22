using GymMeCoach.Api.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace GymMeCoach.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options)
    : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>(options)
{
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // Fixed ConcurrencyStamp: the default is a random Guid, which would make the seed data change at every build.
        builder.Entity<IdentityRole<Guid>>().HasData(
            new IdentityRole<Guid> { Id = Auth.Roles.UserId, Name = Auth.Roles.User, NormalizedName = Auth.Roles.User.ToUpperInvariant(), ConcurrencyStamp = "a1c3e5f7-0001-4000-8000-000000000001" },
            new IdentityRole<Guid> { Id = Auth.Roles.AdminId, Name = Auth.Roles.Admin, NormalizedName = Auth.Roles.Admin.ToUpperInvariant(), ConcurrencyStamp = "a1c3e5f7-0002-4000-8000-000000000002" });
    }
}
