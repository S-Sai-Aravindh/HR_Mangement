using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Hr_Management.Migrations
{
    /// <inheritdoc />
    public partial class AttendanceTableValuesAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Attendance",
                columns: new[] { "Id", "Date", "EmployeeId", "InTime", "OutTime", "ShortFall" },
                values: new object[,]
                {
                    { 1, new DateOnly(2023, 12, 1), 1, new TimeSpan(0, 9, 0, 0, 0), new TimeSpan(0, 17, 0, 0, 0), "0" },
                    { 2, new DateOnly(2023, 12, 2), 2, new TimeSpan(0, 10, 0, 0, 0), new TimeSpan(0, 18, 30, 0, 0), "0.5" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Attendance",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Attendance",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
