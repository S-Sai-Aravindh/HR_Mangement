using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hr_Management.Migrations
{
    /// <inheritdoc />
    public partial class Updatekeys : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Login_Register_EmpId",
                table: "Login");

            migrationBuilder.DropIndex(
                name: "IX_Login_EmpId",
                table: "Login");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Login_EmpId",
                table: "Login",
                column: "EmpId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Login_Register_EmpId",
                table: "Login",
                column: "EmpId",
                principalTable: "Register",
                principalColumn: "EmpId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
