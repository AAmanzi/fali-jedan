using Microsoft.EntityFrameworkCore.Migrations;

namespace FaliJedan.Data.Migrations
{
    public partial class CreatedBadgeTypeAndUpdatedGeolocation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GeoLocation",
                table: "Events");

            migrationBuilder.AddColumn<bool>(
                name: "isCanceled",
                table: "EventUsers",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<double>(
                name: "LocationLatitude",
                table: "Events",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "LocationLongitude",
                table: "Events",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "Badges",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isCanceled",
                table: "EventUsers");

            migrationBuilder.DropColumn(
                name: "LocationLatitude",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "LocationLongitude",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Badges");

            migrationBuilder.AddColumn<string>(
                name: "GeoLocation",
                table: "Events",
                nullable: false,
                defaultValue: "");
        }
    }
}
