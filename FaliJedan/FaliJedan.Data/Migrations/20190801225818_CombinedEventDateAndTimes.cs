using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FaliJedan.Data.Migrations
{
    public partial class CombinedEventDateAndTimes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateOfEvent",
                table: "Events");

            migrationBuilder.RenameColumn(
                name: "StartTime",
                table: "Events",
                newName: "EventStart");

            migrationBuilder.RenameColumn(
                name: "EndTime",
                table: "Events",
                newName: "EventEnd");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "EventStart",
                table: "Events",
                newName: "StartTime");

            migrationBuilder.RenameColumn(
                name: "EventEnd",
                table: "Events",
                newName: "EndTime");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateOfEvent",
                table: "Events",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
