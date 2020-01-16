using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace BusinessModule
{
    public partial class demoContext : DbContext
    {
        public demoContext()
        {
        }

        public demoContext(DbContextOptions<demoContext> options)
            : base(options)
        {
        }

        public virtual DbSet<User> User { get; set; }

//         protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//         {
//             if (!optionsBuilder.IsConfigured)
//             {
// #warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
//                 optionsBuilder.UseMySQL("Server=localhost;Port=3307;Database=demo; User=zsw;Password=123456;sslmode=none;");
//             }
//         }

//         protected override void OnModelCreating(ModelBuilder modelBuilder)
//         {
//             modelBuilder.HasAnnotation("ProductVersion", "2.2.0-rtm-35687");

//             modelBuilder.Entity<User>(entity =>
//             {
//                 entity.ToTable("user", "demo");

//                 entity.Property(e => e.Id).HasColumnType("int(11)");

//                 entity.Property(e => e.Password)
//                     .IsRequired()
//                     .HasMaxLength(64)
//                     .IsUnicode(false);

//                 entity.Property(e => e.UserName)
//                     .IsRequired()
//                     .HasMaxLength(64)
//                     .IsUnicode(false);
//             });
//         }
    }
}
