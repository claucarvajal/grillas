import "./styles.css";

import React, { useState, useEffect } from "react";
//import "./Grid.css"; // Importamos el archivo CSS de estilos

const Grid = () => {
  const [gridData, setGridData] = useState([
    {
      idUnidad: 1,
      unidad: 101,
      programadas: 0,
      ejecutados: 1,
      estado: 1,
      piso: "p1",
    },
    {
      idUnidad: 2,
      unidad: 102,
      programadas: 0,
      ejecutados: 0,
      estado: 0,
      piso: "p1",
    },
    {
      idUnidad: 3,
      unidad: 103,
      programadas: 0,
      ejecutados: 0,
      estado: 0,
      piso: "p1",
    },
    {
      idUnidad: 4,
      unidad: 108,
      programadas: 0,
      ejecutados: 1,
      estado: 1,
      piso: "p1",
    },
    {
      idUnidad: 5,
      unidad: 201,
      programadas: 0,
      ejecutados: 0,
      estado: 0,
      piso: "p2",
    },
    {
      idUnidad: 6,
      unidad: 202,
      programadas: 0,
      ejecutados: 1,
      estado: 1,
      piso: "p2",
    },
    {
      idUnidad: 7,
      unidad: 101,
      programadas: 0,
      ejecutados: 0,
      estado: 0,
      piso: "p3",
    },
    {
      idUnidad: 8,
      unidad: 102,
      programadas: 0,
      ejecutados: 0,
      estado: 0,
      piso: "p3",
    },
    {
      idUnidad: 9,
      unidad: 103,
      programadas: 0,
      ejecutados: 0,
      estado: 0,
      piso: "p3",
    },
    {
      idUnidad: 10,
      unidad: 108,
      programadas: 1,
      ejecutados: 0,
      estado: 0,
      piso: "p3",
    },
    {
      idUnidad: 11,
      unidad: 101,
      programadas: 1,
      ejecutados: 0,
      estado: 0,
      piso: "p4",
    },
    {
      idUnidad: 12,
      unidad: 102,
      programadas: 1,
      ejecutados: 0,
      estado: 0,
      piso: "p4",
    },
    {
      idUnidad: 13,
      unidad: 103,
      programadas: 0,
      ejecutados: 0,
      estado: 0,
      piso: "p4",
    },
    {
      idUnidad: 14,
      unidad: 108,
      programadas: 0,
      ejecutados: 0,
      estado: 0,
      piso: "p4",
    },
    {
      idUnidad: 15,
      unidad: 109,
      programadas: 0,
      ejecutados: 0,
      estado: 0,
      piso: "p4",
    },
    {
      idUnidad: 21,
      unidad: 110,
      programadas: 0,
      ejecutados: 0,
      estado: 0,
      piso: "p4",
    },
    {
      idUnidad: 16,
      unidad: 102,
      programadas: 0,
      ejecutados: 0,
      estado: 0,
      piso: "p5",
    },
    {
      idUnidad: 17,
      unidad: 103,
      programadas: 0,
      ejecutados: 0,
      estado: 0,
      piso: "p5",
    },
    {
      idUnidad: 18,
      unidad: 108,
      programadas: 0,
      ejecutados: 0,
      estado: 0,
      piso: "p5",
    },
    {
      idUnidad: 19,
      unidad: 101,
      programadas: 0,
      ejecutados: 0,
      estado: 0,
      piso: "p6",
    },
    {
      idUnidad: 20,
      unidad: 102,
      programadas: 0,
      ejecutados: 0,
      estado: 1,
      piso: "p6",
    },
    {
      idUnidad: 22,
      unidad: 102,
      programadas: 0,
      ejecutados: 0,
      estado: 0,
      piso: "p7",
    },
  ]);

  const [selectedUnits, setSelectedUnits] = useState([]);
  const [selectedPisos, setSelectedPisos] = useState({});

  useEffect(() => {
    // Actualizar el estado seleccionado en función de los datos iniciales
    const initialSelectedUnits = gridData
      .filter(({ estado }) => estado === 1)
      .map(({ idUnidad, unidad }) => `${idUnidad}-${unidad}`);
    setSelectedUnits(initialSelectedUnits);
  }, [gridData]);

  const handleUnitToggle = (unitId) => {
    setSelectedUnits((prevSelectedUnits) => {
      const updatedSelectedUnits = prevSelectedUnits.includes(unitId)
        ? prevSelectedUnits.filter((selectedUnit) => selectedUnit !== unitId)
        : [...prevSelectedUnits, unitId];

      // Actualizar el valor "estado" para la unidad correspondiente en gridData
      const [idUnidad, unidad] = unitId.split("-");
      setGridData((prevGridData) => {
        return prevGridData.map((item) => {
          if (
            item.idUnidad === parseInt(idUnidad) &&
            item.unidad === parseInt(unidad)
          ) {
            return {
              ...item,
              estado: updatedSelectedUnits.includes(unitId) ? 1 : 0,
            };
          }
          return item;
        });
      });

      return updatedSelectedUnits;
    });
  };

  const handlePisoToggle = (piso) => {
    setSelectedPisos((prevSelectedPisos) => {
      const isPisoSelected = prevSelectedPisos[piso];
      const updatedSelectedPisos = {
        ...prevSelectedPisos,
        [piso]: !isPisoSelected,
      };

      const updatedSelectedUnits = gridData
        .filter(({ piso }) => piso === piso)
        .map(({ idUnidad, unidad }) => `${idUnidad}-${unidad}`);

      setSelectedUnits((prevSelectedUnits) => {
        return isPisoSelected
          ? prevSelectedUnits.filter(
              (unitId) => !updatedSelectedUnits.includes(unitId)
            )
          : [...prevSelectedUnits, ...updatedSelectedUnits];
      });

      // Mark or unmark all units of the selected piso
      setGridData((prevGridData) => {
        return prevGridData.map((item) => {
          if (item.piso === piso && item.ejecutados === 0) {
            return {
              ...item,
              estado: !isPisoSelected ? 1 : 0,
            };
          }
          return item;
        });
      });

      return updatedSelectedPisos;
    });
  };

  const handleSave = () => {
    console.log("Selected Units:", selectedUnits, gridData);
  };

  const unitsByPiso = gridData.reduce(
    (acc, { idUnidad, unidad, estado, piso, ejecutados, programadas }) => {
      if (!acc[piso]) {
        acc[piso] = [];
      }
      acc[piso].push({ idUnidad, unidad, estado, ejecutados, programadas });
      return acc;
    },
    {}
  );

  return (
    <div className="grid-container">
      <table>
        <tbody>
          {Object.entries(unitsByPiso).map(([piso, data], rowIndex) => (
            <tr key={rowIndex}>
              <td>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedPisos[piso] || false}
                    onChange={() => handlePisoToggle(piso)}
                  />
                </label>
                {piso}
              </td>
              {data.map(
                ({ idUnidad, unidad, estado, ejecutados, programadas }) => {
                  const unitId = `${idUnidad}-${unidad}`;
                  const isChecked = programadas === 1;
                  const isExecuted = ejecutados === 1;

                  // Definimos las clases CSS condicionales
                  let checkboxClassName = "";
                  if (isExecuted) {
                    checkboxClassName = "green";
                  } else if (isChecked) {
                    checkboxClassName = "yellow";
                  } else {
                    checkboxClassName = "";
                  }

                  return (
                    <td key={unitId}>
                      <label className={checkboxClassName}>
                        <input
                          type="checkbox"
                          checked={estado}
                          disabled={isExecuted} // Agregamos el atributo disabled aquí
                          onChange={() => handleUnitToggle(unitId)}
                        />
                        {unidad}
                      </label>
                    </td>
                  );
                }
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <button className="save-button" onClick={handleSave}>
        Guardar
      </button>
    </div>
  );
};

export default Grid;
