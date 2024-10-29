'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Empleado extends Model {
    static associate(models) {
      Empleado.belongsTo(models.Usuario, {
        as: "UsuarioE",
        foreignKey: "usuarioEId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        constraints: false,
      });

      Empleado.belongsTo(models.RazonSocial, {
        as: "RazonSocialE",
        foreignKey: "razonSocialEId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        constraints: false,
      });

      Empleado.belongsTo(models.TipoDni, {
        as: "TiposDniE",
        foreignKey: "tipoDniEId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        constraints: false,
      });

      Empleado.hasMany(models.Direccion, {
        as: 'DireccionesE',
        foreignKey: 'empleadoDirId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        constraints: false,
      });

      Empleado.hasMany(models.Telefono, {
        as: "TelefonosE",
        foreignKey: 'empleadoTelId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        constraints: false,
      });

      Empleado.hasMany(models.Venta, {
        as: 'VentasE',
        foreignKey: 'empleadoVtaId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Empleado.hasMany(models.Reserva, {
        as: 'ReservasE',
        foreignKey: 'empleadoReservaId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Empleado.hasMany(models.Cheque, {
        as: 'ChequesE',
        foreignKey: 'empleadoCHId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

    
      
    }
  }

  Empleado.init({
    usuarioEId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Usuarios", key: "id" },
    },
    razonSocialEId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "RazonesSociales", key: "id" },
    },
    tipoDniEId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "TiposDni", key: "id" },
    },
    nombreCompleto: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    cuilcuitE: {
      allowNull: true,
      type: DataTypes.BIGINT,
    },
    email: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    fechaNacimiento: {
      allowNull: true,
      type: DataTypes.DATEONLY,
    },
    fechaContratacion: {
      allowNull: false,
      type: DataTypes.DATEONLY,
    },
    salario: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
    cargo: {
      allowNull: false,
      type: DataTypes.STRING, // Ejemplo: Camionero, Repartidor, Oficinista, etc.
    },
    departamento: {
      allowNull: true,
      type: DataTypes.STRING, // Ejemplo: Logística, Administración, Recursos Humanos
    },
    tipoContrato: {
      allowNull: false,
      type: DataTypes.ENUM('APrueba','Permanente', 'Temporal', 'Subcontratado'),
    },
    estado: {
      allowNull: false,
      type: DataTypes.ENUM('Activo', 'Inactivo', 'Suspendido'),
    },
    antiguedad: {
      allowNull: true,
      type: DataTypes.INTEGER, // Años de antigüedad
    },
    tipoEmpleado: {
      allowNull: false,
      type: DataTypes.ENUM('Camionero', 'Repartidor', 'Oficinista', 'Gerente', 'Administrativo'),
    },
    licenciaConducir: {
      allowNull: true,
      type: DataTypes.BOOLEAN, // Si aplica para camioneros o repartidores
    },
    vehiculoAsignado: {
      allowNull: true,
      type: DataTypes.STRING, // Placa o identificador del vehículo si tiene asignado
    },
    horaLlegada: {
      allowNull: true,
      type: DataTypes.TIME, // Hora de llegada
    },
    horaSalida: {
      allowNull: true,
      type: DataTypes.TIME, // Hora de salida
    },
    horasTrabajadas: {
      allowNull: true,
      type: DataTypes.DECIMAL(5, 2), // Total de horas trabajadas
    },
  }, {
    sequelize,
    modelName: 'Empleado',
    tableName: 'Empleados',
    timestamps: true
  });

  return Empleado;
};
