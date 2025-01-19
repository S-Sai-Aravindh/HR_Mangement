using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hr_Management.Migrations
{
    /// <inheritdoc />
    public partial class AddRegisterModuleToDb2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "RegisterModule",
                newName: "EmpId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "EmpId",
                table: "RegisterModule",
                newName: "Id");
        }
    }
}
