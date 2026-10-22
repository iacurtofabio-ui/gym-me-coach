using System.Security.Claims;
using GymMeCoach.Api.Auth;
using GymMeCoach.Api.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace GymMeCoach.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController(
    UserManager<ApplicationUser> userManager,
    SignInManager<ApplicationUser> signInManager,
    ITokenService tokenService,
    TimeProvider clock) : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        var birthDate = request.BirthDate!.Value;
        if (!IsAdult(birthDate))
        {
            ModelState.AddModelError(nameof(request.BirthDate),
                $"Per usare Gym Me Coach bisogna avere almeno {AuthConstants.MinimumAge} anni.");
            return ValidationProblem(ModelState);
        }

        var user = new ApplicationUser
        {
            Id = Guid.NewGuid(),
            UserName = request.Email,
            Email = request.Email,
            BirthDate = birthDate,
        };

        var created = await userManager.CreateAsync(user, request.Password);
        if (!created.Succeeded)
        {
            foreach (var error in created.Errors)
                ModelState.AddModelError(error.Code, error.Description);
            return ValidationProblem(ModelState);
        }

        await userManager.AddToRoleAsync(user, Roles.User);
        return Created("/api/auth/me", null);
    }

    [HttpPost("login")]
    public async Task<ActionResult<TokenResponse>> Login(LoginRequest request)
    {
        var user = await userManager.FindByEmailAsync(request.Email);
        if (user is null)
            return Unauthorized();

        var result = await signInManager.CheckPasswordSignInAsync(user, request.Password, lockoutOnFailure: true);
        if (!result.Succeeded)
            return Unauthorized();

        var roles = await userManager.GetRolesAsync(user);
        return tokenService.CreateToken(user, roles);
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<ActionResult<MeResponse>> Me()
    {
        var user = await userManager.FindByIdAsync(User.FindFirstValue("sub")!);
        if (user is null)
            return Unauthorized();

        var roles = await userManager.GetRolesAsync(user);
        return new MeResponse(user.Id, user.Email!, user.BirthDate, roles.ToList());
    }

    private bool IsAdult(DateOnly birthDate)
    {
        var today = DateOnly.FromDateTime(clock.GetUtcNow().UtcDateTime);
        return birthDate <= today.AddYears(-AuthConstants.MinimumAge);
    }
}
