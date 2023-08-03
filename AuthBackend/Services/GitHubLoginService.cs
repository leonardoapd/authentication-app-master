using AuthBackend.Entities;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using AuthBackend.Settings;

namespace AuthBackend.Services
{
    public class GitHubLoginService : IGitHubLoginService
    {
        private readonly GithubAuthSettings _githubAuthSettings;
        private readonly HttpClient _httpClient;
        public GitHubLoginService(IOptions<GithubAuthSettings> githubAuthSettings, IHttpClientFactory httpClientFactory)
        {
            _githubAuthSettings = githubAuthSettings.Value;
            _httpClient = httpClientFactory.CreateClient();
        }
        public async Task<string> GenerateTokenAsync(string code)
        {
            var request = new HttpRequestMessage(HttpMethod.Post, _githubAuthSettings.GithubApiUrl);

            request.Headers.Add("Accept", "application/json");

            var form = new Dictionary<string, string>
            {
                {"client_id", _githubAuthSettings.ClientId},
                {"client_secret", _githubAuthSettings.ClientSecret},
                {"code", code},
            };

            request.Content = new FormUrlEncodedContent(form);

            var response = await _httpClient.SendAsync(request);

            var responseString = await response.Content.ReadAsStringAsync();

            var responseData = JsonConvert.DeserializeObject<Dictionary<string, string>>(responseString);

            return responseData!["access_token"];
        }

        public async Task<User> GetGitHubUserAsync(string token)
        {
            var request = new HttpRequestMessage(HttpMethod.Get, "https://api.github.com/user");

            request.Headers.Add("Accept", "application/json");
            request.Headers.Add("User-Agent", "HttpClientFactory-Sample");
            request.Headers.Add("Authorization", $"Bearer {token}");

            var response = await _httpClient.SendAsync(request);

            var responseString = await response.Content.ReadAsStringAsync();

            var name = JsonConvert.DeserializeObject<Dictionary<string, string>>(responseString)["name"];
            var email = JsonConvert.DeserializeObject<Dictionary<string, string>>(responseString)["email"];
            var avatarUrl = JsonConvert.DeserializeObject<Dictionary<string, string>>(responseString)["avatar_url"];

            var user = new User
            {
                Name = name,
                Email = email,
                Photo = avatarUrl
            };

            return user;
        }
    }
}