import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("items", (table) => {
        table.increments("id").primary(); // Auto-incrementing primary key
        table.string("title").notNullable(); // Title of the item
        table.string("type").notNullable(); // Type of the item (e.g., certificate, achievement)
        table.text("description").notNullable(); // Description of the item
        table.date("date").notNullable(); // Date associated with the item
        table.text("details").notNullable(); // Additional details about the item
        table.string("image").notNullable(); // File path for the uploaded image or file
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("items");
}