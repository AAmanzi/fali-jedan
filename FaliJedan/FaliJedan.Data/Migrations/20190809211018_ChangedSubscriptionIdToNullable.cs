using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FaliJedan.Data.Migrations
{
    public partial class ChangedSubscriptionIdToNullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Subsctiptions_SubscriptionId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_SubscriptionId",
                table: "Users");

            migrationBuilder.AlterColumn<Guid>(
                name: "SubscriptionId",
                table: "Users",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.CreateTable(
                name: "RefreshTokens",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Value = table.Column<string>(nullable: true),
                    UserId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefreshTokens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RefreshTokens_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_SubscriptionId",
                table: "Users",
                column: "SubscriptionId",
                unique: true,
                filter: "[SubscriptionId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_RefreshTokens_UserId",
                table: "RefreshTokens",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Subsctiptions_SubscriptionId",
                table: "Users",
                column: "SubscriptionId",
                principalTable: "Subsctiptions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Subsctiptions_SubscriptionId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "RefreshTokens");

            migrationBuilder.DropIndex(
                name: "IX_Users_SubscriptionId",
                table: "Users");

            migrationBuilder.AlterColumn<Guid>(
                name: "SubscriptionId",
                table: "Users",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_SubscriptionId",
                table: "Users",
                column: "SubscriptionId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Subsctiptions_SubscriptionId",
                table: "Users",
                column: "SubscriptionId",
                principalTable: "Subsctiptions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
