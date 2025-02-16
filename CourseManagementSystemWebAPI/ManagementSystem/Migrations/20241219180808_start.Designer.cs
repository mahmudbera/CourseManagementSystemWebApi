﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Repositories;

#nullable disable

namespace ManagementSystem.Migrations
{
    [DbContext(typeof(RepositoryContext))]
    [Migration("20241219180808_start")]
    partial class start
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.0");

            modelBuilder.Entity("Entities.Models.Classroom", b =>
                {
                    b.Property<int>("ClassroomId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Capacity")
                        .HasColumnType("INTEGER");

                    b.Property<string>("ClassroomName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("TEXT");

                    b.Property<int?>("CourseId")
                        .HasColumnType("INTEGER");

                    b.HasKey("ClassroomId");

                    b.HasIndex("CourseId")
                        .IsUnique();

                    b.ToTable("Classrooms");

                    b.HasData(
                        new
                        {
                            ClassroomId = 1,
                            Capacity = 30,
                            ClassroomName = "Room A",
                            CourseId = 1
                        },
                        new
                        {
                            ClassroomId = 2,
                            Capacity = 25,
                            ClassroomName = "Room B",
                            CourseId = 2
                        },
                        new
                        {
                            ClassroomId = 3,
                            Capacity = 35,
                            ClassroomName = "Room C",
                            CourseId = 3
                        },
                        new
                        {
                            ClassroomId = 4,
                            Capacity = 40,
                            ClassroomName = "Room D",
                            CourseId = 4
                        },
                        new
                        {
                            ClassroomId = 5,
                            Capacity = 20,
                            ClassroomName = "Room E",
                            CourseId = 5
                        },
                        new
                        {
                            ClassroomId = 6,
                            Capacity = 50,
                            ClassroomName = "Room F",
                            CourseId = 6
                        },
                        new
                        {
                            ClassroomId = 7,
                            Capacity = 45,
                            ClassroomName = "Room G",
                            CourseId = 7
                        },
                        new
                        {
                            ClassroomId = 8,
                            Capacity = 30,
                            ClassroomName = "Room H",
                            CourseId = 8
                        });
                });

            modelBuilder.Entity("Entities.Models.Course", b =>
                {
                    b.Property<int>("CourseId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("CourseName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("TEXT");

                    b.Property<int>("Credits")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("TEXT");

                    b.Property<int?>("InstructorId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("TEXT");

                    b.HasKey("CourseId");

                    b.HasIndex("InstructorId");

                    b.ToTable("Courses");

                    b.HasData(
                        new
                        {
                            CourseId = 1,
                            CourseName = "Math 101",
                            Credits = 3,
                            Description = "Basic Mathematics",
                            InstructorId = 1,
                            Status = "Active"
                        },
                        new
                        {
                            CourseId = 2,
                            CourseName = "History 101",
                            Credits = 3,
                            Description = "Basic History",
                            InstructorId = 2,
                            Status = "Active"
                        },
                        new
                        {
                            CourseId = 3,
                            CourseName = "Physics 101",
                            Credits = 4,
                            Description = "Introduction to Physics",
                            InstructorId = 3,
                            Status = "Active"
                        },
                        new
                        {
                            CourseId = 4,
                            CourseName = "Chemistry 101",
                            Credits = 4,
                            Description = "Basic Chemistry",
                            InstructorId = 4,
                            Status = "Active"
                        },
                        new
                        {
                            CourseId = 5,
                            CourseName = "Computer Science 101",
                            Credits = 3,
                            Description = "Introduction to Computer Science",
                            InstructorId = 5,
                            Status = "Active"
                        },
                        new
                        {
                            CourseId = 6,
                            CourseName = "Biology 101",
                            Credits = 3,
                            Description = "Basic Biology",
                            InstructorId = 6,
                            Status = "Active"
                        },
                        new
                        {
                            CourseId = 7,
                            CourseName = "Literature 101",
                            Credits = 3,
                            Description = "Introduction to Literature",
                            InstructorId = 7,
                            Status = "Active"
                        },
                        new
                        {
                            CourseId = 8,
                            CourseName = "Philosophy 101",
                            Credits = 3,
                            Description = "Introduction to Philosophy",
                            InstructorId = 8,
                            Status = "Active"
                        });
                });

            modelBuilder.Entity("Entities.Models.Enrollment", b =>
                {
                    b.Property<int>("EnrollmentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("CourseId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("EnrollmentDate")
                        .HasColumnType("TEXT");

                    b.Property<decimal?>("Grade")
                        .HasColumnType("TEXT");

                    b.Property<int>("StudentId")
                        .HasColumnType("INTEGER");

                    b.HasKey("EnrollmentId");

                    b.HasIndex("CourseId");

                    b.HasIndex("StudentId");

                    b.ToTable("Enrollments");

                    b.HasData(
                        new
                        {
                            EnrollmentId = 1,
                            CourseId = 1,
                            EnrollmentDate = new DateTime(2024, 12, 19, 21, 8, 7, 969, DateTimeKind.Local).AddTicks(9140),
                            StudentId = 1
                        },
                        new
                        {
                            EnrollmentId = 2,
                            CourseId = 2,
                            EnrollmentDate = new DateTime(2024, 12, 19, 21, 8, 7, 969, DateTimeKind.Local).AddTicks(9153),
                            StudentId = 2
                        },
                        new
                        {
                            EnrollmentId = 3,
                            CourseId = 3,
                            EnrollmentDate = new DateTime(2024, 12, 19, 21, 8, 7, 969, DateTimeKind.Local).AddTicks(9154),
                            StudentId = 3
                        },
                        new
                        {
                            EnrollmentId = 4,
                            CourseId = 4,
                            EnrollmentDate = new DateTime(2024, 12, 19, 21, 8, 7, 969, DateTimeKind.Local).AddTicks(9155),
                            StudentId = 4
                        },
                        new
                        {
                            EnrollmentId = 5,
                            CourseId = 5,
                            EnrollmentDate = new DateTime(2024, 12, 19, 21, 8, 7, 969, DateTimeKind.Local).AddTicks(9156),
                            StudentId = 5
                        },
                        new
                        {
                            EnrollmentId = 6,
                            CourseId = 6,
                            EnrollmentDate = new DateTime(2024, 12, 19, 21, 8, 7, 969, DateTimeKind.Local).AddTicks(9156),
                            StudentId = 6
                        },
                        new
                        {
                            EnrollmentId = 7,
                            CourseId = 7,
                            EnrollmentDate = new DateTime(2024, 12, 19, 21, 8, 7, 969, DateTimeKind.Local).AddTicks(9157),
                            StudentId = 7
                        },
                        new
                        {
                            EnrollmentId = 8,
                            CourseId = 8,
                            EnrollmentDate = new DateTime(2024, 12, 19, 21, 8, 7, 969, DateTimeKind.Local).AddTicks(9158),
                            StudentId = 8
                        });
                });

            modelBuilder.Entity("Entities.Models.Instructor", b =>
                {
                    b.Property<int>("InstructorId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("TEXT");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("HireDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("TEXT");

                    b.HasKey("InstructorId");

                    b.ToTable("Instructors");

                    b.HasData(
                        new
                        {
                            InstructorId = 1,
                            Email = "johndoe@email.com",
                            FirstName = "John",
                            HireDate = new DateTime(2024, 12, 19, 21, 8, 7, 970, DateTimeKind.Local).AddTicks(756),
                            LastName = "Doe"
                        },
                        new
                        {
                            InstructorId = 2,
                            Email = "janesmith@email.com",
                            FirstName = "Jane",
                            HireDate = new DateTime(2024, 12, 19, 21, 8, 7, 970, DateTimeKind.Local).AddTicks(762),
                            LastName = "Smith"
                        },
                        new
                        {
                            InstructorId = 3,
                            Email = "michaelbrown@email.com",
                            FirstName = "Michael",
                            HireDate = new DateTime(2024, 12, 19, 21, 8, 7, 970, DateTimeKind.Local).AddTicks(764),
                            LastName = "Brown"
                        },
                        new
                        {
                            InstructorId = 4,
                            Email = "emilydavis@email.com",
                            FirstName = "Emily",
                            HireDate = new DateTime(2024, 12, 19, 21, 8, 7, 970, DateTimeKind.Local).AddTicks(765),
                            LastName = "Davis"
                        },
                        new
                        {
                            InstructorId = 5,
                            Email = "davidwilson@email.com",
                            FirstName = "David",
                            HireDate = new DateTime(2024, 12, 19, 21, 8, 7, 970, DateTimeKind.Local).AddTicks(766),
                            LastName = "Wilson"
                        },
                        new
                        {
                            InstructorId = 6,
                            Email = "sarahmartinez@email.com",
                            FirstName = "Sarah",
                            HireDate = new DateTime(2024, 12, 19, 21, 8, 7, 970, DateTimeKind.Local).AddTicks(767),
                            LastName = "Martinez"
                        },
                        new
                        {
                            InstructorId = 7,
                            Email = "christaylor@email.com",
                            FirstName = "Chris",
                            HireDate = new DateTime(2024, 12, 19, 21, 8, 7, 970, DateTimeKind.Local).AddTicks(768),
                            LastName = "Taylor"
                        },
                        new
                        {
                            InstructorId = 8,
                            Email = "lauraanderson@email.com",
                            FirstName = "Laura",
                            HireDate = new DateTime(2024, 12, 19, 21, 8, 7, 970, DateTimeKind.Local).AddTicks(769),
                            LastName = "Anderson"
                        });
                });

            modelBuilder.Entity("Entities.Models.Student", b =>
                {
                    b.Property<int>("StudentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("EnrollmentDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("TEXT");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("TEXT");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("StudentId");

                    b.ToTable("Students");

                    b.HasData(
                        new
                        {
                            StudentId = 1,
                            DateOfBirth = new DateTime(2000, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "alice@email.com",
                            EnrollmentDate = new DateTime(2024, 12, 19, 21, 8, 7, 970, DateTimeKind.Local).AddTicks(2220),
                            FirstName = "Alice",
                            LastName = "Johnson",
                            Status = "Active"
                        },
                        new
                        {
                            StudentId = 2,
                            DateOfBirth = new DateTime(2000, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "bob@email.com",
                            EnrollmentDate = new DateTime(2024, 12, 19, 21, 8, 7, 970, DateTimeKind.Local).AddTicks(2227),
                            FirstName = "Bob",
                            LastName = "Brown",
                            Status = "Active"
                        },
                        new
                        {
                            StudentId = 3,
                            DateOfBirth = new DateTime(2000, 3, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "charlie@email.com",
                            EnrollmentDate = new DateTime(2024, 12, 19, 21, 8, 7, 970, DateTimeKind.Local).AddTicks(2230),
                            FirstName = "Charlie",
                            LastName = "Williams",
                            Status = "Active"
                        },
                        new
                        {
                            StudentId = 4,
                            DateOfBirth = new DateTime(2000, 4, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "david@email.com",
                            EnrollmentDate = new DateTime(2024, 12, 19, 21, 8, 7, 970, DateTimeKind.Local).AddTicks(2233),
                            FirstName = "David",
                            LastName = "Jones",
                            Status = "Active"
                        },
                        new
                        {
                            StudentId = 5,
                            DateOfBirth = new DateTime(2000, 5, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "eva@email.com",
                            EnrollmentDate = new DateTime(2024, 12, 19, 21, 8, 7, 970, DateTimeKind.Local).AddTicks(2236),
                            FirstName = "Eva",
                            LastName = "Martinez",
                            Status = "Active"
                        },
                        new
                        {
                            StudentId = 6,
                            DateOfBirth = new DateTime(2000, 6, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "frank@email.com",
                            EnrollmentDate = new DateTime(2024, 12, 19, 21, 8, 7, 970, DateTimeKind.Local).AddTicks(2239),
                            FirstName = "Frank",
                            LastName = "Garcia",
                            Status = "Active"
                        },
                        new
                        {
                            StudentId = 7,
                            DateOfBirth = new DateTime(2000, 7, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "grace@email.com",
                            EnrollmentDate = new DateTime(2024, 12, 19, 21, 8, 7, 970, DateTimeKind.Local).AddTicks(2242),
                            FirstName = "Grace",
                            LastName = "Rodriguez",
                            Status = "Active"
                        },
                        new
                        {
                            StudentId = 8,
                            DateOfBirth = new DateTime(2000, 8, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "henry@email.com",
                            EnrollmentDate = new DateTime(2024, 12, 19, 21, 8, 7, 970, DateTimeKind.Local).AddTicks(2245),
                            FirstName = "Henry",
                            LastName = "Martinez",
                            Status = "Active"
                        });
                });

            modelBuilder.Entity("Entities.Models.Classroom", b =>
                {
                    b.HasOne("Entities.Models.Course", "Course")
                        .WithOne("Classroom")
                        .HasForeignKey("Entities.Models.Classroom", "CourseId");

                    b.Navigation("Course");
                });

            modelBuilder.Entity("Entities.Models.Course", b =>
                {
                    b.HasOne("Entities.Models.Instructor", "Instructor")
                        .WithMany("Courses")
                        .HasForeignKey("InstructorId");

                    b.Navigation("Instructor");
                });

            modelBuilder.Entity("Entities.Models.Enrollment", b =>
                {
                    b.HasOne("Entities.Models.Course", "Course")
                        .WithMany("Enrollments")
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Entities.Models.Student", "Student")
                        .WithMany("Enrollments")
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Course");

                    b.Navigation("Student");
                });

            modelBuilder.Entity("Entities.Models.Course", b =>
                {
                    b.Navigation("Classroom");

                    b.Navigation("Enrollments");
                });

            modelBuilder.Entity("Entities.Models.Instructor", b =>
                {
                    b.Navigation("Courses");
                });

            modelBuilder.Entity("Entities.Models.Student", b =>
                {
                    b.Navigation("Enrollments");
                });
#pragma warning restore 612, 618
        }
    }
}
