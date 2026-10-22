using System.Security.Claims;
using System.Text;
using GymMeCoach.Api.Data;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;

namespace GymMeCoach.Api.Auth;

public interface ITokenService
{
    TokenResponse CreateToken(ApplicationUser user, IEnumerable<string> roles);
}

public class TokenService(IOptions<JwtOptions> options, TimeProvider clock) : ITokenService
{
    public TokenResponse CreateToken(ApplicationUser user, IEnumerable<string> roles)
    {
        var jwt = options.Value;
        var expires = clock.GetUtcNow().UtcDateTime.AddMinutes(jwt.ExpiryMinutes);

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new(JwtRegisteredClaimNames.Email, user.Email!),
        };
        claims.AddRange(roles.Select(role => new Claim(AuthConstants.RoleClaim, role)));

        var descriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Issuer = jwt.Issuer,
            Audience = jwt.Audience,
            Expires = expires,
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Key)),
                SecurityAlgorithms.HmacSha256),
        };

        return new TokenResponse(new JsonWebTokenHandler().CreateToken(descriptor), expires);
    }
}
