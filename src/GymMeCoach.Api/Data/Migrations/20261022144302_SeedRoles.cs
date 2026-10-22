using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace GymMeCoach.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class SeedRoles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { new Guid("6f1b7a52-3c1e-4b8e-9a43-0d2f5c7e1a01"), "a1c3e5f7-0001-4000-8000-000000000001", "Utente", "UTENTE" },
                    { new Guid("6f1b7a52-3c1e-4b8e-9a43-0d2f5c7e1a02"), "a1c3e5f7-0002-4000-8000-000000000002", "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("6f1b7a52-3c1e-4b8e-9a43-0d2f5c7e1a01"));

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("6f1b7a52-3c1e-4b8e-9a43-0d2f5c7e1a02"));
        }
    }
}
