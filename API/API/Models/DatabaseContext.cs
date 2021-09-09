using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace API.Models
{
    public partial class DatabaseContext : DbContext
    {
        public DatabaseContext()
        {
        }

        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options)
        {
        }

        public virtual DbSet<DateTable> DateTable { get; set; }
        public virtual DbSet<DayGP> DayGP { get; set; }
        public virtual DbSet<Patients> Patients { get; set; }
        public virtual DbSet<ViewAvailableTime> ViewAvailableTime { get; set; }
        public virtual DbSet<ViewDateTable> ViewDateTable { get; set; }
        public virtual DbSet<ViewMonths> ViewMonths { get; set; }
        public virtual DbSet<ViewPatientInfo> ViewPatientInfo { get; set; }
        public virtual DbSet<ViewPsychoanalystMonths> ViewPsychoanalystMonths { get; set; }
        public virtual DbSet<availableTime> availableTime { get; set; }
        public virtual DbSet<calendars> calendars { get; set; }
        public virtual DbSet<postComments> postComments { get; set; }
        public virtual DbSet<postTags> postTags { get; set; }
        public virtual DbSet<posts> posts { get; set; }
        public virtual DbSet<psychoanalysts> psychoanalysts { get; set; }
        public virtual DbSet<schedule> schedule { get; set; }
        public virtual DbSet<users> users { get; set; }
        public virtual DbSet<visitingTimes> visitingTimes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Name=ConnectionStrings:DefaultConnection");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:DefaultSchema", "drkh_database");

            modelBuilder.Entity<DateTable>(entity =>
            {
                entity.Property(e => e.GDate).HasColumnType("date");

                entity.Property(e => e.PDayName).HasMaxLength(255);

                entity.Property(e => e.PMonthName).HasMaxLength(255);
            });

            modelBuilder.Entity<DayGP>(entity =>
            {
                entity.HasKey(e => e.GDate)
                    .HasName("PK__DayGP__869A7EA480228815");

                entity.Property(e => e.GDate).HasColumnType("datetime");

                entity.Property(e => e.LocalDate).HasColumnType("datetime");

                entity.Property(e => e.PDate).HasMaxLength(500);

                entity.Property(e => e.PDayName).HasMaxLength(255);

                entity.Property(e => e.PMonthName).HasMaxLength(255);

                entity.Property(e => e.PYearName).HasMaxLength(255);

                entity.Property(e => e.PeriodFixTime).HasMaxLength(500);
            });

            modelBuilder.Entity<ViewAvailableTime>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("ViewAvailableTime");

                entity.Property(e => e.End)
                    .HasMaxLength(5)
                    .IsUnicode(false);

                entity.Property(e => e.GDate).HasColumnType("date");

                entity.Property(e => e.PDayName).HasMaxLength(255);

                entity.Property(e => e.PMonthName).HasMaxLength(255);

                entity.Property(e => e.Start)
                    .HasMaxLength(5)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ViewDateTable>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("ViewDateTable");

                entity.Property(e => e.GDate).HasColumnType("date");

                entity.Property(e => e.PDayName).HasMaxLength(255);

                entity.Property(e => e.PMonthName).HasMaxLength(255);
            });

            modelBuilder.Entity<ViewMonths>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("ViewMonths");

                entity.Property(e => e.PMonthName).HasMaxLength(255);
            });

            modelBuilder.Entity<ViewPatientInfo>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("ViewPatientInfo");

                entity.Property(e => e.End)
                    .HasMaxLength(5)
                    .IsUnicode(false);

                entity.Property(e => e.Start)
                    .HasMaxLength(5)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ViewPsychoanalystMonths>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("ViewPsychoanalystMonths");

                entity.Property(e => e.PMonthName).HasMaxLength(255);
            });

            modelBuilder.Entity<availableTime>(entity =>
            {
                entity.HasOne(d => d.Date)
                    .WithMany(p => p.availableTime)
                    .HasForeignKey(d => d.DateId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_dt_at");

                entity.HasOne(d => d.Patient)
                    .WithMany(p => p.availableTime)
                    .HasForeignKey(d => d.PatientId)
                    .HasConstraintName("fk_pa_at");

                entity.HasOne(d => d.Psychoanalyst)
                    .WithMany(p => p.availableTime)
                    .HasForeignKey(d => d.PsychoanalystId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_psy_at");
            });

            modelBuilder.Entity<calendars>(entity =>
            {
                entity.HasOne(d => d.Available)
                    .WithMany(p => p.calendars)
                    .HasForeignKey(d => d.AvailableId)
                    .HasConstraintName("Fk_av");

                entity.HasOne(d => d.Patient)
                    .WithMany(p => p.calendars)
                    .HasForeignKey(d => d.PatientId)
                    .HasConstraintName("FK_Pa");

                entity.HasOne(d => d.Psychoanalyst)
                    .WithMany(p => p.calendars)
                    .HasForeignKey(d => d.PsychoanalystId)
                    .HasConstraintName("FK_Psy");
            });

            modelBuilder.Entity<psychoanalysts>(entity =>
            {
                entity.Property(e => e.Expertise).HasMaxLength(255);

                entity.Property(e => e.Sex).HasMaxLength(255);
            });

            modelBuilder.Entity<schedule>(entity =>
            {
                entity.HasNoKey();
            });

            modelBuilder.Entity<visitingTimes>(entity =>
            {
                entity.HasOne(d => d.Psychoanalyst)
                    .WithMany(p => p.visitingTimes)
                    .HasForeignKey(d => d.PsychoanalystId)
                    .HasConstraintName("FK_Psychoanalyst");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
