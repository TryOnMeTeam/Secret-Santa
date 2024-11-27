import React from 'react';
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
} from "@mui/material";

const ListTable = ({ columns = [], rows = [], actionButtons }) => {
  return (
    <Paper sx={{ width: '95%', overflow: 'hidden', margin: '40px auto', padding: '20px' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <Box>
          {actionButtons?.map((action, index) => (
            <Button
              key={index}
              onClick={action.onClick}
              disabled={action.disabled}
              variant="contained"
              color={action.color || 'primary'}
              style={{ marginRight: '10px' }}
            >
              {action.label}
            </Button>
          ))}
        </Box>
      </Box>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                  {columns.map((column) => {
                    const value = row[column.key];
                    return (
                      <TableCell key={`${rowIndex}-${column.key}`} align={column.align}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ListTable;
