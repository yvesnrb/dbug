import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class createProjectsSharesUsersTable1609719558860
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(
      new Table({
        name: 'projects_shares_users',
        columns: [
          {
            name: 'project_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'user_id',
            type: 'uuid',
            isPrimary: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'projects_shares_users',
      new TableForeignKey({
        name: 'projects_shares_users_project_id_fk',
        columnNames: ['project_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'projects',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'projects_shares_users',
      new TableForeignKey({
        name: 'projects_shares_users_user_id_fk',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'projects_shares_users',
      'projects_shares_users_user_id_fk',
    );

    await queryRunner.dropForeignKey(
      'projects_shares_users',
      'projects_shares_users_project_id_fk',
    );

    await queryRunner.dropTable('projects_shares_users');
  }
}
