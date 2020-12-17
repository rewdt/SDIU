import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import Pagination from "@material-ui/lab/Pagination";
import React from "react";

export default function DataTable({ selecteditems, rightitems, ...props }) {
  const len = selecteditems.length;
  return (
    <DataGrid
      hideFooterRowCount
      hideFooterSelectedRowCount
      disableSelectionOnClick
      components={{
        header: (el) => {
          //   console.log(el);
          return len > 0 ? (
            <AppBar position="relative" elevation={0}>
              <Toolbar>
                <Typography>{len} items selected</Typography>
                <div>
                  {rightitems.map((item) => (
                    <span>{item}</span>
                  ))}
                </div>
              </Toolbar>
            </AppBar>
          ) : null;
        },
        pagination: (el) => (
          <Pagination
            count={el.paginationProps.pageCount}
            variant="outlined"
            shape="rounded"
            style={{
              display: "flex",
              justifyContent: "center",
              flexGrow: 1
            }}
            onChange={(i, page) => {
              el.paginationProps.setPage(page);
            }}
          />
        )
      }}
      icons={{ columnResize: () => null }}
      {...props}
    />
  );
}
