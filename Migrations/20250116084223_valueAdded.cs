using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hr_Management.Migrations
{
    /// <inheritdoc />
    public partial class valueAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Register",
                columns: new[] { "EmpId", "DOB", "Department", "Email", "FirstName", "Gender", "LastName", "Password", "Phone" },
                values: new object[] { 4570, new DateOnly(2003, 2, 27), "HR", "sai@gmail.com", "Sai", "Male", "Aravindh", "sai@123", 9876556789L });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Register",
                keyColumn: "EmpId",
                keyValue: 4570);
        }
    }
}
