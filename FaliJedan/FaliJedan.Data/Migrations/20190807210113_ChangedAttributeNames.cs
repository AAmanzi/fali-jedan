using Microsoft.EntityFrameworkCore.Migrations;

namespace FaliJedan.Data.Migrations
{
    public partial class ChangedAttributeNames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "HasRated",
                table: "EventUsers");

            migrationBuilder.AddColumn<int>(
                name: "TotalRating",
                table: "Users",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsReviewed",
                table: "EventUsers",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TotalRating",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "IsReviewed",
                table: "EventUsers");

            migrationBuilder.AddColumn<float>(
                name: "Rating",
                table: "Users",
                nullable: false,
                defaultValue: 0f);
        }
    }
}
