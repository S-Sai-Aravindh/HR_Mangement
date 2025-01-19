using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hr_Management.Migrations
{
    /// <inheritdoc />
    public partial class Valuesrem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Login");

            migrationBuilder.DropTable(
                name: "Register");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Register",
                columns: table => new
                {
                    EmpId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DOB = table.Column<DateOnly>(type: "date", nullable: false),
                    Department = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phone = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Register", x => x.EmpId);
                });

            migrationBuilder.CreateTable(
                name: "Login",
                columns: table => new
                {
                    EmpId = table.Column<int>(type: "int", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Login", x => x.EmpId);
                    table.ForeignKey(
                        name: "FK_Login_Register_EmpId",
                        column: x => x.EmpId,
                        principalTable: "Register",
                        principalColumn: "EmpId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Register",
                columns: new[] { "EmpId", "DOB", "Department", "Email", "FirstName", "Gender", "LastName", "Password", "Phone" },
                values: new object[] { 4570, new DateOnly(2003, 2, 27), "HR", "sai@gmail.com", "Sai", "Male", "Aravindh", "sai@123", 9876556789L });
        }
    }
}
