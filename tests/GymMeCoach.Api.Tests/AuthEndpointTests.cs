using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using GymMeCoach.Api.Auth;

namespace GymMeCoach.Api.Tests;

public class AuthEndpointTests(ApiFactory factory) : IClassFixture<ApiFactory>
{
    private const string StrongPassword = "Password-di-prova-1";
    private static readonly DateOnly AdultBirthDate = new(1990, 5, 20);

    private static string NewEmail() => $"atleta-{Guid.NewGuid():N}@example.test";

    private Task<HttpResponseMessage> Register(HttpClient client, string email, string password, DateOnly birthDate) =>
        client.PostAsJsonAsync("/api/auth/register", new RegisterRequest(email, password, birthDate));

    private async Task<string> RegisterAndLogin(HttpClient client)
    {
        var email = NewEmail();
        await Register(client, email, StrongPassword, AdultBirthDate);
        var login = await client.PostAsJsonAsync("/api/auth/login", new LoginRequest(email, StrongPassword));
        return (await login.Content.ReadFromJsonAsync<TokenResponse>())!.AccessToken;
    }

    [Fact]
    public async Task Register_AdultWithStrongPassword_ReturnsCreated()
    {
        var client = factory.CreateClient();

        var response = await Register(client, NewEmail(), StrongPassword, AdultBirthDate);

        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
    }

    [Fact]
    public async Task Register_Minor_IsRejected()
    {
        var client = factory.CreateClient();
        var seventeenYearsOld = DateOnly.FromDateTime(DateTime.UtcNow).AddYears(-17);

        var response = await Register(client, NewEmail(), StrongPassword, seventeenYearsOld);

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task Register_WeakPassword_IsRejected()
    {
        var client = factory.CreateClient();

        var response = await Register(client, NewEmail(), "corta1", AdultBirthDate);

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task Register_DuplicateEmail_IsRejected()
    {
        var client = factory.CreateClient();
        var email = NewEmail();
        await Register(client, email, StrongPassword, AdultBirthDate);

        var response = await Register(client, email, StrongPassword, AdultBirthDate);

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task Login_WrongPassword_ReturnsUnauthorized()
    {
        var client = factory.CreateClient();
        var email = NewEmail();
        await Register(client, email, StrongPassword, AdultBirthDate);

        var response = await client.PostAsJsonAsync("/api/auth/login", new LoginRequest(email, "Password-sbagliata-1"));

        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task Login_UnknownUser_ReturnsUnauthorized()
    {
        var client = factory.CreateClient();

        var response = await client.PostAsJsonAsync("/api/auth/login", new LoginRequest(NewEmail(), StrongPassword));

        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task Me_WithoutToken_ReturnsUnauthorized()
    {
        var client = factory.CreateClient();

        var response = await client.GetAsync("/api/auth/me");

        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task Me_WithToken_ReturnsUserWithUtenteRole()
    {
        var client = factory.CreateClient();
        var token = await RegisterAndLogin(client);
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

        var response = await client.GetAsync("/api/auth/me");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var me = await response.Content.ReadFromJsonAsync<MeResponse>();
        Assert.Equal(AdultBirthDate, me!.BirthDate);
        Assert.Equal([Roles.User], me.Roles);
    }
}
