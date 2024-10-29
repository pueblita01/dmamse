'use strict';

/** @type {import('sequelize-cli').Migration} */'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Empleados', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usuarioEId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { model: 'Usuarios', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      razonSocialEId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { model: 'RazonesSociales', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      tipoDniEId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { model: 'TiposDni', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      nombreCompleto: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cuilcuitE: {
        allowNull: true,
        type: Sequelize.BIGINT,
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      fechaNacimiento: {
        allowNull: true,
        type: Sequelize.DATEONLY,
      },
      fechaContratacion: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      salario: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      cargo: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      departamento: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      tipoContrato: {
        allowNull: false,
        type: Sequelize.ENUM('Permanente', 'Temporal', 'Subcontratado'),
      },
      estado: {
        allowNull: false,
        type: Sequelize.ENUM('Activo', 'Inactivo', 'Suspendido'),
      },
      antiguedad: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      tipoEmpleado: {
        allowNull: false,
        type: Sequelize.ENUM('Camionero', 'Repartidor', 'Oficinista', 'Gerente', 'Administrativo'),
      },
      licenciaConducir: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
      },
      vehiculoAsignado: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      horaLlegada: {
        allowNull: true,
        type: Sequelize.TIME,
      },
      horaSalida: {
        allowNull: true,
        type: Sequelize.TIME,
      },
      horasTrabajadas: {
        allowNull: true,
        type: Sequelize.DECIMAL(5, 2),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Empleados');
  }
};

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
