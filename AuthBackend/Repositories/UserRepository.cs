using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuthBackend.Entities;
using AuthBackend.Settings;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace AuthBackend.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IMongoCollection<User> _usersCollection;
        private readonly FilterDefinitionBuilder<User> filterBuilder = Builders<User>.Filter;

        

        public UserRepository(IOptions<MongoDBSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);
            _usersCollection = database.GetCollection<User>(settings.Value.CollectionName);
        }

        public async Task CreateUserAsync(User user)
        {
            // Hash the password
            if (user.Password != null) {
                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            }

            try
            {
                await _usersCollection.InsertOneAsync(user);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public Task DeleteUserAsync(Guid id)
        {
            try
            {
                var filter = filterBuilder.Eq(existingUser => existingUser.Id, id);
                return _usersCollection.DeleteOneAsync(filter);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            try
            {
                return await _usersCollection.Find(new BsonDocument()).ToListAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public Task<User> GetUserByEmailAsync(string email)
        {
            try
            {
                var filter = filterBuilder.Eq(existingUser => existingUser.Email, email);
                return _usersCollection.Find(filter).SingleOrDefaultAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public Task<User> GetUserByIdAsync(Guid id)
        {
            try
            {
                var filter = filterBuilder.Eq(existingUser => existingUser.Id, id);
                return _usersCollection.Find(filter).SingleOrDefaultAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public Task UpdateUserAsync(User user)
        {
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            try
            {
                var filter = filterBuilder.Eq(existingUser => existingUser.Id, user.Id);
                return _usersCollection.ReplaceOneAsync(filter, user);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }


    }
}