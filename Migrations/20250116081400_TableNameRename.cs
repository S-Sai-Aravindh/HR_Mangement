using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hr_Management.Migrations
{
    /// <inheritdoc />
    public partial class TableNameRename : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_RegisterModule",
                table: "RegisterModule");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LoginModule",
                table: "LoginModule");

            migrationBuilder.RenameTable(
                name: "RegisterModule",
                newName: "Register");

            migrationBuilder.RenameTable(
                name: "LoginModule",
                newName: "Login");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Register",
                table: "Register",
                column: "EmpId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Login",
                table: "Login",
                column: "EmpId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Register",
                table: "Register");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Login",
                table: "Login");

            migrationBuilder.RenameTable(
                name: "Register",
                newName: "RegisterModule");

            migrationBuilder.RenameTable(
                name: "Login",
                newName: "LoginModule");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RegisterModule",
                table: "RegisterModule",
                column: "EmpId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LoginModule",
                table: "LoginModule",
                column: "EmpId");
        }
    }
}
