using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace product_service.Migrations
{
    /// <inheritdoc />
    public partial class _77 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "number",
                table: "Products",
                newName: "price");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "price",
                table: "Products",
                newName: "number");
        }
    }
}
