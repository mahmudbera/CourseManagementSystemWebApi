using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class start : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Instructors",
                columns: table => new
                {
                    InstructorId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FirstName = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    LastName = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    HireDate = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Instructors", x => x.InstructorId);
                });

            migrationBuilder.CreateTable(
                name: "Students",
                columns: table => new
                {
                    StudentId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FirstName = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    LastName = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "TEXT", nullable: false),
                    EnrollmentDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Status = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Students", x => x.StudentId);
                });

            migrationBuilder.CreateTable(
                name: "Courses",
                columns: table => new
                {
                    CourseId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CourseName = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "TEXT", maxLength: 255, nullable: false),
                    Credits = table.Column<int>(type: "INTEGER", nullable: false),
                    InstructorId = table.Column<int>(type: "INTEGER", nullable: true),
                    Status = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Courses", x => x.CourseId);
                    table.ForeignKey(
                        name: "FK_Courses_Instructors_InstructorId",
                        column: x => x.InstructorId,
                        principalTable: "Instructors",
                        principalColumn: "InstructorId");
                });

            migrationBuilder.CreateTable(
                name: "Classrooms",
                columns: table => new
                {
                    ClassroomId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ClassroomName = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    Capacity = table.Column<int>(type: "INTEGER", nullable: false),
                    CourseId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Classrooms", x => x.ClassroomId);
                    table.ForeignKey(
                        name: "FK_Classrooms_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "CourseId");
                });

            migrationBuilder.CreateTable(
                name: "Enrollments",
                columns: table => new
                {
                    EnrollmentId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    StudentId = table.Column<int>(type: "INTEGER", nullable: false),
                    CourseId = table.Column<int>(type: "INTEGER", nullable: false),
                    EnrollmentDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Grade = table.Column<decimal>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Enrollments", x => x.EnrollmentId);
                    table.ForeignKey(
                        name: "FK_Enrollments_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "CourseId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Enrollments_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "StudentId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Instructors",
                columns: new[] { "InstructorId", "Email", "FirstName", "HireDate", "LastName" },
                values: new object[,]
                {
                    { 1, "johndoe@email.com", "John", new DateTime(2024, 12, 19, 21, 8, 7, 970, DateTimeKind.Local).AddTicks(756), "Doe" },
                    { 2, "janesmith@email.com", "Jane", new DateTime(2024, 12, 19, 21, 8, 7, 970, DateTimeKind.Local).AddTicks(762), "Smith" },
                    { 3, "michaelbrown@email.com", "Michael", new DateTime(2024, 12, 19, 21, 8, 7, 970, DateTimeKind.Local).AddTicks(764), "Brown" },
                    { 4, "emilydavis@email.com", "Emily", new DateTime(2024, 12, 19, 21, 8, 7, 970, DateTimeKind.Local).AddTicks(765), "Davis" },
                    { 5, "davidwilson@email.com", "David", new DateTime(2024, 12, 19, 21, 8, 7, 970, DateTimeKind.Local).AddTicks(766), "Wilson" },
                    { 6, "sarahmartinez@email.com", "Sarah", new DateTime(2024, 12, 19, 21, 8, 7, 970, DateTimeKind.Local).AddTicks(767), "Martinez" },
                    { 7, "christaylor@email.com", "Chris", new DateTime(2024, 12, 19, 21, 8, 7, 970, DateTimeKind.Local).AddTicks(768), "Taylor" },
                    { 8, "lauraanderson@email.com", "Laura", new DateTime(2024, 12, 19, 21, 8, 7, 970, DateTimeKind.Local).AddTicks(769), "Anderson" }
                });

            migrationBuilder.InsertData(
                table: "Students",
                columns: new[] { "StudentId", "DateOfBirth", "Email", "EnrollmentDate", "FirstName", "LastName", "Status" },
                values: new object[,]
                {
                    { 1, new DateTime(2000, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "alice@email.com", new DateTime(2024, 12, 19, 21, 8, 7, 970, DateTimeKind.Local).AddTicks(2220), "Alice", "Johnson", "Active" },
                    { 2, new DateTime(2000, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "bob@email.com", new DateTime(2024, 12, 19, 21, 8, 7, 970, DateTimeKind.Local).AddTicks(2227), "Bob", "Brown", "Active" },
                    { 3, new DateTime(2000, 3, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "charlie@email.com", new DateTime(2024, 12, 19, 21, 8, 7, 970, DateTimeKind.Local).AddTicks(2230), "Charlie", "Williams", "Active" },
                    { 4, new DateTime(2000, 4, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "david@email.com", new DateTime(2024, 12, 19, 21, 8, 7, 970, DateTimeKind.Local).AddTicks(2233), "David", "Jones", "Active" },
                    { 5, new DateTime(2000, 5, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "eva@email.com", new DateTime(2024, 12, 19, 21, 8, 7, 970, DateTimeKind.Local).AddTicks(2236), "Eva", "Martinez", "Active" },
                    { 6, new DateTime(2000, 6, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "frank@email.com", new DateTime(2024, 12, 19, 21, 8, 7, 970, DateTimeKind.Local).AddTicks(2239), "Frank", "Garcia", "Active" },
                    { 7, new DateTime(2000, 7, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "grace@email.com", new DateTime(2024, 12, 19, 21, 8, 7, 970, DateTimeKind.Local).AddTicks(2242), "Grace", "Rodriguez", "Active" },
                    { 8, new DateTime(2000, 8, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "henry@email.com", new DateTime(2024, 12, 19, 21, 8, 7, 970, DateTimeKind.Local).AddTicks(2245), "Henry", "Martinez", "Active" }
                });

            migrationBuilder.InsertData(
                table: "Courses",
                columns: new[] { "CourseId", "CourseName", "Credits", "Description", "InstructorId", "Status" },
                values: new object[,]
                {
                    { 1, "Math 101", 3, "Basic Mathematics", 1, "Active" },
                    { 2, "History 101", 3, "Basic History", 2, "Active" },
                    { 3, "Physics 101", 4, "Introduction to Physics", 3, "Active" },
                    { 4, "Chemistry 101", 4, "Basic Chemistry", 4, "Active" },
                    { 5, "Computer Science 101", 3, "Introduction to Computer Science", 5, "Active" },
                    { 6, "Biology 101", 3, "Basic Biology", 6, "Active" },
                    { 7, "Literature 101", 3, "Introduction to Literature", 7, "Active" },
                    { 8, "Philosophy 101", 3, "Introduction to Philosophy", 8, "Active" }
                });

            migrationBuilder.InsertData(
                table: "Classrooms",
                columns: new[] { "ClassroomId", "Capacity", "ClassroomName", "CourseId" },
                values: new object[,]
                {
                    { 1, 30, "Room A", 1 },
                    { 2, 25, "Room B", 2 },
                    { 3, 35, "Room C", 3 },
                    { 4, 40, "Room D", 4 },
                    { 5, 20, "Room E", 5 },
                    { 6, 50, "Room F", 6 },
                    { 7, 45, "Room G", 7 },
                    { 8, 30, "Room H", 8 }
                });

            migrationBuilder.InsertData(
                table: "Enrollments",
                columns: new[] { "EnrollmentId", "CourseId", "EnrollmentDate", "Grade", "StudentId" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(2024, 12, 19, 21, 8, 7, 969, DateTimeKind.Local).AddTicks(9140), null, 1 },
                    { 2, 2, new DateTime(2024, 12, 19, 21, 8, 7, 969, DateTimeKind.Local).AddTicks(9153), null, 2 },
                    { 3, 3, new DateTime(2024, 12, 19, 21, 8, 7, 969, DateTimeKind.Local).AddTicks(9154), null, 3 },
                    { 4, 4, new DateTime(2024, 12, 19, 21, 8, 7, 969, DateTimeKind.Local).AddTicks(9155), null, 4 },
                    { 5, 5, new DateTime(2024, 12, 19, 21, 8, 7, 969, DateTimeKind.Local).AddTicks(9156), null, 5 },
                    { 6, 6, new DateTime(2024, 12, 19, 21, 8, 7, 969, DateTimeKind.Local).AddTicks(9156), null, 6 },
                    { 7, 7, new DateTime(2024, 12, 19, 21, 8, 7, 969, DateTimeKind.Local).AddTicks(9157), null, 7 },
                    { 8, 8, new DateTime(2024, 12, 19, 21, 8, 7, 969, DateTimeKind.Local).AddTicks(9158), null, 8 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Classrooms_CourseId",
                table: "Classrooms",
                column: "CourseId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Courses_InstructorId",
                table: "Courses",
                column: "InstructorId");

            migrationBuilder.CreateIndex(
                name: "IX_Enrollments_CourseId",
                table: "Enrollments",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_Enrollments_StudentId",
                table: "Enrollments",
                column: "StudentId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Classrooms");

            migrationBuilder.DropTable(
                name: "Enrollments");

            migrationBuilder.DropTable(
                name: "Courses");

            migrationBuilder.DropTable(
                name: "Students");

            migrationBuilder.DropTable(
                name: "Instructors");
        }
    }
}
