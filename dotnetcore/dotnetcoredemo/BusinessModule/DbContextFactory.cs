using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
namespace BusinessModule
{
   public class DbContextFactory : IDesignTimeDbContextFactory<demoContext>
    {
        public demoContext CreateDbContext(string[] args)
        {
            string ConnectionString = "Server=localhost;Port=3307;Database=demo; User=zsw;Password=123456;sslmode=none;";
            var dbBuilder = new DbContextOptionsBuilder<demoContext>();
            dbBuilder.UseMySQL(ConnectionString);
            var option = dbBuilder.Options;
            return new demoContext(option);
        }
    }
}